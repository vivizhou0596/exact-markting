<template>
  <div class="line-charts">
    <div :id="id" style="width:1100px;height:220px;"></div>
  </div>
</template> 
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  props:{
    id:{
      type:String,
      default:'1040100'
    },
    title:{
      type:String,
      default:''
    },
    allUserName:{
      type:String,
      default:'全网用户'
    },
    forLineData:{
      type:Object,
      default(){
          return  {
                "xaxis": ["<=0", "0-20", "20-50", "50-100", "100-200", "200-300", "300-500", "500-800", "800-1000", "1000-"],
                "target": {
                  "value": [{"name": "<=0","value": "74"},{"name": "0-20","value": "54"},{"name": "20-50","value": "45"},{"name": "50-100","value": "62"},{"name": "100-200","value": "74"},{"name": "200-300","value": "84"},{"name": "300-500","value": "97"},{"name": "500-800","value": "33"},{"name": "800-1000","value": "74"},{"name": "1000-","value": "70"}],
                  "divid": "c7b8443f-3195-41ee-8b9d-515fd6ed8628",
                  "type": 1
                },
                "all": {"value": [{"name": "<=0","value": "74"},{"name": "0-20","value": "54"},{"name": "20-50","value": "45"},{"name": "50-100","value": "62"},{"name": "100-200","value": "74"},{"name": "200-300","value": "84"},{"name": "300-500","value": "97"},{"name": "500-800","value": "33"},{"name": "800-1000","value": "74"},{"name": "1000-","value": "70"}],
                  "divid": "a9bc4121-a984-4118-ae03-298caa1ae197",
                  "type": 2
                }
              }
        }
    },
    uint:{
      type:String,
      default:''
    }
  },
  computed:{
    xAxis(){ return  this.forLineData.xaxis },
    target(){ return this.forLineData.target.value },
    all(){ return this.forLineData.all.value },
    interval(){
      let num = 0
      num = this.forLineData.target.value.length>15 ? 1 : 0
      return num
    },
    colors(){
      let arr 
      switch(this.id.slice(0,1)){
          case '1':arr = ['#3bb9fe','#b3e4fe']; break;
          case '2':arr = ['#17f0ed','#1883e7']; break;
          case '3': arr = ['#fff701','#ff7f00']; break;
          case '4': arr = ['#17f0ed','#1883e7']; break;
          default: arr = ['#ff7f00','#35a0ee'];
        }
        return arr
    },
    showTitle(){
      let title = ''
      if(this.id.slice(0,1) == '3'|| this.id == '4010100'  ){
        title = this.title
      }
      return title
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById(this.id).innerHTML = ''
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      var myChartOption = {
        title: {
          text: this.showTitle,
          //subtext:'*点击数据节点可显示详细数据',
          bottom:0,
          left: "50%",
          textAlign: "center",
          textStyle: {
            color: "#fff",
            fontSize:16,
            fontWeight: 'normal',
          }
        },
        tooltip: {},
        grid: {
          bottom:80,
          left:'5%',
          right:100,
          width:'90%'
          // backgroundColor:'#f00'
        },
        //color:['#ff7e00','#359eef'],
        color:this.colors,
        legend:{
          orient:'vertical',
          left:100,
          data:[{name:'目标用户',textStyle:{color:'#fff'}},{name:this.allUserName,textStyle:{color:'#fff'}}]
        },
        xAxis: {
          type: 'category',
          //max:120,
          boundaryGap:0,
          axisLabel: { margin:20,interval:0, textStyle:{fontSize:15,color:'#fff'} },
          axisLine: { show: false }, // X轴线默认true
          axisTick: { show: false }, //坐标刻度默认显示true
          splitLine: { show: false }, //取消与X轴平行的标准线
          //data: ["0-20", "20-40", "40-60", "80-100", "100-120", "120以上"]
          data:this.xAxis
        },
        yAxis: {
          name: this.uint,
          max:this.getMaxNum(this.target,this.all),
          position:'right',
          nameTextStyle:{color:'#fff'},
          type: 'value',
          axisLabel: { show:false,margin:10,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
          axisLine: { show: false }, // y轴线默认true
          axisTick: { show: false }, //坐标刻度默认显示true
          splitLine: { show: false }, //取消与X轴平行的标准线
          
        },
        series: [{
          name: '目标用户',
          type: 'line',
          areaStyle: {normal: {opacity:0.2}},
          symbol: 'diamond',
          symbolSize:8,
          smooth:true,
          label: {
            normal: {
              position: "top",
              show: false,
              textStyle: {
                color: '#fff',
                fontSize:12,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value;
              }
            }
          },
          //data: [5, 30, 36, 60, 20, 90]
          data:this.target
        },{
          name: this.allUserName,
          type: 'line',
          areaStyle: {normal: {opacity:0.2}},
          // barWidth: 10,
          symbol: 'circle',
          symbolSize:8,
          smooth:true,
          label: {
            normal: {
              //position: "bottom",
              position: "top",
              show: false,
              textStyle: {
                color: '#fff',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value;
              }
            }
          },
          //data: [5, 60, 76, 50, 90, 70]
          data:this.all
        }
        ]
      }
      myChart.setOption( myChartOption );
      myChart.on('click',function(param){
        var targetLabel = myChartOption.series[0].label.normal.show
        var allLabel = myChartOption.series[1].label.normal.show
        if(param.seriesName == "目标用户"){
          myChartOption.series[1].label.normal.show = false
          myChartOption.series[0].label.normal.show = targetLabel == true? false:true
          myChart.setOption( myChartOption ); // 使用刚指定的配置项和数据显示图表。
        }else if(param.seriesName == "全网用户"){
          myChartOption.series[0].label.normal.show = false
          myChartOption.series[1].label.normal.show = allLabel == true? false:true
          myChart.setOption( myChartOption ); // 使用刚指定的配置项和数据显示图表。
        }
      })
      myChart.on('legendselectchanged',function(param){
        //console.log(param.selected[param.name])
        var flag = param.selected[param.name]
        if(param.name == "目标用户"){
          console.log(flag)
          myChartOption.series[1].label.normal.show = flag == true? false:true
          myChart.setOption( myChartOption ); // 使用刚指定的配置项和数据显示图表。
          //console.log(myChartOption.series[1].label.normal.show)
        }else if(param.name == "全网用户"){
          myChartOption.series[0].label.normal.show = flag == true? false:true
          myChart.setOption( myChartOption ); // 使用刚指定的配置项和数据显示图表。
        }
      })
    },
    getMaxNum(arr1,arr2){
      let arr = arr1.concat(arr2)
      for(let i=0;i<arr.length;i++){
        arr[i] = arr[i].value
      }
      let maxNum = Math.max.apply(null, arr)+5
      return maxNum
    }
  }
}
</script> 
<style scoped>
  .line-charts{
    margin-top:20px;
  }
</style>

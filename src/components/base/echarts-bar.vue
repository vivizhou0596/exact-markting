<template>
  <div class="line-charts" style="margin-left:100px">
    <div :id="id" style="width:1200px;height:240px;margin:0 auto"></div>
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
      default:'104010000'
    },
    title:{
      type:String,
      default:''
    },
    allUserName:{
      type:String,
      default:'全网用户'
    },
    forBarData:{
      type:Object,
      default(){
          return {
                "xaxis":["0-1000元","1000-2000元","2000-3000元","3000元以上"],
                "target": {
                  "value": [{"name": "0-1000元","value": "74"},{"name": "1000-2000元","value": "54"},{"name": "2000-3000元","value": "45"},{"name": "3000元以上","value": "62"}],
                  "divid": "c7b8443f-3195-41ee-8b9d-515fd61d8628",
                  "type": 1
                },
                "all": {"value": [{"name": "0-1000元","value": "45"},{"name": "1000-2000元","value": "62"},{"name": "2000-3000元","value": "74"},{"name": "3000元以上","value": "54"}],
                  "divid": "a9bc4121-a984-4118-ae03-298caa1a2197",
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
    xAxis(){
        return   this.forBarData.xaxis
    },
    target(){ return this.forBarData.target.value },
    all(){ return this.forBarData.all.value },
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
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      //document.getElementById(this.id).innerHTML = ''
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      var myChartOption = {
          title: {
            bottom:10,
            left: "50%",
            textAlign: "center",
            textStyle: {
              color: "#fff",
              fontSize:16,
              fontWeight: 'normal',
            }
          },
        color:this.colors,
        tooltip: {},
        legend:{
          orient:'horizontal',
          top:0,
          left:50,
          itemWidth:14,
          data:[
                {name:'目标用户',icon:'rect',textStyle:{color:'#f7f7f7'}},
                {name:this.allUserName,icon:'rect',textStyle:{color:'#f7f7f7'}}
              ]
        },
        xAxis:[
          {//全网
            type: 'category',
            boundaryGap:0,
            position:'bottom',
            axisLabel: { margin:10,interval:0, rotate:0,textStyle:{fontSize:14,color:'#f7f7f7'} },
            axisLine: { show: true,lineStyle:{color:'#6C727D'} }, // X轴线默认true
            axisTick: { show: false, alignWithLabel: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
            //data: ["oppo","华为", "小米", "苹果","vivo"]
            data:this.xAxis
          }
        ],
        yAxis:[
          {
            position:'left',
            nameTextStyle:{color:'#fff'},
            type: 'value',
            axisLabel: { show:false,margin:0,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
            axisLine: { show: false }, // y轴线默认true
            axisTick: { show: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
          }
        ] ,
        series: [{
          name: this.allUserName,
          type: 'bar',
          barWidth:30,
          areaStyle: {normal: {opacity:0.2}},
          label: {
            normal: {
              position: "top",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'%';
              }
            }
          },
          //data: [30, 36, 60, 20, 90]
          data:this.all
        },{
          name:'目标用户',
          type: 'bar',
          barWidth: 30,
          label: {
            normal: {
              position: "top",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'%';
              }
            }
          },
          //data: [90, 70,60, 76, 50]
          data:this.target
        }
        ]
      }
      myChart.setOption( myChartOption );
    }

  }
}
</script> 
<style scoped>
  .line-charts{
    margin-top:20px;
  }
</style>

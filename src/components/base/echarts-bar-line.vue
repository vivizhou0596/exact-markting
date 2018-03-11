<template>
  <div class="line-charts">
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
    barLineData:{
      type:Object,
      default(){
          return  {}
        }
    },
  },
  computed:{
    id(){ return this.barLineData.id },
    xAxis(){
        let arr = []
        this.barLineData.value.users.value.forEach((elem,index)=>{
          
          arr.push(elem.name)
        });
        return  arr
    },
    chartsdata(){ return this.barLineData.value},
    // getMaxNum(){
    //   let max={users:0,money:0}
    //   let userArr = this.chartsdata.users.value
    //   let moneyArr = this.chartsdata.money.value
    //   for(let i=0;i<userArr.length;i++){
    //     userArr[i] = userArr[i].value
    //   }
    //   for(let i=0;i<moneyArr.length;i++){
    //     moneyArr[i] = moneyArr[i].value
    //   }
    //   max.users = Math.max.apply(null, userArr)+10
    //   max.money = Math.max.apply(null, moneyArr)+10
    //   return max
    // }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch:{
      barLineData:{
        handler(newValue, oldValue) {
    　　　　console.log(newValue)
            this.barLineData = newValue
            console.log(this.id)
            //setTimeout(this.drawLine(),200)
            this.drawLine();
    　　},
  　　　deep: true
      }
  },
  created(){
    console.log(this.barLineData)
  },
  mounted() {
    console.log(this.barLineData)
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      console.log(document.getElementById(this.id))
      //document.getElementById(this.id).innerHTML = ''
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      var myChartOption = {
        grid: {
          bottom:80,
          left:'10%',
          right:50,
        },
        color:['#01c0c8','#FFAB00'],
        legend:{
          orient:'horizontal',
          left:100,
          itemWidth:14,
          data:[
                {name:this.chartsdata.users.desc,icon:'rect',textStyle:{color:'#f7f7f7'}},
                {name:this.chartsdata.money.desc,textStyle:{color:'#f7f7f7'}}
              ]
        },
        xAxis: {
          type: 'category',
          //max:120,
          boundaryGap:0,
          axisLabel: { margin:20,interval:0, textStyle:{fontSize:14,color:'#959698'} },
          axisLine: { show: true,lineStyle:{color:'#6C727D'} }, // X轴线默认true
          axisTick: { show: false }, //坐标刻度默认显示true
          splitLine: { show: false }, //取消与X轴平行的标准线
          //data: ["201701", "201702", "201703", "201704", "201705", "201706"]
          data:this.xAxis
        },
        yAxis:[
          {
            name:'人',
            //max:this.getMaxNum.users,
            position:'left',
            nameTextStyle:{color:'#fff'},
            type: 'value',
            axisLabel: { show:false,margin:0,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
            axisLine: { show: false }, // y轴线默认true
            axisTick: { show: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
          },
          {
            name:'元',
            //max:this.getMaxNum.money,
            position:'right',
            nameTextStyle:{color:'#fff'},
            type: 'value',
            axisLabel: { show:false,margin:10,interval:0, textStyle:{ fontSize:14,color:'#fff'} },
            axisLine: { show: false }, // y轴线默认true
            axisTick: { show: false }, //坐标刻度默认显示true
            splitLine: { show: false }, //取消与X轴平行的标准线
          },
        ] ,
        series: [{
          name: this.chartsdata.users.desc,
          yAxisIndex:0,
          type: 'bar',
          barWidth:20,
          areaStyle: {normal: {opacity:0.2}},
          symbol: 'diamond',
          symbolSize:4,
          smooth:true,
          label: {
            normal: {
              position: "inside",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:12,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'万';
              }
            }
          },
          //data: [5, 30, 36, 60, 20, 90]
          data:this.chartsdata.users.value
        },{
          name:this.chartsdata.money.desc,
          type: 'line',
          yAxisIndex:1,
          //areaStyle: {normal: {opacity:0.2}},
          // barWidth: 10,
          symbol: 'circle',
          symbolSize:4,
          //smooth:true,
          label: {
            normal: {
              //position: "bottom",
              position: "top",
              show: true,
              textStyle: {
                color: '#f7f7f7',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value+'万';
              }
            }
          },
          //data: [5, 60, 76, 50, 90, 70]
          data:this.chartsdata.money.value
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

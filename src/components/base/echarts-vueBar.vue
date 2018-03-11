<template>
  <div class="">
    <div :id="id" style="width:450px;height:280px"></div>
  </div>
</template> 
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'bar',
  props:{
    num:{
      type:String,
      default:'104010000'
    },
    title:{
      type:String,
      default:''
    },
    forBarData:{
      type:Object,
      default(){
        return {"type":"1",
                "divid":"000011",
                "value":[{"name":"0","value":"50"},{"name":"1","value":"16"},{"name":"2","value":"21"},{"name":"3","value":"22"}]}
      }
    },
    unit:{
      type:String,
      default:''
    }
  },
  computed:{
    xAixs(){
      let arr = []
      this.forBarData.value.forEach((elem,index)=>{
          arr.push(elem.name)
      })
      return arr
    },
    color(){
      let arr = []
       switch(this.num.slice(0,1)){
          case '1':arr = this.forBarData.type == '1'?['#b3e4fe']:['#3bb9fe']; break;
          case '2':arr = this.forBarData.type == '1'?['#17f0ed']:['#1883e7']; break;
          case '3': arr =  this.forBarData.type == '1'?['#fff701']:['#ff7f00']; break;
          case '4': arr =  this.forBarData.type == '1'?['#17f0ed']:['#1883e7']; break;
          default: arr =  this.forBarData.type == '1'?['#ff7f00']:['#35a0ee'];
        }
      return arr
    },
    barData(){
      return this.forBarData.value
    },
    id(){
      let id=''
      id = this.forBarData.divid
      return id
    },
    inverse(){
      let bool = ''
      bool = this.forBarData.type == '1'?false:true
      return bool
    },
    position(){
      let str = ''
      str =  this.forBarData.type == '1'?'left':'right'
      return str
    },
    labelPosition(){
      let str = ''
      str =  this.forBarData.type == '1'?'right':'left'
      return str
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    //console.log(this.xAixs,this.barData)
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      document.getElementById(this.id).innerHTML = ''
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption({
        //title: { text: 'ECharts 入门示例' },
        tooltip: {},
        grid: {
          bottom:50,
          left:300,
          right:60
        },
        color:this.color,
        xAxis: {
          type: 'value',
          max:100,
          //inverse:this.inverse,//坐标轴反向
          //inverse:false,
          axisLabel: { show:false,margin:0,interval:0, textStyle:{fontSize:14,color:'#fff'} },
          axisLine: { show: false }, // X轴线默认true
          axisTick: { show: false }, //坐标刻度默认显示true
          splitLine: { show: false }, //取消与X轴平行的标准线
          //data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis:[
            {
              name:this.unit,
              //position:this.position,
              //position:'left',
              nameTextStyle:{color:'#fff'},
              type: 'category',
              axisLabel: {margin:5,interval:0, textStyle:{ fontSize:14,color:'#fff'},
                formatter:function(val){
                  if(val.length>12){
                      return val.substring(0,12)+'...'
                  }else{
                      return val;
                  }
                }
              },
              axisLine: { show: false }, // X轴线默认true
              axisTick: { show: false }, //坐标刻度默认显示true
              splitLine: { show: false }, //取消与X轴平行的标准线
              inverse:true,
              //data: ["0-3", "3-6", "6-12", "12-24", "24-36",  "36-48", "48-60", "60以上"]
              data:this.xAixs
            }
        ], 
        series: [{
          name: this.title,
          yAxisIndex:0,
          type: 'bar',
          barWidth: 10,
          label: {
            normal: {
             // position:this.labelPosition,
             position:'right',
              show: true,
              textStyle: {
                color: '#fff',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.value + '%';
              }
            }
          },
          //data: [5, 60, 76, 50, 90, 70,67,65]
          data:this.barData
        }]
      })
    }
  }
}
</script> 

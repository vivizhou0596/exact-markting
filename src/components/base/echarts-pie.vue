<template>
  <div class="">
    <div :id="id" style="width:500px;height:280px;"></div>
  </div>
</template> 
<script>
  // 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  props:{
    title:{
      type:String,
      default:''
    },
    forPieData:{
      type:Object,
      default(){
        return {
          "value": [
                    {"name": "1星","value": "86"},
                    {"name": "2星","value": "52"},
                    {"name": "3星","value": "29"},
                    {"name": "4星","value": "56"},
                    {"name": "5星","value": "75"}],
          "divid": "d2d4259e-8b5a-4edd-a327-c4c07c35150c",
          "type": 1
        }
      }
    }
  },
  computed:{
    color(){
      let arr = []
      arr = this.forPieData.type == '1'?['#5fb3f4','#93d1ff','#c5e6fe','#a1d9ff','#4993cd']:['#35a0ee','#53b2fb','#1b4a73','#24669d','#2b83c6']
      return arr
    },
    pieData(){
      return this.forPieData.value
    },
    id(){
      let id=''
      id = this.forPieData.divid
      return id
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
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
      document.getElementById(this.id).innerHTML = ''
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption({
        //title: { text: 'ECharts 入门示例' },
        tooltip: {},
        grid: {
          bottom:50,
          left:100,
          right:30
        },
        color:this.color,
        series: [{
          name: this.title,
          type: 'pie',
          barWidth: 10,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize:14,
                fontWeight:200,
              },
              formatter: function(obj) {
                return obj.name + obj.value + '%';
              }
            }
          },
          //data: [{name:'1星',value:5},{name:'2星',value:25},{name:'3星',value:55},{name:'4星',value:15}]
          data:this.pieData
        }]
      });
    }
  }
}
</script> 

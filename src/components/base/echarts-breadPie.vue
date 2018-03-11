<template>
  <div style="margin-top:10px">
    <div :id="id" style="width:500px;height:260px;"></div>
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
  name: 'breadPie',
  props:{
    title:{
      type:String,
      default:''
    },
    forPieData:{
      type:Object,
      default(){
          return {
            "value": [{"name": "4G用户","value": "73"},
                      {"name": "非4G用户","value": "33"}],
            "type": 1,
            "divid":"110011",
        }
        
      }
    }
  },
  computed:{
    color(){
      let arr = []
      arr = this.forPieData.type == '1'?['#6bb4e9','#1f4d71','#b6e1ff','#14334d']:['#088ceb','#1f4d71','#3bb9fe','#14334d']
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
  mounted() {
    console.log(this.pieData)
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
        series: [
        {
            name:this.title,
            type:'pie',
            selectedMode: 'single',
            radius: ['30%', '45%'],
            label: {
              normal: {show: false}
            },
            //data:[32,24]
            data:this.pieData
        },
        {
            name:this.title,
            type:'pie',
            label: {
              normal: {
                  show: true,
                  textStyle: {
                    color: '#fff',
                    fontSize:14,
                    fontWeight:200,
                  },
                  formatter: function(obj) {
                    return obj.name+obj.value + '%';
                  }
                }
            },
            radius: ['45%', '75%'],
            //data:[32,24]
            data:this.pieData
        }
        ]
      });
    }
  }
}
</script> 

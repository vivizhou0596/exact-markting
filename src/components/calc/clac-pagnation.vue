<template>
	<div class="pagination">
		<ul class="pagination-ul" >
            <li v-show="current != 1" @click="goto(prevPage)" >
            	<a href="javascript:void(0)"><img src="../../common/img/left.png" alt=""></a>
            </li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="javascript:void(0)" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="goto(nextPage)">
            	<a href="javascript:void(0)" ><img src="../../common/img/right.png" alt=""></a>
            </li>
        </ul>
	</div>
</template>
<script>
  // import {mapState, mapGetters,mapMutations} from 'vuex'
  // import {SET_PAGENITION_CURR, SET_PAGENITION_TOTAL} from 'store/mutation-types'
	export default{
		props:{
			showItem:{
				type:Number,
				default:5
			},
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      allpage:{
        type: Number,
        default: 10
      }
		},
		data(){
          return{
            current:this.currentPage
           // //allpage:10
          }
    },
		computed:{
          //...mapState(['current', 'allpage']),
          prevPage(){
            return this.current-1
          },
          nextPage(){
            return this.current+1
          },
          pages(){
            let pag = [];
              if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                   //总页数和要显示的条数那个大就显示多少条
                   let i = Math.min(this.showItem,this.allpage);
                   while(i){
                      pag.unshift(i--);
                   }
               }else{ //当前页数大于显示页数了
                   let middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                       i = this.showItem;
                   if( middle >  (this.allpage - this.showItem)  ){
                       middle = (this.allpage - this.showItem) + 1
                   }
                   while(i--){
                      pag.push( middle++ );
                   }
               }
             return pag
           }
      },
      methods:{
        goto:function(index){//这里可以发送ajax请求
          //console.log(index)
          //let context = this
          this.current = index
          this.$emit('page-change',index)
        }
      }
	}
</script>
<style scoped>
	 .pagination-ul {
        position: relative;
      }
      .pagination-ul li{
        display: inline-block;
        margin:0 5px;
      }
      .pagination-ul li a{
        width:25px;
        height: 25px;
        line-height: 25px;
        display:inline-block;
        background:transparent;
        color:#fff;
      }
      .pagination-ul li a:hover{
        background:#eee;
        border-radius: 50%;
      }
      .pagination-ul li.active a{
        background:#417f46;
        border-radius: 50%;
      }
</style>
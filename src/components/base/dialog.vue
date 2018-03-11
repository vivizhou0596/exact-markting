<template>
	<div>
		<div class="dialog-wrap" >
	      <div class="dialog-cover"   v-if="isShow"></div>
	      <transition >
	        <div class="dialog-content"  v-if="isShow">
	          <!-- <p class="dialog-close" @click="closeMyself" >x</p> -->
	          <slot>empty</slot>
	        </div>
	      </transition>
	    </div>
	</div>
</template>
<script>
export default{
  //props:['isShow'],
	props:{
		isShow:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return{

		}
	},
	methods:{
		closeMyself(){
			this.$emit('on-close','来自子组件消息')
		}
	}
}
</script>
<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
  -ms-transform: translateY(-500px);
  -moz-transform: translateY(-500px);
  -webkit-transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
  -ms-transform: translateY(-500px);
  -moz-transform: translateY(-500px);
  -webkit-transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index:200;
}
.dialog-cover {
  background: #000;
  opacity: .8;
  position: fixed;
  z-index:1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y:hidden;
}
.dialog-content {
  width:50%;
  position: fixed;
  max-height: 50%;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 1110;
  padding: 2%;
  line-height: 1.6;
  display: flex;
  justify-content: center;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
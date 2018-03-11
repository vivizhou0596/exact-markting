<template>
  <div class="range">
    <div class="clearfix">
      <div class="baseline-container">
        <div class="baseline" ref="baseline">
          <div class="line" ref="line" :style="{backgroundColor: color,left: left,right: right}">
            <span class="pointer" style="left: 0;margin-left: -7px;" @mousedown="mouseDownAtPointer($event, 'left')">
              <span class="pointer-num" style="left: 0;">{{intFrom}}</span>
            </span>
            <span class="pointer" style="right: 0;margin-right: -7px; z-index:1" @mousedown="mouseDownAtPointer($event, 'right')">
              <span class="pointer-num" style="right: 0;">{{intTo}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-range">
      <input class="range-input" v-model.number="intFrom" />
      <!-- <span class="range-name">≤ {{name}} ≤</span> -->
      <span class="range-name"> - </span>
      <input class="range-input" v-model.number="intTo" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 200
    },
    initFrom: { // 初始化的最小范围值
      type: Number,
      default: 50
    },
    initTo: { // 初始化的最大范围值
      type: Number,
      default: 150
    },
    step: {
      type: Number,
      default: 0.001
    },
    color: {
      type: String,
      default: '#01c298'
    },
    name: String
  },
  data() {
    return {
      from: 0, // 最小范围值
      to: 100, // 最大范围值
      currentX: 0, // 记录当前拖拽小球的起始点 X 坐标
      dragFlag: '', // 表示当前移动的是下限的小球还是上限的小球，可选值left/right
      isDragNow: false // 表示是否处于拖拽状态
    }
  },
  computed: {
    left() {
      const perc = (this.from - this.min) / (this.max - this.min) * 100
      return perc + '%'
    },
    right() {
      const perc = (this.max - this.to) / (this.max - this.min) * 100
      return perc + '%'
    },
    intFrom: {
      get() {
        return parseInt(this.from)
      },
      set(value) {
        if (typeof value === 'number' && value >= this.min && value <= this.to) {
          this.from = parseInt(value)
        }
      }
    },
    intTo: {
      get() {
        return parseInt(this.to)
      },
      set(value) {
        if (typeof value === 'number' && value <= this.max && value >= this.from) {
          this.to = parseInt(value)
        }
      }
    }
  },
  methods: {
    // 当鼠标点在小球上时，初始化拖动状态
    mouseDownAtPointer(event, flag) {
      this.isDragNow = true
      this.dragFlag = flag
      this.currentX = event.clientX
    },
    mousemoveListener(event) {
      const context = this

      event.preventDefault()
      if (context.isDragNow) {
        const from = context.from, to = context.to, min = context.min, max = context.max, currentX = context.currentX

        // 用于计算滑动的有效range的范围
        const baseArea = context.$refs.baseline.getBoundingClientRect() // 基线长度，即最大范围
        const lineArea = context.$refs.line.getBoundingClientRect() // 已选择范围
        const stepMapWidth = context.step / baseArea.width * (max - min) // 一个步长对应的距离
        if (context.dragFlag === 'left') {
          // 必须处在有效的拖动范围内
          if ((event.clientX < baseArea.left - 7) || (event.clientX > (lineArea.left + lineArea.width - stepMapWidth) ) ) {
            console.log('无效范围')
            return
          }
          const newPos = from + (event.clientX - currentX) / baseArea.width * (max - min) // 计算新的from
          if (newPos < context.min) {
            context.from = context.min
            // context.$emit('update:from', context.min) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          } else if (newPos > context.to - context.step) {
            context.from = context.to - context.step
            // context.$emit('update:from', context.to - context.step) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          } else {
            context.from = newPos
            // context.$emit('update:from', newPos) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          }
        } else if (context.dragFlag === 'right') {
          // 必须处在有效的拖动范围内
          if ((event.clientX > baseArea.left + baseArea.width + 7) || (event.clientX < lineArea.left + stepMapWidth)) {
            return
          }
          const newPos = to + (event.clientX - currentX) / baseArea.width * (max - min) // 计算新的to
          if (newPos < context.from + context.step) {
            context.to = context.from + context.step
            // context.$emit('update:to', context.from + context.step) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          } else if (newPos > context.max) {
            context.to = context.max
            // context.$emit('update:to', context.max) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          } else {
            context.to = newPos
            // context.$emit('update:to', newPos) // 更改父组件传递进来的属性值，注意这个值其实是小数，不是整数
          }
        }

        context.currentX = event.clientX // 更新当前鼠标位置，用于下次计算
      }
    },
    mouseupListener() {
      this.isDragNow = false
    }
  },
  created() {
    this.from = this.initFrom
    this.to = this.initTo
  },
  mounted() {
    const context = this
    // 处理拖动选择范围
    document.addEventListener('mousemove', context.mousemoveListener, false)
    // 处理鼠标松开事件，取消拖动的效果
    document.addEventListener('mouseup', context.mouseupListener, false)
  },
  beforeDestroy() {
    const context = this
    // 处理拖动选择范围
    document.removeEventListener('mousemove', context.mousemoveListener, false)
    // 处理鼠标松开事件，取消拖动的效果
    document.removeEventListener('mouseup', context.mouseupListener, false)
  }
}
</script>

<style scoped>
.range {
  position: relative;
}
.range .baseline-container {
  padding: 1.1em 7px 0;
  overflow: hidden;
  border-radius: 7px;
}
.range .baseline {
  height: 14px;
  background-color: #545B67;
  position: relative;
  cursor: default;
}
.range .baseline:before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 14px;
  position: absolute;
  bottom: 0;
  left: -7px;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  background-color: #545B67;
}
.range .baseline:after {
  content: '';
  display: inline-block;
  width: 7px;
  height: 14px;
  position: absolute;
  bottom: 0;
  right: -7px;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: #545B67;
}
.range .baseline .line {
  height: 14px;
  position: absolute;
  bottom: 0;
  border-radius: 7px;
  cursor: default;
}
.range .baseline .line .pointer {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #fff;
  border-radius: 7px;
  cursor: pointer;
  position: absolute;
  top: 0;
}
.range .baseline .line .pointer .pointer-num {
  position: absolute;
  top: -1em;
  color: #fff;
  background-color: #353b47;
}
.edit-range {
  margin-top: 10px;
  white-space: nowrap;
}
.edit-range .range-name {
  margin: 0 10px;
}
.edit-range .range-input {
  width: 50px;
  border: 1px solid #5D6574;
  background-color: #505661;
  padding: 2px 4px;
  color: #e0e0e0;
  border-radius: 10px;
  text-align:center;
}
.edit-range .range-input:focus {
  outline: none;
}
</style>

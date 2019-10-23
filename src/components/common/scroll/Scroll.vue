<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted(){
    // 创建Bscroll
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    // 滚动监听 返回顶部按钮的隐藏或者消失
    if (this.probeType===2||this.probeType===3) {
      this.scroll.on('scroll',(psoition)=>{
        this.$emit('scroll',psoition)
      })
    }
    
    //监听滚动的位置  上拉加载
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x,y,time=400){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>
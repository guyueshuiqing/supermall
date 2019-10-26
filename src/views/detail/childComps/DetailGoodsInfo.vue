<template>
  <div v-if="Object.keys(detailInfo).length !==0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start lineBar">
        <i class="dot"></i>
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end lineBar">
        <i class="dot"></i>
      </div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list" :key="index" :src="item" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'DetailGoodsInfo',
    props:{
      detailInfo:{
        type:Object,
        default(){
            return {}
        }
      }
    },
    methods:{
      imageLoad(){
        this.$emit('detailImageLoad')
      }
    }
  }
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
}
.info-desc {
  font-size: 13px;
  color: #727272;
  padding: 0 10px;
}
.lineBar {
  width: 2.5rem;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.start {
  float: left;
}
.end {
  float: right;
}
.desc {
  padding: 20px 0;
  white-space: pre-wrap;
}
.dot {
  display: inline-block;
  width: 0.1rem;
  height: 0.1rem;
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: -0.04rem;
}
.info-key {
  margin-top: 10px;
  height: 17px;
  line-height: 10px;
  text-indent: 15px;
  color: #303030;
  font-weight: 400;
  font-size: 14px;
}
.info-list img {
  width: 100%;
}
</style>
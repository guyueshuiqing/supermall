<template>
  <div v-if="Object.keys(commentInfo).length !==0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价 {{commentInfo.cRate}}</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created|showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-img">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt />
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name:'DetailCommentInfo.vue',
    props:{
      commentInfo:{
        type:Object,
        default(){
            return {};
        }
      }
    },
    filters:{
      showDate(value){
        // 时间戳转Date对象
        const date = new Date(value*1000)
        // 将data进行格式化
        return formatDate(date,'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
.comment-info {
  padding: 20px 20px 15px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 15px;
}
.info-header {
  display: flex;
  padding: 10px 0 15px;
  font-size: 12px;
  justify-content: space-between;
}
.header-more i {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
}
.info-user {
  display: flex;
  height: 40px;
  line-height: 41px;
}
.info-user img {
  width: 35px;
  height: 35px;
  border: 1px solid #efefef;
  border-radius: 50%;
}
.info-user span {
  margin-left: 20px;
  font-size: 15px;
  color: #424242;
}
.info-detail {
}
.info-detail p {
  margin-top: 5px;
  color: #727272;
  font-size: 14px;
  line-height: 15px;
}
.info-other {
  padding-top: 10px;
  font-size: 12px;
  display: flex;
  color: #999;
  justify-content: space-between;
}
.info-img img {
  margin: 12px 5px;
  width: 100px;
  height: 100px;
}
</style>
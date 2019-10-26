<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return{
      iid:null,
      topImages:[],
      goodsInfo:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemetopY:null,
      currentIndex:0
    }
  },
  created(){
    this.iid = this.$route.params.iid
    // 请求详情数据
    getDetail(this.iid).then(res=>{
      const data = res.result
      // 获取轮播图
      this.topImages=data.itemInfo.topImages
      // 获取商品信息
      this.goodsInfo=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 店铺信息
      this.shop=new Shop(data.shopInfo)
       //4.获取详细的信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = data.itemParams
      // 评论信息
      if(data.rate.CRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    })
    // 请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list
    })
    this.getThemetopY=debounce(()=>{
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Infinity)
    },100)
  },
  mounted(){
    
  },
  methods: {
    detailImageLoad(){
      this.$refs.scroll.refresh()
      this.getThemetopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)      
    },
    contentScroll(position){
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i=0;i<length-1;i++){
        if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.showBackTop(position)
    },
    addToCart(){
      // 获取购物车需要展示的商品信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice

      // 将商品加入购物车
      this.$store.dispatch('addCart',product)
    } 
  }
}
</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 9; 
    background-color: #fff;
    height: 100vh;
  }
  /* .content{
    height: calc(100%-44px);
    overflow: hidden;
  } */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .detail-nav{
    position: relative;
    z-index: 9;
  } */

  /* .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  } */
</style>
<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0"
                                      :base-images="images"
                                      :base-zoomer-options="zoomerOptions"
                                    />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" controls-position="right" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>

                                                <button  @click="add2Cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="tabIndex=1" :class="{selected:tabIndex==1}" >商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content" v-show="tabIndex==0">
                                
                            </div>
                            <div class="tab-content" v-show="tabIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="comment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="totalCount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTimePlus}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :current="pageIndex"  :total="totalCount" @on-page-size-change="sizeChange" @on-change="pageChange" show-elevator show-sizer placement="top" :page-size-opts="[6, 10, 15, 30]" :page-size="pageSize"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
         <BackTop><span>❤</span></BackTop>
    </div>

</template>

<script>
// import axios from "axios";
// import moment from 'moment';
// ES6的新增
export default {
  name: "detail",
  data: function() {
    return {
      artID: "",
      // 服务器返回的商品数据
      // 商品详情
      goodsinfo: {},
      //   热卖商品
      hotgoodslist: [],
      //   图片列表
      imglist: [],
      // 购买的数量
      buyCount: 1,
      // 记录当地tab栏的效果
      tabIndex: 0,
      //   页码
      pageIndex: 1,
      //  页容量
      pageSize: 6,
      // 评论内容
      comments: [],
      // 总评论数
      totalCount: 0,
      // 评论数据
      comment: "",
      // 放大镜
      images: {
        // required
        normal_size: []
      },
      // 放大镜的设置
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },

  // 事件
  methods: {
    // 初始化购买个数

    initData() {
      (this.buyCount = 1), (this.artID = this.$route.params.artID);
      // 调用接口, 获取详情数据 axios
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID}`
        )
        .then(result => {
          //   console.log(result);
          this.goodsinfo = result.data.message.goodsinfo;
          this.hotgoodslist = result.data.message.hotgoodslist;

          this.imglist = result.data.message.imglist;
          // 放大镜的数据
          this.images.normal_size = [];
          this.imglist.forEach(v => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        });
      // 调用评论的方法
      this.getComments();
    },
    // 获取评论的数据
    getComments() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          // console.log(result);
          this.comments = result.data.message;
          this.totalCount = result.data.totalcount;
        });
    },

    // 页码改变
    pageChange(pageIndex) {
      // console.log(pageSize)
      this.pageIndex = pageIndex;
      // 从新获取这一页的数据
      this.getComments();
    },
    // 页容量改变
    sizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      // 从新获取页面数据即可
      this.getComments();
    },
    submitComment() {
      if (this.comment == "") {
        this.$Message.warning("请输入您的内容");
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID}`, {
            commenttxt: this.comment
          })
          .then(result => {
            // console.log(result);
            // 判断是否成功
            if (result.data.status == 0) {
              this.$Message.success("发表成功");
              // 清空评论
              this.comment = "";
              // 从新获取评论
              this.getComments();
            } else {
            }
          });
      }
    },
    // 加入购物车
    add2Cart(){
        this.$store.commit('add2Cart',{
            goodId:this.artID,
            goodNum:this.buyCount
        })
    }
  },
  created() {
    console.log(this.$route.params.artID);
    // let artid = this.$route.params.artid;
    // 保存数据
    this.initData();
    this.getComments();
  },
  watch: {
    $route(newVal, oldVal) {
      // console.log("数据变了");
      // 设置 图片数组伪空
      this.images.normal_size =[];
      //   从新获取接口
      this.initData();
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
  max-width: 100%;
}
.ivu-back-top {
  display: block;
  /* transition:  */
  transform: rotateZ(180deg);
  font-size: 80px;
}
.inline-zoomer-zoomer-box{
    width: 395px;
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
</style>


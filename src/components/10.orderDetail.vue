<template>
  <div class="right-auto orderDetail">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <a
          href="javascript:void(0)"
          class="add"
          @click="$router.go(-1)"
        >
          <i class="iconfont icon-reply"></i>返回</a>
        <ul>
          <li class="selected">
            <a href="javascript:;">查看订单</a>
          </li>
        </ul>
      </div>
      <div class="order-progress">
        <ul>
          <li  :class='{active:orderinfo.status>=1}' class="first active">
            <div class="progress">下单</div>
            <div class="info">{{orderinfo.add_time  | shortTimePlus}}</div>
          </li>
          <li  :class='{active:orderinfo.status>=2}' class="">
            <div class="progress">已付款</div>
            <div class="info">{{orderinfo.confirm_time  | shortTimePlus}}</div>
          </li>
          <li  :class='{active:orderinfo.status>=2}' class="">
            <div class="progress">已经发货</div>
            <div class="info">{{orderinfo.express_time  | shortTimePlus}}</div>
          </li>
          <li  :class='{active:orderinfo.status>=4}' class="last">
            <div class="progress">已完成</div>
            <div class="info">{{orderinfo.complete_time  | shortTimePlus}}</div>
          </li>
        </ul>
      </div>
      <div class="form-box accept-box form-box1">
        <dl class="head form-group">
          <dd>
            订单号：{{orderinfo.order_no}}

            <!-- <a 
              href="#/site/goods/payment/12"
              class="btn-pay"
            > -->
            <router-link
              v-show="orderinfo.status==1"
              class="btn-pay"
              :to="'/payMoney/'+orderinfo.id"
            >
              去付款
            </router-link>
            <a
              v-show="orderinfo.status==2||orderinfo.status==3"
              @click="receiveGoods"
              class="btn-pay"
            >
              确认收货
            </a>
            <a
              v-show="orderinfo.status==4"
              class="btn-pay"
            >
              去评价
            </a>
            <!-- </a> -->
            <!---->
          </dd>
        </dl>
        <dl class="form-group">
          <dt>订单状态：</dt>
          <dd>
            {{orderinfo.statusName}}
          </dd>
        </dl>
        <dl class="form-group">
          <dt>快递单号：</dt>
          <dd>
            {{orderinfo.express_no | addSmlie('谢谢老板 🐷🐷🐷')}}
          </dd>
        </dl>
        <dl class="form-group">
          <dt>支付方式：</dt>
          <dd>{{orderinfo.paymentTitle}}</dd>
        </dl>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="5"
          class="ftable"
        >
          <tbody>
            <tr>
              <th align="left">商品信息</th>
              <th width="60%">名称</th>
              <th width="10%">单价
              </th>
              <th width="10%">数量</th>
              <th width="10%">金额</th>
            </tr>
            <!-- 商品列表 -->
            <tr
              v-for="(item, index) in goodslist"
              :key="item.goods_id"
            >
              <td width="60">
                <img
                  :src="item.imgurl"
                  class="img"
                >
              </td>
              <td align="left">
                <!-- <a
                  target="_blank"
                  href="/goods/show-92.html"
                > -->
                <router-link :to="'/detail/'+item.goods_id">
                  {{item.goods_title}}
                </router-link>
                <!-- </a> -->
              </td>
              <td align="center">
                <s>￥{{item.goods_price}}</s>
                <p>￥{{item.real_price}}</p>
              </td>
              <td align="center">{{item.quantity}}</td>
              <td align="center">￥{{item.real_price*item.quantity}}</td>
            </tr>
            <tr>
              <td
                colspan="7"
                align="right"
              >
                <p>商品金额：
                  <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                  <b class="red">￥{{orderinfo.express_fee}}</b>
                </p>
                <p style="font-size: 22px;">应付总金额：
                  <b class="red">￥{{orderinfo.order_amount}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="form-box accept-box">
        <dl class="head form-group">
          <dd>收货信息</dd>
        </dl>
        <dl class="form-group">
          <dt>顾客姓名：</dt>
          <dd>{{orderinfo.accept_name}}</dd>
        </dl>
        <dl class="form-group">
          <dt>送货地址：</dt>
          <dd>{{orderinfo.area +orderinfo.address}}</dd>
        </dl>
        <dl class="form-group">
          <dt>联系电话：</dt>
          <dd>{{orderinfo.mobile}} </dd>
        </dl>
        <dl class="form-group">
          <dt>电子邮箱：</dt>
          <dd> {{orderinfo.email}}</dd>
        </dl>
        <dl class="form-group">
          <dt>备注留言：</dt>
          <dd>{{orderinfo.message}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  data: function() {
    return {
      orderId: 0,
      // 订单列表
      goodslist: [],
      // 订单详情,
      orderinfo: {}
    };
  },
  // 事件
  methods: {
    // 确认收货
    receiveGoods() {
      // 用户登出提示
      this.$confirm("确认之后,钱就到了商家的账户中,请三思 😱😱", "提示", {
        confirmButtonText: "我确定",
        cancelButtonText: "先不收",
        type: "warning"
      })
        .then(() => {
          // 点击确认
          // 调用登出接口即可
          this.$axios
            .get(`site/validate/order/complate/${this.orderId}`)
            .then(result => {
              // //console.log(result);
              if (result.data.status === 0) {
                this.$message.success(result.data.message);
                // 重新获取订单信息
                this.getOrderInfo();
              }
            });
        })
        .catch(() => {
          // 点击取消
          this.$message({
            type: "info",
            message: "算你狠！！凸-_-凸!!!"
          });
        });
    },
    // 获取订单信息
    getOrderInfo() {
      // 调用接口
      this.$axios
        .get(`site/validate/order/getorderdetial/${this.orderId}`)
        .then(result => {
          // //console.log(result);
          this.goodslist = result.data.message.goodslist;
          this.orderinfo = result.data.message.orderinfo;
        });
    }
  },
  // 获取路由数据
  created() {
    //console.log(this.$route);
    this.orderId = this.$route.params.orderId;
    // 调用获取订单信息的函数
    this.getOrderInfo();
  }
};
</script>
<style >
</style>

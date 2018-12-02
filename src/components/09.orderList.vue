<template>
  <div class="right-auto orderlist">
    <div
      class="bg-wrap"
      style="min-height: 765px;"
    >
      <div class="sub-tit">
        <ul>
          <li class="selected">
            <a href="/user/order-list.html">交易订单</a>
          </li>
        </ul>
      </div>
      <div class="table-wrap">
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          class="ftable"
        >
          <tbody>
            <tr>
              <th
                width="16%"
                align="left"
              >订单号</th>
              <th width="10%">姓名</th>
              <th width="12%">订单金额</th>
              <th width="11%">下单时间</th>
              <th width="10%">状态</th>
              <th width="12%">操作</th>
            </tr>
            <!-- 循环生成 -->
            <tr
              v-for="(item, index) in orderList"
              :key="item.id"
            >
              <td>{{item.order_no}}</td>
              <td align="left">{{item.accept_name}}</td>
              <td align="left">
                <strong style="color: red;">￥{{item.order_amount}}</strong>
                <br> 在线支付
              </td>
              <!-- 过滤器 中间的 竖线 也叫作 管道符  过滤器可以写多个-->
              <td align="left">{{item.add_time | shortTimePlus | addSmlie('😋')}}</td>
              <td align="left">
                {{item.statusName}}
              </td>
              <td align="left">
                <!-- <a
                  href="#/site/member/orderinfo/12"
                  class=""
                > -->
                <router-link :to="'/vipCenter/orderDetail/'+item.id">
                  查看订单
                </router-link>
                <!-- </a> -->
                <!-- <br> -->
                <!-- <a
                  v-show="item.status==1"
                  href="#/site/goods/payment/12"
                  class=""
                > -->
                <router-link
                  v-show="item.status==1"
                  :to="'/payMoney/'+item.id"
                >
                  |去付款
                </router-link>
                <!-- </a> -->
                <!-- <br> -->
                <!-- <a href="javascript:void(0)">|取消</a>
                  <br> -->
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 分页 -->
        <div class="page-foot">
          <el-pagination
            @size-change="pageSizeChange"
            @current-change="pageIndexChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalcount"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderList",
  data: function() {
    return {
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 订单列表
      orderList: [],
      // 总条数
      totalcount: 0
    };
  },
  // 事件
  methods: {
    pageIndexChange(pageIndex) {
      // //console.log(pageIndex);
      // 保存数据
      this.pageIndex = pageIndex;
      // 重新获取数据
      this.getOrderList();
    },
    pageSizeChange(pageSize) {
      // //console.log(pageSize);
      // 保存数据
      this.pageSize = pageSize;
      // 重置到第一页 方便用户查看
      this.pageIndex = 1;
      // 重新获取数据
      this.getOrderList();
    },
    // 获取订单的方法
    getOrderList() {
      // 获取数据
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(result => {
          // 输出结果
          // //console.log(result);
          this.orderList = result.data.message;
          this.totalcount = result.data.totalcount;
        });
    }
  },
  // 生命周期函数(钩子)
  created() {
    // 默认获取数据
    this.getOrderList();
  }
};
</script>
<style >
td a {
  display: block;
}
</style>

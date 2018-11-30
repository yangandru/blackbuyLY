<template>
  <div class="center">
    <div class="el-row">
      <div class="el-col el-col-24">
        <div class="comp">
          <div class="goodsinfo routeanimate">
            <div class="section">
              <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
              </div>
            </div>
            <div class="section">
              <div class="wrapper">
                <div class="bg-wrap">
                  <div class="nav-tit pay">
                    <a href="javascript:;" class="selected">支付中心</a>
                  </div>
                  <div class="msg-tips">
                    <div class="icon">
                      <i class="iconfont icon-check"></i>
                    </div>
                    <div class="info">
                      <strong>订单已支付成功！</strong>
                      <p>您可以点击这里进入
                        <!-- <a href="/user/center/index.html"> -->
                        <router-link to="/vipCenter">会员中心</router-link>
                        <!-- </a>查看订单状态！ -->
                      </p>
                      <p>
                        还有
                        <span class="second">{{second}}</span>
                        <span class="num">s</span>去首页
                      </p>
                      <p>如有其它问题，请立即与我们客服人员联系。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paySuccess",
  data: function() {
    return {
      second: 6,
      // 定时器id
      interId: 0
    };
  },
  created() {
    // 开启定时器 倒计时
    this.interId = setInterval(() => {
      this.second--;
      if (this.second == 0) {
        // 倒计时结束
        this.$router.push("/index");
      }
    }, 1000);
  },

  destroyed() {
    // 在销毁的生命周期函数中清除定时器
    // 也可以在倒计时结束时删除 只是让大伙 记住这个生命周期钩子而已
    clearInterval(this.interId);
  }
};
</script>
<style>
.second {
  font-size: 40px;
  color: red;
  font-weight: 700;
}
.num {
  font-size: 30px;
  color: green;
  font-weight: 700;
}
</style>

<template>
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <a href="/user/center/index.html">会员中心</a>&gt;
              <a href="/user/center/index.html">{{currentName}}</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <!-- <a
                    href="/user/center/avatar.html"
                  
                  > -->
                  <router-link
                    to="/vipCenter/index"
                    class="img-box"
                  >
                    <!-- <i class="iconfont icon-user-full"></i> -->
                    <img
                      src="../assets/coolMan2.png"
                      alt=""
                    >
                  </router-link>

                  <!-- </a> -->
                  <h3>ivanyb</h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <!-- <a
                            href="#/site/member/orderlist"
                            class
                          > -->
                          <router-link to="/vipCenter/orderList">
                            <i class="iconfont icon-arrow-right"></i>交易订单
                          </router-link>
                          <!-- </a> -->
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active"
                          >
                            <i class="iconfont icon-arrow-right"></i>账户资料
                          </a>
                        </p>
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active"
                          >
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                          </a>
                        </p>
                        <p>
                          <a
                            href="#/site/member/center"
                            class="router-link-exact-active"
                          >
                            <i class="iconfont icon-arrow-right"></i>修改密码
                          </a>
                        </p>
                        <p>
                          <a
                            @click="logout"
                            href="javascript:void(0)"
                          >
                            <i class="iconfont icon-arrow-right"></i>退出登录
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vipCenter",
  // 数据
  data: function() {
    return {
      currentName: ""
    };
  },
  methods: {
    // 退出
    logout() {
      // 用户登出提示
      this.$confirm("你确定要退出登录 嘤嘤嘤 (╥╯^╰╥)", "提示", {
        confirmButtonText: "残忍退出",
        cancelButtonText: "继续待着",
        type: "warning"
      })
        .then(() => {
          // 点击确认
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
          // 调用登出接口即可
          this.$axios.get("site/account/logout").then(result => {
            //   //console.log(result);
            if (result.data.status === 0) {
              this.$Message.success(result.data.message);
              // 编程式导航 去首页
              this.$router.push("/index");
              // 修改Vuex中的 登录字段 为false
              this.$store.commit("changeLogin", false);
            }
          });
        })
        .catch(() => {
          // 点击取消
          this.$message({
            type: "info",
            message: "感动到CRY"
          });
        });
    }
  },
  // 使用侦听器
  watch: {
    $route(val, oldVal) {
      // //console.log(val);
      this.currentName = this.$route.meta.currentName;
    }
  },
  created() {
    // //console.log(this.$route);
    this.currentName = this.$route.meta.currentName;
  }
};
</script>
<style >
.sub-tit {
  padding-top: 0;
}
.avatar-box {
  height: auto;
}
</style>

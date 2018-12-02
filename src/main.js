import Vue from "vue";
import App from "./App.vue";

// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入路由对象
import router from './lib/router'

// 导入仓库对象
import store from './lib/store'

// 导入路由
import './lib/filters';

// 导入插件
import './lib/plugins'

Vue.config.productionTip = false;

// 浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("hm24", JSON.stringify(store.state.cartData));
};
// window.onload = function() {};
// 实例化Vue
new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  // 需要把store传递给 Vue实例 这样在子组件中才可以使用$store
  store,
  // 生命周期函数
  created() {
    // //console.log('最顶级的被创建了');
    // 调用登录判断接口
    // 根据结果判断是否登录
    this.$axios.get("site/account/islogin").then(result => {
      //console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由) 登录页面 编程式导航
        router.push("/login");
      } else {
        // 修改仓库中的状态
        store.state.isLogin = true;
        // 如果登录成功啦
        // next();
      }
    });
  }
}).$mount("#app");

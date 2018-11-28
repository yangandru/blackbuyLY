import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入 element-ui 框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册到Vue上
Vue.use(ElementUI);

//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 导入 ProductZoomer
import ProductZoomer from 'vue-product-zoomer'
 
Vue.use(ProductZoomer);




// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;
// 设置上带cookie
axios.defaults.withCredentials=true;//让ajax携带cookie
// 使用axios来设置
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
// 抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899/'

// 导入 路由
import VueRouter from 'vue-router'
// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入全局的样式
import './assets/site/css/style.css'

// 导入每一个页面 的组件
import index from './components/index.vue'
import detail from './components/02.detail.vue'
import shopCart from "./components/03.shopCart.vue";
import order from "./components/04.order.vue";
import login from "./components/05.login.vue";

// 写路由规则
let routes = [
  {
    path:'/',
    // 重定向到 首页/index
    redirect:'/index'
  },
  {
    path:'/index',
    component:index
  },
  { 
    path:'/detail/:artID',
    component:detail
  },
  // 购物车的调换, 不需要掉数据
  { 
    path: "/shopCart",
    component: shopCart
  },
  // 去订单下确定订单
  // 动态路由匹配
  { 
    path: "/order/:ids",
    component: order
  },
   // 去登录下确定订单
   { 
    path: "/login",
    component: login
  },
]

// 实例化路由对象
let router = new VueRouter({
  routes
});

// 增加导航守卫 回调函数 (每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
  console.log("守卫啦!!!!");
  // console.log(to);
  // console.log(from);
  if (to.path.indexOf('/order')!=-1) {
    // 正要去订单页
    // 必须先判断登录
    axios.get("site/account/islogin").then(result => {
      //   console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      }
    });
  } else {
    // next 如果不执行 就不会路由跳转
    next();
  }
  next();
});

// 实例化之前, 注册全局过滤器
import moment from 'moment';
Vue.filter("shortTime", value=> {
  // console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY😘MM😘DD👍");
})

Vue.filter("shortTimePlus", value=> {
  // console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY:MM:DD HH:mm:ss");
})

// 导入viewx

import Vuex from 'vuex'

Vue.use(Vuex)

// 实例化仓库对象
const store = new Vuex.Store({
  // 状态store
  state: {
    // count: 0
    cartData:JSON.parse(window.localStorage.getItem('hm24')) || {
      // 38:0,  
    },
    // 是否登录的字段
    isLogin:false

  },
  // vuex计算属性
  getters:{
    totalCount(state){
      // return 998;
      let num =0;
      for(const key in state.cartData){
        num+=state.cartData[key]
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // increment (state,obj) {
      // console.log("触发了");
      // console.log(obj);
      // console.log(state);
      
      // state.count+=n;

      // state.count+=m;
      // 往购物车添加数据
      
    // }
    // 对象的属性名 goodId(商品的id)  goodNum(商品个数)
    add2Cart(state,obj){
      // console.log(obj)
      if(state.cartData[obj.goodId]!=undefined){
        // 累加即可
        state.cartData[obj.goodId]+=obj.goodNum;
      }else{
        // 商品不存在
        // 动态添加键值对
        // state.cartData[obj.goodId]=obj.goodNum;
        Vue.set(state.cartData,obj.goodId,obj.goodNum)
      }
    },
    // 增加一个修改数据的方法
    updateCartData(state,obj){
      // console.log(obj)
      // 接收到数据直接赋值, 
      state.cartData = obj;
    },
    // 删除某一条数据的方法
    delGoodsById(state,id){
      // console.log(id)
      // delete.state.cartData
      // delete删除的属性 Vue无法跟踪
      // 必须使用Vue.delete 才可以同步更新数据
      // 参数1: 
      Vue.delete(state.cartData,id)
    },
    //  修改登录状态
    changeLogin(state,isLogin ){
      state.isLogin = isLogin;
    }
  }
})

// 浏览器关闭 保存数据
window.onbeforeunload = function(){
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
};
// window.onload = function(){}

// 实例化Vue
new Vue({
  render: h => h(App),
  store,
  // 传入路由对象
  router,
  // 生命周期函数
  created() {
    // 调用登录判断
    // 根据结果判断是否登录
    axios.get("site/account/islogin").then(result => {
      console.log(result);
    if (result.data.code == "nologin") {
      // 提示用户
      Vue.prototype.$Message.warning("请先登录");
      // 跳转页面(路由)
      router.push("/login");


} else {
  // next 如果不执行 就不会路由跳转
  // 修改仓库中的状态
  store.state.isLogin = true;
  // next();
}
});

  }
}).$mount('#app')

// 导入 路由
import VueRouter from "vue-router";
// 导入Vue
import Vue from 'vue';
// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入每一个页面的 组件
import index from '../components/index.vue'
import detail from '../components/02.detail.vue'
import shopCart from '../components/03.shopCart.vue'
import order from '../components/04.order.vue'
import login from '../components/05.login.vue'
import payMoney from '../components/06.payMoney.vue'
import paySuccess from '../components/07.paySuccess.vue'
import vipCenter from '../components/08.vipCenter.vue'
import orderList from '../components/09.orderList.vue'
import orderDetail from '../components/10.orderDetail.vue'
import orderIndex from '../components/11.index.vue'

// 写路由规则
let routes = [
  {
    path: '/',
    // 重定向到 首页/index
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  // 使用动态路由匹配 传递参数
  {
    path: '/detail/:artID',
    component: detail
  },
  // 购物车的跳转 不需要带数据
  {
    path: '/shopCart',
    component: shopCart
  },
  // 去订单确认页面
  // 动态路由匹配
  {
    path: '/order/:ids',
    component: order,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      // isLogin: true,
      // weather: "棒棒哒",
      // wendu: "25℃"
      checkLogin: true
    }
  },
  // 去订单确认页面
  {
    path: '/login',
    component: login
  },
  // 订单详情 付钱页面
  {
    path: '/payMoney/:orderId',
    component: payMoney,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      // isLogin: true,
      // weather: "棒棒哒",
      // wendu: "25℃"
      checkLogin: true
    }
  },
  // 支付成功页
  {
    path: '/paySuccess',
    component: paySuccess,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      checkLogin: true
    }
  },
  // 会员中心
  {
    path: '/vipCenter',
    component: vipCenter,
    // meta 是固定
    meta: {
      // 这里的字段可以随意添加
      checkLogin: true
    },
    // 嵌套路由
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        // /vipCenter/index
        path: 'index',
        component: orderIndex,
        meta: {
          currentName: '中心首页'
        }
      },
      {
        // /vipCenter/orderList
        path: 'orderList',
        component: orderList,
        meta: {
          currentName: '订单列表'
        }
      },
      {
        // /vipCenter/orderDetail
        path: 'orderDetail/:orderId',
        component: orderDetail,
        meta: {
          currentName: '订单详情'
        }
      }
    ]
  }
]

// 实例化路由对象
let router = new VueRouter({
  routes,
  // 专门用来处理滚动的参数
  // 路由的 滚动行为中 的一个参数
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  },
  // 去除#
  mode: 'history'
})

// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
  // //console.log("守卫啦!!!!");
  //console.log(to);
  // //console.log(from);
  // if (to.path=='/order') {
  // if (to.path.indexOf("/order") != -1) {
  // 使用路由元信息 对需要登录判断的路由组件进行修饰 如果有这个字段 就需要登录 没有 直接放行
  // 一般使用路由元信息 结合导航守卫 实现组件的访问判断 通过额外的增加字段 为 路由增加一些不同的信息
  if (to.meta.checkLogin == true) {
    // 正要去订单页
    // 必须先判断登录
    Vue.prototype.$axios.get('site/account/islogin').then(result => {
      //console.log(result);
      if (result.data.code == 'nologin') {
        // 提示用户
        Vue.prototype.$Message.warning('请先登录')
        // 跳转页面(路由) 登录页面 编程式导航
        router.push('/login')
      } else {
        // 如果登录成功啦
        next()
      }
    })
  } else {
    // next 如果不执行 就不会路由跳转
    next()
  }
})
// // 路由跳转完毕触发
// 这种方法 是使用导航守卫的 回调函数实现 
// router.afterEach((to, from) => {
//   // 页面滚到顶部即可
//   window.scrollTo(0,0);
// })

// 暴露一部分让外部访问
export default router;
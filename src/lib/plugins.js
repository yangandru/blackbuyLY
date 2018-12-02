// 引入Vue 即可
import Vue from 'vue'
// 导入element-ui框架
// import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
// 注册到Vue上
// Vue.use(ElementUI);

// 按需载入Element-ui
import {
  InputNumber,
  Carousel,
  CarouselItem,
  Notification,
  Switch,
  Button,
  MessageBox,
  Message,
  Form,
  FormItem,
  Input,
  Radio,
  Pagination
} from 'element-ui'

// 注册
Vue.use(InputNumber)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Notification)
Vue.use(Switch)
Vue.use(Button)
Vue.use(MessageBox)
Vue.use(Message)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Pagination)

// 挂载到原型上
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 导入IView框架
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 注册到Vue上
Vue.use(iView)

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 省市联动
// 这种做法是 全局注册 一般是多个组件需要使用 才这么做
// import Distpicker from 'v-distpicker'
// Vue.component('v-distpicker', Distpicker)

// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios
// 设置带上cookie
axios.defaults.withCredentials = true //让ajax携带cookie
// 使用axios的方式设置基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/'

// 抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899/'

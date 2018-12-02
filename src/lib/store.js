// Vuex的使用
import Vuex from 'vuex'
// 导入Vue
import Vue from 'vue';
Vue.use(Vuex)
// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData: JSON.parse(window.localStorage.getItem('hm24')) || {},
    // cartData:data,
    // 是否登录的字段
    isLogin: false
    // 记录来时的地址
    // fromPath:''
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      //console.log(state);
      // 通过state 获取 内部的数据
      // 计算并返回
      // return 998;
      let num = 0
      for (const key in state.cartData) {
        // 循环累加
        num += state.cartData[key]
      }
      return num
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是 上面的 数据 state
    // 测试用方法
    // increment (state,obj) {
    //   //console.log('触发了')
    //   //console.log(state);
    //   //console.log(obj);
    //   // state.count+=n
    //   // state.count+=m;
    // }
    // 往购物车添加数据的方法 2->two
    // 约定 对象的属性名  goodId(商品id)  goodNum(商品个数)
    add2Cart(state, obj) {
      //console.log(obj);
      // 商品已经存在{goodId:90,goodNum:6}
      if (state.cartData[obj.goodId] != undefined) {
        // 累加即可 state.carData.goodId +=10
        // state.cartData[obj.goodId]+=obj.goodNum;

        // 上面代码的 扩写
        let oldNum = state.cartData[obj.goodId]
        oldNum += obj.goodNum
        state.cartData[obj.goodId] = oldNum
      } else {
        // 商品不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.cartData, obj.goodId, obj.goodNum)
      }
      // 打印内容
      //console.log(state);
    },
    // 增加一个修改数据的方法
    updateCartData(state, obj) {
      // //console.log(obj);
      // 接收到数据直接赋值 因为 在03.shopCart.vue中 已经把数据处理好了
      state.cartData = obj
    },
    // 删除某一条数据的方法
    // 已经被 watch中的代码 实现  只是为了 演示 Vue.delete这个方法
    delGoodsById(state, id) {
      // //console.log(id);
      // 根据id 删除state中的数据
      // delete state.cartData[id];
      // delete 删除的属性 Vue无法跟踪
      // 参数1 对象 参数2 删除的属性
      // 必须使用Vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id)
    },
    // 修改登录状态
    changeLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  }
})

// 暴露出去
export default store;
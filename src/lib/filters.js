// 导入Vue
import Vue from 'vue';
// 注册全局过滤器 方便使用
// 导入 moment
import moment from "moment";
Vue.filter("shortTime", value => {
  //   //console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  //console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});
Vue.filter("shortTimePlus", value => {
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});
// 增加笑脸的过滤器
Vue.filter("addSmlie", (value,smileType) => {
  //   return '😁😁😁😁😁😁';
  // 使用传递进来的笑脸
  return value+smileType;
});

import BaseEcharts from './base-echarts/index.vue'
const coms = [BaseEcharts];

//批量组件注册
const install = function (Vue) {
  coms.forEach((com) => {
    Vue.component(com.name,com)
  })
}
// export default install
export { install, BaseEcharts }

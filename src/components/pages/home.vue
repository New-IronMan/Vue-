<!--  -->
<template>
  <div class="home">
    <!-- 顶部导航 -->
    <v-nav class="nav"></v-nav>
    <div class="center">
      <!-- 左侧导航 -->
      <v-admin class="admin"></v-admin>
      <!-- 视图区 -->
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//引入左侧导航组件
import vAdmin from "../views/admin";
//引入顶部导航组件
import vNav from "../views/nav";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    vAdmin,
    vNav
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //路由判断如果未登录返回登录页
    if (localStorage.getItem("isAdmin") === null) {
      this.$router.replace("/login");
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
html,
body,
.home {
  width: 100vw;
  height: 100vh;
}
/* 整个页面 */
.home {
  display: flex;
  flex-direction: column;
}
/* 顶部导航 */
.nav {
  width: 100vw;
  height: 60px;
  background: red;
}
/* 中间内容 */
.center {
  flex: 1;
  display: flex;
}
/* 左侧导航条 */
.admin {
  width: 300px;
  height: 100%;
  /* background: #545c64; */
}
/* 视图区 */
.view {
  flex: 1;
}
</style>
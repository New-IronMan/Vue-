<!--  -->
<template>
  <div class="nav">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#FFD700"
      text-color="#000"
      active-text-color="#000"
    >
      <el-menu-item index="1" disabled>后台管理系统</el-menu-item>
      <el-submenu index="2-4" class="user">
        <template slot="title">
          <img
            class="img"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560998744&di=65dacff2a05a0659d835c302c7bed59d&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201509%2F10%2F20150910202533_t5w34.thumb.700_0.jpeg"
            alt
          >
        </template>
        <el-menu-item index="2-4-1" disabled>用户名 : {{name}}</el-menu-item>
        <el-menu-item index="2-4-2" @click="outbtn">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import API from "../../common/js/API";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      name: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 退出账号
    outbtn() {
      this.$http({
        url: API.exit
      }).then(e => {
        // console.log(e);
        this.$message({
          message: e.data.info,
          type: "success"
        });
      });
      this.$router.replace("/login");
      //localStorage清空所有的key
      window.localStorage.clear();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.name = localStorage.getItem("userName");
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
/* 整个导航 */
.nav {
  width: 100%;
  height: 60px;
  position: relative;
}
/* 用户 */
.user {
  float: right;
}
/* 用户头像 */
.img {
  width: 60px;
  height: 60px;
}
</style>
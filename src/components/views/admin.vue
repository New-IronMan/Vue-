<!--  -->
<template>
  <div class="admin1">
    <el-menu :span="12" class="admin">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#303133"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group v-if="lol1">
            <el-menu-item index="1-1" @click="guanliyuan" v-if="lol">管理员管理</el-menu-item>
            <el-menu-item index="1-2" @click="yonghu">用户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" @click="tongzhi">
          <i class="el-icon-message-solid"></i>
          <span slot="title">通知</span>
        </el-menu-item>
        <el-menu-item index="3" @click="shebei">
          <i class="el-icon-s-platform"></i>
          <span slot="title">设备管理</span>
        </el-menu-item>
      </el-menu>
    </el-menu>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //管理员
      lol: true,
      //用户
      lol1: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 管理员管理点击
    guanliyuan() {
      this.$router.push("/home/controller");
    },
    //用户管理点击
    yonghu() {
      this.$router.push("/home/user");
    },
    //通知点击
    tongzhi() {
      this.$router.push("/home/inform");
    },
    //设备点击
    shebei() {
      this.$router.push("/home/equipment");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "1") {
      this.lol = false;
    } else if (isAdmin === "2") {
      this.lol = false;
      this.lol1 = false;
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
/* 左侧整体样式 */
.admin {
  width: 300px;
  height: 100%;
  background-color:#fff;
  padding-right: 1px;
  /* border-right: solid 1px #e6e6e6; */
}
</style>
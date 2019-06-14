<!--  -->
<template>
  <div class="login">
    <div class="loginBox">
      <h2 class="title">登录</h2>
      <!-- 用户角色选择 -->
      <el-select v-model="user.type" placeholder="请选择" class="inp">
        <el-option v-for="item in options" :key="item.name" :value="item.type" :label="item.name"></el-option>
      </el-select>
      <!-- 用户名 -->
      <el-input v-model="user.name" placeholder="用户名" class="inp"></el-input>
      <!-- 密码 -->
      <el-input v-model="user.pass" placeholder="密码" class="inp"></el-input>
      <!-- 登录按钮 -->
      <el-button type="button" @click="loginbtn">登录</el-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//判断权限
// import isAdmin from '../../common/js/isAdmin'
import API from "../../common/js/API";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //用户角色选择
      options: [
        {
          name: "超级管理员",
          type: "0"
        },
        {
          name: "普通管理员",
          type: "1"
        },
        {
          name: "用户",
          type: "2"
        }
      ],

      //权限
      isAdmin: "",
      //账号密码用户类型
      user: {
        name: "",
        pass: "",
        type: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginbtn() {
      var data = this.user;
      this.$http({
        url: API.login,
        method: "post",
        data: this.user
      }).then(e => {
        // console.log(e.data.isAdmin)
        this.isAdmin = e.data.isAdmin;
        localStorage.setItem("isAdmin", this.isAdmin);
        localStorage.setItem("userName", this.user.name);
        //用户登录跳转
        if (e.data.isAdmin === 2) {
          this.$router.replace("/home/inform");
          // 超级管理员登陆
        } else if (e.data.isAdmin === 0) {
          this.$router.replace("/home/inform");
          //管理员登录
        } else if (e.data.isAdmin === 1) {
          this.$router.replace("/home/inform");
        } else {
          this.$message({
            message: e.data.info,
            type: "warning"
          });
        }
      });
    }
  },
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
/* 整个页面 */
html,
body,
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("../../../static/img/1.jpg");
  background-size: 100%;
}
/* 登录框 */
.loginBox {
  width: 350px;
  height: 250px;
  /* background: red; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: rgba(0, 0, 0, 0.3);
}
/* 标题 */
.title {
  font-size: 25px;
  color: #ccc;
}
/* 输入框，选择框 */
.inp {
  width: 100%;
  margin: 10px 0;
}
</style>
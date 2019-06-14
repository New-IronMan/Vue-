<!--  -->
<template>
  <div class="new">
    <h2 class="title">添加/修改用户</h2>
    <div style="margin: 20px;"></div>
    <!-- 输入框 -->
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      style="width:80%"
      class="formbox"
    >
      <el-form-item label="账号">
        <el-input v-model="formLabelAlign.name" :disabled="lol1"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.pass" :disabled="lol1"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="lol">
        <el-input v-model="formLabelAlign.pass1"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formLabelAlign.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.email"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formLabelAlign.sex" label="男" :disabled="lol1">男</el-radio>
        <el-radio v-model="formLabelAlign.sex" label="女" :disabled="lol1">女</el-radio>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formLabelAlign.idx" :disabled="lol1"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formLabelAlign.des"></el-input>
      </el-form-item>
      <!-- 时间 -->
      <div class="block">
        <span class="demonstration">生日</span>
        <el-date-picker
          v-model="formLabelAlign.time"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <!-- 注册 返回 按钮 -->
      <el-row class="zhuce">
        <el-button type="success" round @click="zhuce" v-if="lol">注册</el-button>
        <el-button type="success" round @click="xiugai" v-if="!lol">修改</el-button>
        <el-button type="info" round @click="$router.go(-1)">返回</el-button>
      </el-row>
    </el-form>
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
      // 输入框
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        pass: "",
        pass1: "",
        sex: "男",
        time: "",
        tel: ""
      },
      //性别   身份证号  账号 密码 真为禁用 假为不禁用
      lol: true,
      lol1: false,
      //id
      id: "",

      //   时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //点击修改
    xiugai() {
      this.$http({
        url: API.updateUser,
        params: {
          id: this.id,
          name: this.formLabelAlign.name,
          pass: this.formLabelAlign.pass,
          tel: this.formLabelAlign.tel,
          email: this.formLabelAlign.email,
          des: this.formLabelAlign.des
        }
      }).then(e => {
        //未登录返回登录页面
        if (e.data.code == -1) {
          this.$router.replace("/login");
        }
        if (e.data.code == 0) {
          //添加成功弹窗
          this.$message({
            message: e.data.info,
            type: "success"
          });
          //修改成功跳转用户页面
          this.$router.replace("/home/user");
        } else {
          //失败弹窗
          this.$message({
            message: e.data.info,
            type: "warning"
          });
        }
      });
    },
    //点击注册
    zhuce() {
      //确认密码判断
      if (this.formLabelAlign.pass !== this.formLabelAlign.pass1) {
        this.$message({
          message: "两次密码输入不一致，请重新填写",
          type: "warning"
        });
        return false;
        //验证邮箱
      } else if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign.tel)) {
        this.$message({
          message: "手机号码有误，请重新填写",
          type: "warning"
        });
        return false;
        //手机号码判断
      } else if (!/\w+@[a-z0-9]+\.[a-z]{2,4}/.test(this.formLabelAlign.email)) {
        this.$message({
          message: "邮箱输入有误，请重新填写",
          type: "warning"
        });
        return false;
      } else {
        this.$http({
          url: API.addUser,
          params: this.formLabelAlign
        }).then(e => {
          //code判断未登录返回登录页面
          if (e.data.code == -1) {
            this.$router.replace("/login");
          }
          if (e.data.code == 0) {
            //添加成功弹窗
            this.$message({
              message: e.data.info,
              type: "success"
            });
            //添加成功跳转用户页面
            console.log(this.formLabelAlign);
            this.$router.replace("/home/user");
          } else {
            //失败弹窗
            this.$message({
              message: e.data.info,
              type: "warning"
            });
          }
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //路由判断如果未登录返回登录页
    if (localStorage.getItem("isAdmin") === null) {
      this.$router.replace("/login");
    }
    //判断url的id是否为0     0是新建  有id是更改
    if (this.$route.params.id !== "0") {
      this.lol = false;
      this.lol1 = true;
      this.$http({
        url: API.findUser,
        params: {
          id: this.$route.params.id
        }
      }).then(e => {
        //code判断未登录返回登录页面
        if (e.data.code == -1) {
          this.$router.replace("/login");
        }
        this.id = this.$route.params.id;
        this.formLabelAlign = e.data.data[0];
      });
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
/* form表单 */
.formbox {
  margin: 0 auto;
}
/* 组件标题 */
.title {
  font-size: 20px;
  margin: 20px 0 20px 130px;
}
/* 时间 */
.block {
  margin-left: 50px;
}
/* 注册 返回 按钮 */
.zhuce {
  margin: 50px 0 0 430px;
}
/* 背景 */
.new {
  background: url("../../../static/img/2.jpg") no-repeat;
  background-size: 100%;
}
</style>
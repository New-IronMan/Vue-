<!--  -->
<template>
  <div class="new">
    <h2 class="title">添加/修改设备</h2>
    <div style="margin: 20px;"></div>
    <!-- 输入框 -->
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      style="width:80%"
      class="formbox"
    >
      <el-form-item label="IP">
        <el-input v-model="formLabelAlign.ip"></el-input>
      </el-form-item>
      <el-form-item label="机房">
        <el-input v-model="formLabelAlign.door"></el-input>
      </el-form-item>
      <el-form-item label="编号" v-if="lol">
        <el-input v-model="formLabelAlign.num"></el-input>
      </el-form-item>
      <el-form-item label="宽带">
        <el-input v-model="formLabelAlign.width"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="formLabelAlign.status" label="1">空闲</el-radio>
        <el-radio v-model="formLabelAlign.status" label="0">已出售</el-radio>
      </el-form-item>
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
        ip: "",
        door: "",
        num: "",
        width: "",
        status: "1"
      },
      id: "",
      lol: true,
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
      },
      value1: "",
      value2: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 点击修改
    xiugai() {
      this.$http({
        url: API.updateDevice,
        params: {
          id: this.id,
          ip: this.formLabelAlign.ip,
          door: this.formLabelAlign.door,
          width: this.formLabelAlign.width,
          status: this.formLabelAlign.status
        }
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
          //修改成功跳转页面
          this.$router.replace("/home/equipment");
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
      this.$http({
        url: API.addDevice,
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
          //修改成功跳转页面
          this.$router.replace("/home/equipment");
        } else {
          //失败弹窗
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
    if (this.$route.params.id !== "0") {
      this.lol = false;
      this.id = this.$route.params.id;
      this.$http({
        url: API.findDevice,
        params: {
          id: this.$route.params.id
        }
      }).then(e => {
        //code判断未登录返回登录页面
        if (e.data.code == -1) {
          this.$router.replace("/login");
        }
        this.formLabelAlign = e.data.data[0];
      });
    }
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
  margin-left: 30px;
}
/* 注册 返回 按钮 */
.zhuce {
  margin: 50px 0 0 430px;
}
/* 背景 */
.new {
  background: url("../../../static/img/3.jpg") no-repeat;
  background-size: 100%;
}
</style>
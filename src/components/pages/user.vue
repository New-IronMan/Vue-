<template>
  <div class="controller">
    <el-row>
      <h2 class="title">用户管理</h2>
    </el-row>
    <el-row>
      <el-button type="info" class="btn" @click="newbtn">新建</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" class="box">
      <el-table-column fixed label="注册时间" width="200">
        <template slot-scope="scope">{{scope.row.time|date}}</template>
      </el-table-column>
      <el-table-column prop="name" label="账号" width="100"></el-table-column>
      <el-table-column prop="tel" label="电话" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="idx" label="身份证号" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="shanchu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 点击删除
    shanchu(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delUser,
            params: {
              id: row.id
            }
          }).then(e => {
            if (e.data.code == 0) {
              //添加成功弹窗
              this.$message({
                message: e.data.info,
                type: "success"
              });
              //修改成功重新查询用户
              this.$http({
                url: API.findUser
              }).then(e => {
                //code判断未登录返回登录页面
                if (e.data.code == -1) {
                  this.$router.replace("/login");
                }
                ///////////////
                this.tableData = e.data.data;
              });
            } else {
              //失败弹窗
              this.$message({
                message: e.data.info,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击编辑
    handleClick(row) {
      this.$router.push("/home/newadmin/" + row.id);
    },
    //点击新建用户跳转
    newbtn() {
      this.$router.push("/home/newadmin/0");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$http({
      url: API.findUser
    }).then(e => {
      //code判断未登录返回登录页面
      if (e.data.code == -1) {
        this.$router.replace("/login");
      }
      // console.log(e.data.data)
      this.tableData = e.data.data;
    });
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
/* 信息框样式 */
.box {
  margin: 0 auto;
}
/* 新建按钮 */
.btn {
  margin: 20px 0 20px 130px;
}
/* 标题 */
.title {
  font-size: 30px;
  color: #303133;
  line-height: 60px;
  margin-left: 30px;
}
/* 背景 */
.controller {
  background: url("../../../static/img/4.jpg") no-repeat;
  background-size: 100%;
}
</style>
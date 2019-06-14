<!--  -->
<template>
  <div class="controller">
    <el-row>
      <h2 class="title">管理员管理</h2>
    </el-row>
    <el-row>
      <el-button type="info" class="btn" @click="newbtn">新建</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" class="box">
      <el-table-column fixed label="注册时间" width="200">
        <template slot-scope="scope">{{scope.row.time|date}}</template>
      </el-table-column>
      <el-table-column prop="name" label="账号" width="200"></el-table-column>
      <el-table-column prop="prop" label="属性" width="500"></el-table-column>
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
    //点击删除
    shanchu(row) {
      this.$confirm("此操作将永久删除该管理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delManage,
            params: {
              id: row.id
            }
          }).then(e => {
            //code判断未登录返回登录页面
            if (e.data.code == -1) {
              this.$router.replace("/login");
            }
            this.$message({
              message: e.data.info,
              type: "success"
            });
            //删除成功重新查询管理员
            //查询管理员
            this.$http({
              url: API.controller
            }).then(e => {
              //code判断未登录返回登录页面
              if (e.data.code == -1) {
                this.$router.replace("/login");
              }
              this.tableData = e.data.data;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击编辑跳转
    handleClick(row) {
      this.$router.push("/home/new/" + row.id);
    },
    //点击新建跳转
    newbtn() {
      this.$router.push("/home/new/0");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //查询管理员
    this.$http({
      url: API.controller
    }).then(e => {
      //code判断未登录返回登录页面
      if (e.data.code == -1) {
        this.$router.replace("/login");
      }
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
  background: url("../../../static/img/3.jpg") no-repeat;
  background-size: 100%;
}
</style>
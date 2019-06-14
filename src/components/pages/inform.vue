<template>
  <div class="controller">
    <el-row>
      <h2 class="title">通知管理</h2>
    </el-row>
    <el-row>
      <el-button type="info" class="btn" @click="newbtn" v-if="isAdmin">新建</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" class="box">
      <el-table-column fixed label="注册时间" width="250">
        <template slot-scope="scope">{{scope.row.time|date}}</template>
      </el-table-column>
      <el-table-column prop="tit" label="题目" width="500"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="chakan(scope.row)" type="success" size="small" v-if="!isAdmin">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="success" size="small" v-if="isAdmin">编辑</el-button>
          <el-button type="info" size="small" @click="shanchu(scope.row)" v-if="isAdmin">删除</el-button>
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
      //用户登录权限
      isAdmin: true,
      tableData: [
        // {
        //   time: "2016-05-02",
        //   tit: "weqwewqe",
        //   con: "wewqewqewqewqewqewq"
        // }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //点击查看
    chakan(row) {
      this.$router.push("/home/newnotice/" + row.id);
    },
    //点击删除
    shanchu(row) {
      this.$confirm("此操作将永久删除该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delNews,
            params: {
              id: row.id
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
              //删除成功重新查询通知
              this.$http({
                url: API.findNews
              }).then(e => {
                //code判断未登录返回登录页面
                if (e.data.code == -1) {
                  this.$router.replace("/login");
                }
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
    //点击编辑
    handleClick(row) {
      this.$router.replace("/home/newnotice/" + row.id);
    },
    //点击新建用户跳转
    newbtn() {
      this.$router.push("/home/newnotice/0");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //路由判断如果未登录返回登录页
    if (localStorage.getItem("isAdmin") === null) {
      this.$router.replace("/login");
    }
    //查询通知
    this.$http({
      url: API.findNews
    }).then(e => {
      this.tableData = e.data.data;
    });
    ////////////////////////////////
    //判断权限
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "2") {
      this.isAdmin = false;
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
  background: url("../../../static/img/2.jpg") no-repeat;
  background-size: 100%;
}
</style>
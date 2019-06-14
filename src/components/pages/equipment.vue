<template>
  <div class="controller">
    <el-row>
      <h2 class="title">设备管理</h2>
    </el-row>
    <el-row v-if="isAdmin">
      <el-button type="info" class="btn" @click="newbtn" v-if="isAdmin">新建</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 80%" class="box">
      <el-table-column prop="ip" label="IP" width="200"></el-table-column>
      <el-table-column prop="door" label="机房" width="200"></el-table-column>
      <el-table-column prop="num" label="编号" width="160"></el-table-column>
      <el-table-column prop="width" label="宽带" width="100"></el-table-column>
      <!--  管理员使用-->
      <el-table-column label="使用" width="200" v-if="isAdmin1">
        <template slot-scope="scope">
          <span>{{scope.row.status==1?"空闲":"已出售"}}</span>
        </template>
      </el-table-column>
      <!-- 用户使用 -->
      <el-table-column fixed="right" label="使用" width="200" v-if="!isAdmin">
        <template slot-scope="scope">
          <el-button
            @click="goumai(scope.row)"
            type="success"
            size="small"
            v-if="scope.row.status==1"
          >购买</el-button>
          <el-button type="info" size="small" :disabled="true" v-if="scope.row.status==0">已出售</el-button>
        </template>
      </el-table-column>
      <!-- 管理员操作 -->
      <el-table-column fixed="right" label="操作" width="100" v-if="isAdmin1">
        <template slot-scope="scope" v-if="isAdmin1">
          <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="isAdmin1">编辑</el-button>
          <el-button type="text" size="small" @click="shanchu(scope.row)" v-if="isAdmin1">删除</el-button>
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
      //id
      id: "",
      //购买按钮
      lol: "",
      //用户权限
      isAdmin: true,
      isAdmin1: true,
      tableData: [
        {
          ip: "",
          door: "",
          num: "",
          width: "",
          status: ""
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //点击购买
    goumai(row) {
      this.$http({
        url: API.updateDevice,
        params: {
          id: row.id,
          status: 0
        }
      }).then(e => {
        //code判断未登录返回登录页面
        if (e.data.code == -1) {
          this.$router.replace("/login");
        }
        if (e.data.code == 0) {
          //添加成功弹窗
          this.$message({
            message: "购买成功",
            type: "success"
          });
          //购买成功重新查询设备
          this.$http({
            url: API.findDevice
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
    },
    //点击删除
    shanchu(row) {
      this.$confirm("此操作将永久删除该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: API.delDevice,
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
              //删除成功重新查询设备
              this.$http({
                url: API.findDevice
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
      this.$router.replace("/home/newequipment/" + row.id);
    },
    //点击新建用户跳转
    newbtn() {
      this.$router.push("/home/newequipment/0");
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //路由判断如果未登录返回登录页
    if (localStorage.getItem("isAdmin") === null) {
      this.$router.replace("/login");
    }
    //查询设备
    this.$http({
      url: API.findDevice
    }).then(e => {
      //code判断未登录返回登录页面
      if (e.data.code == -1) {
        this.$router.replace("/login");
      }
      this.tableData = e.data.data;
    });
    ////////////////////////////////////////////
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {
    //判断权限
    this.ev.$on("isAdmin", e => {
      if (e === 2) {
        this.isAdmin = false;
        this.isAdmin1 = false;
        // console.log(this.isAdmin, this.isAdmin1);
      }
    });
  }, //生命周期 - 创建之前
  beforeMount() {
    //判断权限
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "2") {
      this.isAdmin = false;
      this.isAdmin1 = false;
    }
  }, //生命周期 - 挂载之前
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
  background: url("../../../static/img/1.jpg") no-repeat;
  background-size: 100%;
}
</style>
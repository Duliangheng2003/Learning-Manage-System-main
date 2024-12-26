<template>
  <div class="app-container">
    <el-table :data="filteredTableData.slice(0, 5)" style="width: 100%">
      <el-table-column label="学生id" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.sname }}</p>
            <p>学号：{{ scope.row.sid }}</p>
            <p>性别：{{ scope.row.gender }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>邮箱: {{ scope.row.email }}</p>
            <p>电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.email }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center; margin-top: 20px;">
      <el-button type="primary" @click="viewAllStudents">查看更多</el-button>
    </div>
  </div>
</template>

<script>
import { delStu, getStu } from "@/api/stu";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter(item => item.type !== 0 && item.type !== 2);
    }
  },
  methods: {
    fetchData() {
      getStu().then((response) => {
        this.tableData = response.data.items;
      });
    },
    viewAllStudents() {
      this.$router.push("/stu/list/");
    },
    handleEdit(id) {
      // 路由跳转  /emp/save/xxxxxxx"
      this.$router.push("/stu/save/" + id);
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用api中删除讲师的方法
          delStu(id).then((response) => {
            // 删除成功后，重新加载讲员工表
            this.$router.push("/stu/list/");
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 20px auto;
}
</style>




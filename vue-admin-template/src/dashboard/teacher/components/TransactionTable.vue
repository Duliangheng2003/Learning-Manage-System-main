<template>
  <div class="app-container">
    <h3>学生列表</h3>
    <el-table
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label="学生id" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110">
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
      <el-table-column label="联系方式" width="100">
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
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加查看全部按钮 -->
    <div class="button-container">
      <el-button type="primary" @click="toggleView">
        {{ '查看全部' }}
      </el-button>
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
      pagesize: 5,
      currentPage: 1,
      tableData: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleEdit(id) {
      // 路由跳转  /emp/save/xxxxxxx"
      this.$router.push("/stu/save/" + id);
    },
    fetchData() {
      getStu().then((response) => {
        this.tableData = response.data.items;
      });
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
    toggleView() {
      this.$router.push("/stu/list/");
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 20px auto;
}

/* 为分页组件添加额外的间距 */
.pagination-container {
  margin-top: 20px; /* 可以调整这个值来增加或减少间距 */
}

.button-container {
  margin-top: 20px;
  text-align: right; /* 将按钮右对齐 */
}

.button-container .el-button {
  margin-right: 15px; /* 增加按钮右侧的间距 */
}
</style>

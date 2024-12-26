<template>
  <div class="app-container">
    <!-- 禁用学生注册按钮 -->
    <el-button 
      type="danger" 
      @click="disableStudentRegistration"
    >
      禁用学生注册
    </el-button>

    <el-table
      :data="
        tableData.filter(item => item.type !== 2).slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%"
    >
      <el-table-column label="用户ID" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.sname }}</p>
            <p>学号/工号：{{ scope.row.sid }}</p>
            <p>性别：{{ scope.row.gender }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.birthday | moment("MM-DD")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.age
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.pwd
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>邮箱: {{ scope.row.email }}</p>
            <p>电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.type === 0 ? 'success' : 'warning'"
                size="medium"
              >
                {{ scope.row.type === 0 ? '学生' : '教师' }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="filteredTableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { delStu, getStu, disableStudentRegistration as apiDisableStudentRegistration } from "@/api/stu";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      tableData: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter(item => item.type !== 2);
    }
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
      this.$router.push("/user/save/" + id);
    },
    fetchData() {
      getStu().then((response) => {
        this.tableData = response.data.items;
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用api中删除讲师的方法
          delStu(id).then((response) => {
            // 删除成功后，重新加载讲员工表
            this.$router.push("/user/list/");
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
    disableStudentRegistration() {
      this.$confirm("此操作将禁用学生注册, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          apiDisableStudentRegistration().then(response => {
            this.$alert('学生注册已被禁用', '禁用成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'success',
                  message: '禁用学生注册成功!'
                });
              }
            });
          }).catch(error => {
            this.$message({
              type: "error",
              message: "禁用学生注册失败!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消禁用学生注册",
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




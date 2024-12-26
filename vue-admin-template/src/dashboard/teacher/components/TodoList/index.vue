<template>
  <div class="app-container">
    <!-- 课程列表 start -->
      <h3>课程列表</h3>
    <el-table
      :data="courses.slice(0, 5)"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="120">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="120" prop="name">
      </el-table-column>
      <el-table-column
        label="状态"
        width="120"
        prop="status">
        <template slot-scope="scope">
          <span :class="getStatusClass(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleCheck4(scope.row.id)">布置作业</el-button>

        </template>
      </el-table-column>
    </el-table>
      <!-- 查看全部按钮 -->
      <div class="button-container">
    <el-button type="primary" @click="viewAll">查看全部</el-button>
  </div>
  </div>
</template>

<script>
import { getAll, deleteByID, updateCourseStatus } from '@/api/course';

export default {
  filters: {
    moment(date) {
      return date;
    },
  },
  data() {
    return {
      courses: [],
    };
  },
  created() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      getAll().then((response) => {
        this.courses = response.data.items;
      });
    },
    viewAll() {
      this.$router.push('/course/list');
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteByID(id).then(() => {
          this.getCourses();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        });
      });
    },
    handleEdit(id) {
      this.$router.push('/course/save/' + id);
    },
    handleCheck(id) {
      this.$router.push('/course/students/' + id);
    },
    handleCheck2(id) {
      this.$router.push('/course/materials/' + id);
    },
    handleCheck3(id) {
      this.$router.push('/course/courseware/' + id);
    },
    handleCheck4(id) {
      this.$router.push('/course/assignment/' + id);
    },
    togglePublishStatus(id, currentStatus) {
      if (currentStatus === 0) {
        this.dialogVisible = true;
      } else {
        const newStatus = 0;
        updateCourseStatus(id, newStatus)
          .then(() => {
            this.getCourses();
            this.$message({
              type: 'success',
              message: '状态更新成功!',
            });
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '状态更新失败!',
            });
          });
      }
    },
    getStatusClass(status) {
      return status === 1 ? 'status-published' : 'status-draft';
    },
    getStatusText(status) {
      return status === 1 ? '已发布' : '待发布';
    },
    publishButtonText(status) {
      return status === 1 ? '撤回发布' : '发布课程';
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 20px auto;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.status-published {
  color: green;
}

.status-draft {
  color: gray;
}

.button-container {
  margin-top: 20px;
  text-align: right; /* 将按钮右对齐 */
}

.button-container .el-button {
  margin-right: 15px; /* 增加按钮右侧的间距 */
}
</style>

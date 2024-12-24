<template>
  <div class="app-container">
    <!-- 我的课程标题及卡片 -->
    <el-card class="course-card" shadow="hover" style="margin-bottom: 20px;">
      <h2>我的课程</h2>
      <el-table :data="courses.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%">

        <el-table-column label="名称" width="180" prop="name"></el-table-column>
        <el-table-column label="结束时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.endTime | moment }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">退课</el-button>
            <el-button size="mini" type="primary" @click="getDetail(scope.row.id)">查看细节</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize" :total="courses.length" @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>

    <!-- 待完成学习任务卡片 -->
    <el-card class="task-card" shadow="hover" style="margin-top: 30px;">
      <h2>待完成学习任务</h2>
      <el-list>
        <el-list-item v-for="task in tasks" :key="task.id">
          <el-card :body-style="{ padding: '20px' }">
            <h3>{{ task.name }}</h3>
            <p>{{ task.description }}</p>
            <el-button type="primary" size="small" @click="completeTask(task.id)">完成任务</el-button>
          </el-card>
        </el-list-item>
      </el-list>
    </el-card>
  </div>
</template>

<script>
import { getCourse, deletePersonal } from '@/api/course'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      courses: [],
      tasks: [
        { id: 1, name: '课程1学习任务', description: '完成课程1的学习任务' },
        { id: 2, name: '课程2学习任务', description: '完成课程2的学习任务' },
        { id: 3, name: '课程3学习任务', description: '完成课程3的学习任务' },
      ]
    }
  },
  created() {
    this.getCourses()
  },
  methods: {
    getDetail(id) {
      this.$router.push("/course/detail/" + id);
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    getCourses() {
      getCourse(getToken()).then(response => {
        this.courses = response.data.courses
      })
    },
    handleDelete(id) {
      this.$confirm('请确定是否退课?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePersonal(id, getToken()).then(response => {
          this.getCourses()
          this.$message({
            type: 'success',
            message: '退课成功!'
          });
        })
      })
    },
    completeTask(taskId) {
      this.$router.push("/stu/my-learning/submit");
    }
  }
}
</script>

<style scoped>
.course-card, .task-card {
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.task-card {
  background-color: #f9f9f9;
}

.el-table {
  margin-top: 20px;
}

.el-button {
  margin-top: 10px;
}
</style>

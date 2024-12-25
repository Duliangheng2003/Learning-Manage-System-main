<template>
  <div class="app-container">
    <!-- 课程列表  start -->
    <el-table
      :data="courses.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        width="180">
        <template slot-scope="scope">
          <img style="width: 100px; height: 100px; border:none;" :src="scope.row.logo">
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="180" prop="name">
      </el-table-column>
      <el-table-column
        label="简介"
        width="180" prop="title">
      </el-table-column>
      <el-table-column label="结束时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">退课</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getDetail(scope.row.id)">查看细节</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 课程列表  end -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="courses.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
import { getCourse, deleteByID, deletePersonal } from '@/api/course'
import { getToken } from '@/utils/auth'

export default {
  filters: {
    formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
    }
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      courses: []
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
    // 获取所有课程
    getCourses() {
      getCourse(getToken()).then(response => {
        this.courses = response.data.courses
      })
    },
    // 根据id删除课程
    handleDelete(id) {
      // 弹出提示框
      this.$confirm('请确定是否退课?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用api中删除课程的方法
        deletePersonal(id, getToken()).then(response => {
          // 删除成功后，重新加载课程列表
          this.getCourses()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      })
    }
  }
}
</script>

<style scoped>
/* 添加一些基本样式 */
.el-button--primary {
  margin-left: 10px;
}
</style>




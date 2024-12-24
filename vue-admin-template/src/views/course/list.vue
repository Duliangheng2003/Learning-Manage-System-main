<template>
  <div class="app-container">
    <!-- 课程列表  start -->
    <el-table
      :data="courses.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="180" prop="name">
      </el-table-column>
      <el-table-column
        label="类型"
        width="180" prop="title">
      </el-table-column>
      <el-table-column label="结束时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.endTime | moment }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        width="180"
        prop="status">
        <template slot-scope="scope">
          <span :class="getStatusClass(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            @click="handleCheck(scope.row.id)">学生名单</el-button>
          <el-button
            size="mini"
            @click="handleCheck4(scope.row.id)">布置作业</el-button>
          <el-button
            size="mini"
            @click="togglePublishStatus(scope.row.id, scope.row.status)">
            {{ publishButtonText(scope.row.status) }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleCheck2(scope.row.id)">删除课件</el-button>
          <el-button
            size="mini"
            @click="handleCheck3(scope.row.id)">添加课件</el-button>
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

    <!-- 发布课程对话框 -->
    <el-dialog
      title="发布课程"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-form :model="publishForm" label-width="120px">
        <el-form-item label="是否开启评论区">
          <el-switch v-model="publishForm.enableComments"></el-switch>
        </el-form-item>
        <el-form-item label="是否开启笔记区">
          <el-switch v-model="publishForm.enableNotes"></el-switch>
        </el-form-item>
      </el-form>
      <h3>发布预览</h3>
      <div class="preview-card">
        <h4>{{ selectedCourse.name }}</h4>
        <p><strong>类型:</strong> {{ selectedCourse.title }}</p>
        <p><strong>结束时间:</strong> {{ selectedCourse.endTime | moment }}</p>
        <p><strong>状态:</strong> <span :class="getStatusClass(1)">{{ getStatusText(1) }}</span></p>
        <p><strong>评论区:</strong> {{ publishForm.enableComments ? '开启' : '关闭' }}</p>
        <p><strong>笔记区:</strong> {{ publishForm.enableNotes ? '开启' : '关闭' }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPublish">确认发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAll, deleteByID, updateCourseStatus } from '@/api/course'
import { status } from 'nprogress';

export default {
  filters: {
    moment(date) {
      // 假设这里有一个 moment.js 的过滤器来格式化日期
      return date; // 这里可以根据需要替换为实际的日期格式化逻辑
    }
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      courses: [],
      dialogVisible: false,
      selectedCourse: {},
      publishForm: {
        enableComments: false,
        enableNotes: false
      }
    }
  },
  created() {
    this.getCourses()
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    // 获取所有课程
    getCourses() {
      getAll().then(response => {
        this.courses = response.data.items
      })
    },
    // 根据id删除课程
    handleDelete(id) {
      // 弹出提示框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用api中删除课程的方法
        deleteByID(id).then(response => {
          // 删除成功后，重新加载课程列表
          this.getCourses()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      })
    },
    handleEdit(id) {
      // 路由跳转  /course/save/xxxxxxx"
      this.$router.push("/course/save/" + id)
    },
    handleCheck(id) {
      this.$router.push("/course/students/" + id)
    },
    handleCheck2(id) {
      this.$router.push("/course/materials/" + id)
    },
    handleCheck3(id) {
      this.$router.push("/course/courseware/" + id)
    },
    handleCheck4(id) {
      this.$router.push("/course/assignment/" + id)
    },
    togglePublishStatus(id, currentStatus) {
      if (currentStatus === 0) {
        this.selectedCourse = this.courses.find(course => course.id === id);
        this.dialogVisible = true;
      } else {
        const newStatus = 0;
        updateCourseStatus(id, newStatus).then(response => {
          // 更新成功后，重新加载课程列表
          this.getCourses();
          this.$message({
            type: 'success',
            message: '状态更新成功!'
          });
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '状态更新失败!'
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
    handleClose(done) {
      this.dialogVisible = false;
      done();
    },
    confirmPublish() {
      // 构建要发送的数据
      // const updateData = {
      //   status: 1,
      //   enableComments: this.publishForm.enableComments,
      //   enableNotes: this.publishForm.enableNotes
      // };

      // 调用API更新课程状态
      updateCourseStatus(this.selectedCourse.id, 1).then(response => {
        // 更新成功后，重新加载课程列表
        this.getCourses();
        this.dialogVisible = false;
        this.$message({
          type: 'success',
          message: '课程发布成功!'
        });
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '课程发布失败!'
        });
      });
    }
  }
}
</script>

<style scoped>
.status-published {
  color: green;
}

.status-draft {
  color: gray;
}

.preview-card {
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style>




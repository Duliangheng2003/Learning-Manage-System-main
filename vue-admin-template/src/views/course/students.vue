<template>
  <div class="app-container">
    <!-- 学生名单  start -->
    <el-table
      :data="students.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="180">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="名字"
        width="180" prop="sname">
      </el-table-column>
      <el-table-column fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="showAssignmentDialog(scope.row.id)">查看作业</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="students.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>

    <!-- 作业完成情况对话框 -->
    <el-dialog
      title="作业完成情况"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-table
        :data="assignments"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="90">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="作业名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="提交状态"
          width="120">
          <template slot-scope="scope">
            <span :class="getStatusClass(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === 1"
              size="mini"
              @click="viewAssignmentDetail(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStudents, getAssignmentsById } from '@/api/course'

export default {
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      students: [],
      dialogVisible: false,
      assignments: []
    }
  },
  created() {
    this.getStudents(this.$route.params.id)
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    // 获取所有学生
    getStudents(id) {
      getStudents(id).then(response => {
        this.students = response.data.students
      })
    },
    // 显示作业完成情况对话框
    showAssignmentDialog(studentId) {
      this.dialogVisible = true;
      this.getAssignments(studentId);
    },

    // 获取某个学生的作业完成情况
    getAssignments(studentId) {
      getAssignmentsById(studentId).then(response => {
        this.assignments = response.data.assignments;
      });
    },

    handleClose(done) {
      this.dialogVisible = false;
      done();
    },
    // 根据 status 返回对应的文本
    getStatusText(status) {
      return status === 1 ? '已提交' : '未提交';
    },
    // 根据 status 返回对应的样式类
    getStatusClass(status) {
      return status === 1 ? 'submitted' : 'not-submitted';
    },
    // 查看作业详情
    viewAssignmentDetail(assignmentId) {
      this.$router.push({ path: `/course/submit/` + assignmentId});
    }
  }
}
</script>

<style scoped>
/* 添加一些样式以美化表格和对话框 */
.submitted {
  color: green;
}

.not-submitted {
  color: red;
}
</style>




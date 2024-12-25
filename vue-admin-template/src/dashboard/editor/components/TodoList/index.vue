<template>
  <div class="todo-list-container">
    <!-- 状态筛选 -->
    <el-radio-group v-model="filterStatus" @change="handleFilterChange" style="margin-bottom: 20px;">
      <el-radio :label="0">待完成</el-radio>
      <el-radio :label="1">已完成</el-radio>
    </el-radio-group>

    <!-- 待办事项列表 -->
    <el-table
      :data="filteredAssignments.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="150"
        prop="name">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleViewAssignment(scope.row.id)">查看</el-button>
            <br>
          <el-button
            v-if="scope.row.status === 0"
            size="mini"
            type="success"
            @click="handleSubmitAssignment(scope.row.id)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="filteredAssignments.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
import { getAssignmentsById } from '@/api/course'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      pagesize: 10, // 每页显示的作业数量
      currentPage: 1, // 当前页码
      assignments: [], // 作业列表数据
      filterStatus: 0 // 默认显示待完成的作业
    }
  },
  computed: {
    filteredAssignments() {
      if (this.filterStatus === '') {
        return this.assignments;
      } else {
        return this.assignments.filter(assignment => assignment.status === this.filterStatus);
      }
    }
  },
  created() {
    this.getAssignments()
  },
  methods: {
    getAssignments() {
      getAssignmentsById(getToken()).then(response => {
        this.assignments = response.data.assignments
      })
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    getStatusText(status) {
      switch (status) {
        case 0:
          return '待完成';
        case 1:
          return '已完成';
        default:
          return '未知';
      }
    },
    handleViewAssignment(id) {
      // 导航到作业详情页面
      this.$router.push(`/stu/assignment/view/${id}`)
    },
    handleSubmitAssignment(id) {
      // 导航到提交作业页面
      this.$router.push(`/stu/submit/${id}`)
    },
    handleFilterChange(value) {
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
.todo-list-container {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
}

.el-table {
  width: 100%;
  margin-top: 16px;
}
</style>

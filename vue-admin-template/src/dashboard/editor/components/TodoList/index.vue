<template>
  <div class="todo-list-container">
    <!-- 标题 -->
    <h2>待办事项</h2>

    <!-- 状态筛选 -->
    <el-radio-group v-model="filterStatus" @change="handleFilterChange" style="margin-bottom: 5px;">
      <el-radio :label="0">待完成</el-radio>
      <el-radio :label="1">已完成</el-radio>
    </el-radio-group>

    <!-- 待办事项列表 -->
    <el-table
      :data="filteredAssignments.slice(0, 5)"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="150"
        prop="name">
      </el-table-column>
      <el-table-column label="截止日期">
        <template slot-scope="scope">
          {{ formatDate(scope.row.dueDate) }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看更多按钮 -->
    <el-button
      v-if="filteredAssignments.length > 5"
      type="text"
      @click="viewAllAssignments"
      style="margin-top: 5px;"
    >
      查看更多
    </el-button>
  </div>
</template>

<script>
import { getAssignmentsById } from '@/api/course'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
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
        this.assignments = response.data.assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}-${day}`;
    },
    handleFilterChange(value) {
      // 不需要重置当前页码，因为没有分页
    },
    viewAllAssignments() {
      // 导航到完整的待办事项列表页面
      this.$router.push('/stu/todolist')
    }
  }
}
</script>

<style scoped>
.todo-list-container {
  padding: 5px 15px;
  background-color: white;
  border-radius: 8px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.el-table {
  width: 100%;
  margin-top: 10px;
}

.el-button {
  margin-top: 5px;
}
</style>




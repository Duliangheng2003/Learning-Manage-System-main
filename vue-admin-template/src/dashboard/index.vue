<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import teacherDashboard from './teacher'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, teacherDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'  // 默认角色
    }
  },
  computed: {
    ...mapGetters([
      'roles'  // 获取用户角色
    ])
  },
  created() {
    // 判断用户角色并跳转
    // 教师角色
    if (this.roles.includes('teacher')) {
      this.currentRole = 'teacherDashboard'
    }
    if (this.roles.includes('student')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

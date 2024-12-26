<template>
  <div class="dashboard-editor-container">
    <!-- 第一行，包含用户头像、姓名、角色和介绍信息 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class=" clearfix">
        <!-- 用户头像和姓名 -->
        <pan-thumb :image="avatar" style="float: left">
          姓名:<br>
          <span class="pan-info-roles">{{ name }}</span>
        </pan-thumb>
        <!-- GitHub 角标 -->
        <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />
        <!-- 用户介绍信息 -->
        <div class="info-container">
          <span class="display_name"><br>{{name}}，{{ introduction }}</span>
          <span style="font-size:20px;padding-top:20px;display:inline-block;"></span>
        </div>
      </div>
    </el-row>
    <!-- 第二行，包含待办事项列表、交易表格和卡片组件 -->
    <el-row :gutter="8">

      <!-- 交易表格，占据不同屏幕尺寸下的不同列数 -->
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <!-- 待办事项列表，占据不同屏幕尺寸下的不同列数 -->
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="margin-bottom:30px;">
        <todo-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导入待办事项列表组件
import TodoList from './components/TodoList'
// 导入卡片组件
import BoxCard from './components/BoxCard'
// 导入 Vuex 的 mapGetters 辅助函数
import { mapGetters } from 'vuex'
// 导入用户头像组件
import PanThumb from '@/components/PanThumb'
// 导入 GitHub 角标组件
import GithubCorner from '@/components/GithubCorner'
// 导入交易表格组件
import TransactionTable from './components/TransactionTable'

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner, TransactionTable, TodoList, BoxCard },
  data() {
    return {
      // 空的 GIF 图片链接
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    // 使用 Vuex 的 mapGetters 辅助函数获取用户信息
    ...mapGetters([
      'name',
      'avatar',
      'introduction',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // 容器内边距
  padding: 32px;
  // 背景颜色
  background-color: rgb(240, 242, 245);
  // 相对定位
  position: relative;

  .github-corner {
    // 绝对定位，位于右上角
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    // 背景颜色
    background: #fff;
    // 内边距
    padding: 16px 16px 0;
    // 底部外边距
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    // 小屏幕下的内边距
    padding: 8px;
  }
}
</style>

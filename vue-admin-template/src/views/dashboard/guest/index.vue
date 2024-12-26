<template>
  <div class="dashboard-editor-container">
    <!-- 第一行，包含用户头像、姓名、角色和介绍信息 -->
    <el-row style="background:#fff; padding:16px 16px 0; margin-bottom:16px;">
      <div class="clearfix">
        <!-- 用户头像和姓名 -->
        <div class="avatar-container" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          <img :src="avatar" alt="Avatar" class="avatar-image">
          <div v-if="showTooltip" class="tooltip">
            <span>我是游客</span>
          </div>
        </div>
        <!-- 用户介绍信息 -->
        <div class="info-container">
          <span class="display_name">{{ name }}</span>
          <span class="introduction">{{ introduction }}</span>
        </div>
      </div>
    </el-row>

  </div>
</template>

<script>
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { mapGetters } from 'vuex'
import GithubCorner from '@/components/GithubCorner'
import TransactionTable from './components/TransactionTable'

export default {
  name: 'TeacherDashboard',
  components: { GithubCorner, TransactionTable, TodoList, BoxCard },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      showTooltip: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'introduction',
      'roles',
      'sid' // 假设 Vuex 中有 sid 这个字段
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .avatar-container {
    position: relative;
    float: left;
    margin-right: 20px;

    .avatar-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: transform 0.2s ease-in-out, filter 0.2s ease-in-out;
    }

    .avatar-image:hover {
      transform: scale(1.1);
      filter: contrast(130%);
    }

    .tooltip {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 1;
      text-align: center;
    }
  }

  .info-container {
    display: inline-block;
    vertical-align: middle;

    .display_name {
      font-size: 24px;
      font-weight: bold;
      display: block;
      margin-bottom: 10px;
    }

    .introduction {
      font-size: 20px;
      color: #606266;
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }

  .avatar-container {
    margin-right: 10px;
  }

  .info-container {
    .display_name {
      font-size: 20px;
    }

    .introduction {
      font-size: 16px;
    }
  }
}
</style>

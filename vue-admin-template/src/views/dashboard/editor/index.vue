<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="clearfix">
        <div class="avatar-container" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
          <img :src="avatar" alt="Avatar" class="avatar-image">
          <div v-if="showTooltip" class="tooltip">
            <span>姓名: {{ name }}</span><br>
            <span>学号: 2022150253</span>
          </div>
        </div>

        <div class="info-container">
          <span class="display_name"><br>{{ introduction }}</span>
          <span style="font-size:20px;padding-top:20px;display:inline-block;"></span>
        </div>
      </div>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
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
  name: 'DashboardEditor',
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
      'sid' ,
      'introduction',
      'roles'
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
      bottom: -40px; /* 调整位置以适应两行文本 */
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 1;
      text-align: center; /* 文本居中对齐 */
    }
  }

  .info-container {
    display: inline-block;
    vertical-align: middle;
  }

  .display_name {
    font-size: 24px;
    font-weight: bold;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>




<template>
    <div class="app-container">
      <!-- 课件列表 start -->
      <el-table
        :data="coursewares.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        style="width: 100%">
        <el-table-column
          label="序号"
          width="180">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          width="200" prop="title">
        </el-table-column>
        <el-table-column
          label="类型"
          width="150">
          <template slot-scope="scope">
            {{ getTypeText(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          width="300" prop="description">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row.id)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 课件列表 end -->
  
      <el-pagination
        background
        layout="prev, pager, next, sizes, total, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        :total="coursewares.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import { listCourseware, addMaterial} from '@/api/course'

  
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "gray",
          deleted: "danger",
        };
        return statusMap[status];
      },
    },
    data() {
      return {
        pagesize: 10,
        currentPage: 1,
        coursewares: []
      }
    },
    created() {
      this.$route.params.id,
      this.listCourseware(this.$route.params.id)
    },
    methods: {
      // 获取所有课件
      listCourseware(id) {
        listCourseware(id).then(response => {
          this.coursewares = response.data.items
        })
      },
      handleCurrentChange(cpage) {
        this.currentPage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      // 根据类型返回相应的文本
      getTypeText(type) {
        switch (type) {
          case 'document':
            return '文档';
          case 'image':
            return '图片';
          case 'video':
            return '视频';
          default:
            return '未知';
        }
      },
      handleEdit(id) {
        addMaterial(this.$route.params.id, id).then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.push({ path: "/course/list" })
        })
      }
    }
  }
  </script>
  
  <style scoped>
  
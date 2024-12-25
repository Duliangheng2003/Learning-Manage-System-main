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
              @click="handleDelete(scope.row.id)">删除</el-button>
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
  import { getMaterials, deleteMaterial } from '@/api/course'
  
  export default {
    data() {
      return {
        pagesize: 10,
        currentPage: 1,
        coursewares: []
      }
    },
    created() {
      this.$route.params.id,
      this.getCoursewares(this.$route.params.id,)
    },
    methods: { 
      // 获取所有课件
      getCoursewares(id) {
        getMaterials(id).then(response => {
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
      handleDelete(id) {
        // 弹出提示框
        this.$confirm('此操作将删除该课件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用api中删除课件的方法
          deleteMaterial(this.$route.params.id,id).then(response => {
            // 删除成功后，重新加载课件列表
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.push({ path: "/course/list" })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });       
        });
      }
    }
  }
  </script>
  
  
  
  
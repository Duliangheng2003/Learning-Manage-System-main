<template>
 <div class="app-container">
  <el-table
    :data ="questions.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
    style="width: 100%"
    max-height="850">
    <el-table-column
       fixed="left"
      prop="id"
      label="id"
      width="80">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      prop="cusId"
      label="发布者id"
      width="80">
    </el-table-column>
    <el-table-column
      prop="courseId"
      label="课程id"
      width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="120">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="300"
      show-overflow-tooltip>
    </el-table-column>
   
    <el-table-column
      prop="replyCount"
      label="回复数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="browseCount"
      label="浏览数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="praiseCount"
      label="点赞数"
      width="120">
    </el-table-column>

    <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.addTime | moment
          }}</span>
        </template>
      </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
     <template slot-scope="scope">
       <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pagesize"
      :total="questions.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
 </div>
</template>

<script>
import {getAll,deleteByID} from '@/api/question'
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
      pagesize: 3,
      currentPage: 1,
      questions:[]
    }
  },
  created(){
    this.getQuestions()
  },
  methods:{
    // 获取所有讲师
     handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    getQuestions(){
       getAll().then(response => {
         
         this.questions = response.data.items
       })
    },
    // 根据id删除讲师
    handleDelete(id){
      // 弹出提示框
      
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          // 如果点击了确定则调用then
        }).then(() => {
          // 调用api中删除讲师的方法
        
          deleteByID(id).then(response=>{
            // 删除成功后，重新加载讲师列表
            this.getQuestions()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
    },
    handleEdit(id){
      // 路由跳转  /teacher/save/xxxxxxx"
      this.$router.push("/question/save/"+id)
    }
  }
}
</script>
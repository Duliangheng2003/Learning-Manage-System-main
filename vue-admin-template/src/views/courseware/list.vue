<template>
  <div class="app-container">
    <!-- 课件列表  start -->
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
            @click="handlePreview(scope.row)">预览</el-button>
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
    <!-- 课件列表  end -->

    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="coursewares.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>

    <!-- 预览对话框 -->
    <el-dialog
      title="课件预览"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <div v-if="previewCourseware">
        <h2>{{ previewCourseware.title }}</h2>
        <p><strong>类型:</strong> {{ getTypeText(previewCourseware.type) }}</p>
        <p><strong>描述:</strong> {{ previewCourseware.description }}</p>
        <div v-if="previewCourseware.type === 'image'">
          <img :src="previewCourseware.content" alt="课程图片" style="max-width: 100%; height: auto;">
        </div>
        <div v-else-if="previewCourseware.type === 'video'">
          <video controls style="width: 100%;">
            <source :src="previewCourseware.content" type="video/mp4">
            您的浏览器不支持 video 标签。
          </video>
        </div>
        <div v-else-if="previewCourseware.type === 'document'">
          <iframe :src="previewCourseware.content" style="width: 100%; height: 600px;" frameborder="0"></iframe>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAll, deleteByID } from '@/api/courseware'

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
      coursewares: [],
      dialogVisible: false,
      previewCourseware: null
    }
  },
  created() {
    this.getCoursewares()
  },
  methods: {
    // 获取所有课件
    getCoursewares() {
      getAll().then(response => {
        this.coursewares = response.data.items
      })
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    // 根据id删除课件
    handleDelete(id) {
      // 弹出提示框
      this.$confirm('此操作将永久删除该课件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用api中删除课件的方法
        deleteByID(id).then(response => {
          // 删除成功后，重新加载课件列表
          this.getCoursewares()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      })
    },
    handleEdit(id) {
      // 路由跳转  /courseware/save/xxxxxxx"
      this.$router.push("/courseware/save/" + id)
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
    // 处理预览
    handlePreview(courseware) {
      this.previewCourseware = courseware;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.previewCourseware = null;
      done();
    }
  }
}
</script>

<style scoped>
/* 添加一些样式以美化表格和对话框 */
.el-image {
  display: block;
  margin: auto;
}

.video-preview {
  display: block;
  margin: auto;
}

.download-link {
  text-decoration: none;
  color: #409EFF;
  cursor: pointer;
}

/* 对话框样式 */
.el-dialog__body img {
  max-width: 100%;
  height: auto;
}

.el-dialog__body video {
  width: 100%;
}

.el-dialog__body iframe {
  width: 100%;
  height: 600px;
  border: none;
}
</style>




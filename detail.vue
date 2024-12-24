<template>
  <div id="all">
    <el-button @click="handleClick" style="margin-block: 0px" type="primary"
      >返回</el-button
    >
    <div class="title" @click="getLink()">
      <img
        style="width: 200px; height: 200px; border: none"
        :src="course.logo"
      />
    </div>
    <div course @click="getLink()">
      <el-card shadow="hover" class="course" type="primary">
        <h1>{{ course.name }}</h1>
        <p>{{ course.title }}</p>
        <el-space wrap size="large">
          <el-button
            size="small"
            @click="likeCourse(course.id)"
            style="margin-block: 10px"
            icon="el-icon-thumb"
            >{{ course.zan }}</el-button
          >
          <i
            id="browse"
            style="padding: 30px"
            class="el-icon-view"
            size="large"
            >{{ course.through }}</i
          >
        </el-space>
      </el-card>
    </div>

    <div comment>
      <h1>任课教师</h1>
      <el-table :data="teachers" style="width: 100%">
        <el-table-column label="名字" width="180" prop="name">
        </el-table-column>
        <el-table-column label="职称" width="180" prop="career">
        </el-table-column>
        <el-table-column label="照片" width="180">
          <template slot-scope="scope" >
            <img
            @click="getDetail(scope.row.id)"
              style="width: 100px; height: 100px; border: none"
              :src="scope.row.avatar"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comments-section">
      <h2>课程评论</h2>

      <!-- 评论列表 -->
      <el-list>
        <el-card v-for="comment in comments" :key="comment.id" class="comment-card">
          <div class="comment-header">
            <strong>{{ comment.userName }}</strong>
            <span>{{ comment.createdAt }}</span>
          </div>
          <div class="comment-content">
            <p>{{ comment.content }}</p>
          </div>
        </el-card>
      </el-list>

      <!-- 评论输入框 -->
      <el-input
        type="textarea"
        v-model="newComment"
        placeholder="请输入您的评论"
        rows="4"
        style="margin-top: 20px"
      ></el-input>
      <el-button
        type="primary"
        @click="submitComment"
        style="margin-top: 10px"
        :loading="loadingComment"
      >提交评论</el-button>
    </div>
  </div>
</template>

<style scoped>
.course {
  padding: 10px;
  max-width: 960px;
  margin: 0 auto;
  margin-block: 30px;
}
.comment {
  padding: 10px;
  max-width: 900px;
  margin: 0 auto;
  margin-block: 30px;
}
#all {
  padding: 10px;
  max-width: 960px;
  margin: 0 auto;
  margin-block: 30px;
}
.comments-section {
  margin-top: 30px;
}

.comment-card {
  margin-bottom: 15px;
}

.comment-header {
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.comment-content {
  font-size: 16px;
  color: #333;
}

</style>

<script>
import { get, likeCourse, watchCourse, getTeachers } from "@/api/course";
export default {
  data() {
    return {
      course: "",
      teachers: [],
      comments: [],  // 评论列表
      newComment: "",  // 新评论的内容
      loadingComment: false,  // 提交评论时的加载状态
    };
  },
  created() {
    this.watchCourse(this.$route.params.id),
      this.getTeachers(this.$route.params.id);
      this.fetchcomments(this.$route.params.id);
  },
  methods: {
     getLink(){
                window.location.href = this.course.link

        },
    getDetail(id) {
      this.$router.push("/teacher/detail/" + id);
    },
    fetchQ(id) {
      get(id).then((res) => {
        this.course = res.data.course;
        console.log(this.course);
      });
    },
    getTeachers(id) {
      getTeachers(id).then((response) => {
        this.teachers = response.data.teachers;
      });
    },
    fetchcomments(id) {
      get(id).then((res) => {
        this.comments = res.data.course.comments;
      });
    },
    handleClick() {
      this.$router.go(-1);
    },
    likeCourse(qid) {
      likeCourse(qid).then((res) => {
        this.fetchQ(this.$route.params.id);
      });
    },
    watchCourse(id) {
      watchCourse(this.$route.params.id).then((res) => {
        this.fetchQ(this.$route.params.id);
      });
    },
    submitComment() {
      if (!this.newComment.trim()) {
        this.$message.error("评论内容不能为空!");
        return;
      }

      this.loadingComment = true; // 开始加载状态
      const commentData = {
        courseId: this.$route.params.id,
        content: this.newComment,
      };

      postComment(commentData).then((response) => {
        this.loadingComment = false; // 停止加载状态
        if (response.data.success) {
          this.$message.success("评论提交成功!");
          this.newComment = ""; // 清空输入框
          this.fetchComments(this.$route.params.id); // 刷新评论区
        } else {
          this.$message.error("评论提交失败，请稍后再试！");
        }
      }).catch(() => {
        this.loadingComment = false; // 停止加载状态
        this.$message.error("评论提交失败，请稍后再试！");
      });
    }
  },
};
</script>

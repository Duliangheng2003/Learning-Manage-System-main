<template>
  <div id="all">
    <el-button @click="handleClick" style="margin-bottom: 20px" type="primary"
      >返回</el-button
    >
    <div class="course-header" @click="getLink">
      <img
        style="width: 300px; height: 200px; border-radius: 10px"
        :src="course.logo"
      />
      <div class="course-info">
        <h1>{{ course.name }}</h1>
        <el-space wrap size="large">
          <el-button
            size="small"
            @click="likeCourse(course.id)"
            style="margin-top: 10px"
            icon="el-icon-thumb"
            >{{ course.zan }} 点赞</el-button
          >
          <span class="view-count">
            <i class="el-icon-view"></i> {{ course.through }} 浏览
          </span>
        </el-space>
      </div>
    </div>
    <div class="course-description">
      <h2>课程简介</h2>
      <p>{{ course.title }}</p>
    </div>
    <el-button
      type="primary"
      @click="goToQuestionPage"
      style="margin-top: 30px; margin-bottom: 30px"
    >
      讨论区
    </el-button>
  </div>
</template>

<style scoped>
#all {
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
}

.course-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  cursor: pointer;
}

.course-header img {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.course-info {
  flex-grow: 1;
}

.course-info h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.course-info p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.view-count {
  font-size: 14px;
  color: #777;
}

.course-description {
  margin-bottom: 30px;
}

.course-description h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.course-description p {
  font-size: 16px;
  line-height: 1.6;
}

.el-button {
  margin-right: 10px;
}
</style>

<script>
import { get, likeCourse, watchCourse } from "@/api/course";

export default {
  data() {
    return {
      course: {},
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    getLink() {
      if (this.course.link) {
        window.location.href = this.course.link;
      }
    },
    handleClick() {
      this.$router.go(-1);
    },
    fetchData(id) {
      get(id).then((res) => {
        this.course = res.data.course;
        console.log(this.course);
      });
      likeCourse(id); // 假设这是用于初始化点赞数
      watchCourse(id); // 假设这是用于初始化浏览数
    },
    likeCourse(qid) {
      likeCourse(qid).then(() => {
        this.fetchData(this.$route.params.id);
      });
    },
    goToQuestionPage() {
      this.$router.push("/question/index");
    },
  },
};
</script>




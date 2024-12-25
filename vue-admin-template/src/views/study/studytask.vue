<template>
  <div id="learning-tasks">
    <!-- 课程选择 -->
    <el-card class="course-selection-card" shadow="hover" style="margin-bottom: 20px;">
      <h2>选择课程</h2>
      <el-select v-model="selectedCourseId" placeholder="请选择课程" @change="fetchLectures">
        <el-option
          v-for="course in courses"
          :key="course.id"
          :label="course.name"
          :value="course.id">
        </el-option>
      </el-select>
    </el-card>

    <!-- 课件列表 -->
    <div v-if="selectedCourseId && lectures.length > 0" class="lecture-list">
      <el-card class="lecture-list-card" shadow="hover">
        <h2>{{ selectedCourseName }} 的课件列表</h2>
        <el-card v-for="lecture in lectures" :key="lecture.id" shadow="hover" class="lecture-card">
          <div class="lecture-header">
            <h3>{{ lecture.title }}</h3>
          </div>
          <div class="lecture-description">
            {{ lecture.description }}
          </div>
          <div class="lecture-actions">
            <el-button type="primary" @click="viewLecture(lecture.id)">查看课件</el-button>
          </div>
        </el-card>
      </el-card>
    </div>

    <div v-else-if="selectedCourseId && lectures.length === 0" class="no-lectures">
      <el-card class="no-lectures-card" shadow="hover">
        <h2>{{ selectedCourseName }} 暂无课件</h2>
      </el-card>
    </div>

    <div v-else class="no-course-selected">
      <el-card class="no-course-selected-card" shadow="hover">
        <h2>请选择一个课程以查看其课件列表</h2>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
#learning-tasks {
  max-width: 1200px;
  margin: 20px auto;
}

.course-selection-card, .lecture-list-card, .no-lectures-card, .no-course-selected-card {
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.lecture-list {
  margin-top: 20px;
}

.lecture-card {
  margin-bottom: 20px;
}

.el-select {
  width: 100%;
}

.lecture-header h3 {
  margin-bottom: 10px;
}

.lecture-description {
  margin-bottom: 20px;
}
</style>

<script>
import { getCourse, getMaterials } from "@/api/course";
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      courses: [],
      selectedCourseId: null,
      lectures: [],
      selectedCourseName: ''
    };
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      getCourse(getToken()).then((response) => {
        this.courses = response.data.courses;
      });
    },
    fetchLectures(courseId) {
      getMaterials(courseId).then((response) => {
        this.lectures = response.data.items;
        const selectedCourse = this.courses.find(course => course.id === courseId);
        if (selectedCourse) {
          this.selectedCourseName = selectedCourse.name;
        }
      });
    },
    viewLecture(lectureId) {
      // 这里可以添加跳转到具体课件详情的逻辑
      this.$router.push(`/course/lecture/${lectureId}`);
    }
  }
};
</script>




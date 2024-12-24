<template>
  <div id="course-list">
    <el-form ref="form" label-width="300px" @keyup.enter.native="searchCourse(input)">
      <!-- 轮播图 -->
      <el-carousel height="400px" :autoplay="true" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in carouselCourses" :key="index" @click="getDetail(item.id)">
          <div class="carousel-item">
            <img :src="item.logo" alt="课程图片" class="carousel-image" />
            <div class="carousel-text">
              <h2>{{ item.title }}</h2>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>


      <div id="latest-courses">
        <h2>最新课程</h2>
        <el-row :gutter="20">
          <el-col v-for="course in latestCourses" :key="course.id" :span="8" @click="getDetail(course.id)">
            <el-card shadow="hover">
              <img :src="course.logo" alt="课程图片" @click="getDetail(course.id)" class="course-logo" />
              <div class="course-info">
                <h3 @click="getDetail(course.id)">{{ course.name }}</h3>
                <p>{{ course.title }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-input class="input-item" placeholder="请输入内容" v-model="input" style="width: 800px" clearable>
      </el-input>
      <el-button size="small" class="input-button" @click="searchCourse(input)">查询</el-button>



      <!-- 排序方式按钮 -->
      <div class="sort-buttons">
        <el-button @click="setSortBy('gmt_create')" :type="sortBy === 'gmt_create' ? 'primary' : ''">按发布时间</el-button>
        <el-button @click="setSortBy('registration_count')"
          :type="sortBy === 'registration_count' ? 'primary' : ''">按注册人数</el-button>
        <el-button @click="setSortBy('updated_at')" :type="sortBy === 'updated_at' ? 'primary' : ''">按更新时间</el-button>
        <el-button @click="setSortBy('zan')" :type="sortBy === 'zan' ? 'primary' : ''">按点赞人数</el-button>
      </div>

      <!-- 升降序按钮 -->
      <div class="sort-order-buttons">
        <el-button @click="setSortOrder('asc')" :type="sortOrder === 'asc' ? 'primary' : ''">升序</el-button>
        <el-button @click="setSortOrder('desc')" :type="sortOrder === 'desc' ? 'primary' : ''">降序</el-button>
      </div>
      <div>
        <el-button size="small" class="input-button" @click="fetchData()">全部</el-button>
        <el-button size="small" class="input-button" @click="searchCourse2()">计算机编程</el-button>
        <el-button size="small" class="input-button" @click="searchCourse3()">计算机应用</el-button>
        <el-button size="small" class="input-button" @click="searchCourse4()">数学基础</el-button>
        <el-button size="small" class="input-button" @click="searchCourse5()">其它</el-button>
      </div>
    </el-form>
    <!-- 课程列表 -->
    <el-row :gutter="60">
      <el-col :span="8" v-for="course in courses.slice(
        (currentPage - 1) * pagesize,
        currentPage * pagesize
      )" :key="course.id">
        <el-card direction="vertical" id="box-card" shadow="hover">
          <template #header>
            <div @click="getDetail(course.id)" class="box-card-header">
              <img style="width: 200px; height: 200px; border: none" :src="course.logo" />
            </div>
            <div class="card-header" @click="getDetail(course.id)">
              <span>
                <h1>{{ course.name }}</h1>
              </span>
            </div>
          </template>
          <div class="text-item">
            {{ course.title }}
          </div>
          <div>
            <div class="text-item">
              <el-button @click="handleEdit(course.id)" style="margin-block: 0px" type="primary">添加</el-button>
              <el-button @click="handleEdit2(course.id)" style="margin-block: 0px" type="primary">收藏</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[3, 6, 9, 12]"
        :page-size="pagesize" :total="courses.length" @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </el-row>
  </div>
</template>

<style scoped>
#course-list {
  max-width: 1200px;
  margin: 20px auto;
}

#box-card {
  width: 400px;
  margin-block: 30px;
}

.card-header {
  font-family: "Microsoft YaHei";
  font-weight: 1200;
  padding: 10px;
}

.text-item {
  font-family: "Microsoft YaHei";
  font-size: 120%;
  font-weight: 400;
  padding: 30px;
}

.input-item {
  padding: 30px;
  width: 300px;
}

.carousel-item {
  position: relative;
  text-align: center;
  color: white;
  background: #000;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  bottom: 10%;
  left: 5%;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
}

.course-logo {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.course-info {
  margin-top: 10px;
}

.sort-buttons,
.sort-order-buttons {
  margin-bottom: 20px;
}

.sort-buttons el-button,
.sort-order-buttons el-button {
  margin-right: 10px;
}

.course-logo {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.course-info {
  margin-top: 10px;
}
</style>

<script>
import {
  getAll,
  search,
  addPersonal,
  addCollection,
  getContain,
} from "@/api/course";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      courses: [],
      carouselCourses: [],  //轮播图数据
      latestCourses: [], // 最新课程数据
      pagesize: 3,
      currentPage: 1,
      input: "",
      sortedCourses: [], // 存储排序后的课程
      sortBy: '', // 默认排序方式为按发布时间
      sortOrder: 'desc', // 默认排序方式为降序
    };
  },
  created() {
    this.fetchData(), this.$route.params.id;
  },
  methods: {
    fetchData() {
      getAll().then((response) => {
        this.courses = response.data.items;
        this.carouselCourses = response.data.items.slice(0, 5); // 取前5个课程
        this.sortByZanCourses = this.courses
         .sort((a, b) => b.zan - a.zan);
        this.latestCourses = this.courses
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3); // 取前 3 个最新课程
      });

    },
    getDetail(id) {
      this.$router.push("/course/detail/" + id);
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    searchCourse(input) {
      search(input).then((res) => {
        this.courses = res.data.items;
      });
    },
    searchCourse2() {
      getContain(1).then((res) => {
        this.courses = res.data.courses;
      });
    },
    searchCourse3() {
      getContain(2).then((res) => {
        this.courses = res.data.courses;
      });
    },
    searchCourse4() {
      getContain(3).then((res) => {
        this.courses = res.data.courses;
      });
    },
    searchCourse5() {
      getContain(4).then((res) => {
        this.courses = res.data.courses;
      });
    },
    handleEdit(id) {
      addPersonal(id, getToken()).then((response) => {
        // 提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.push({ path: "/course/index" });
      });
    },
    handleEdit2(id) {
      addCollection(id, getToken()).then((response) => {
        // 提示信息
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.push({ path: "/course/index" });
      });
    },
    // 设置排序方式（按什么字段排序）
    setSortBy(sortBy) {
      this.sortBy = sortBy;
      this.sortCourses();
    },
    // 设置排序顺序（升序或降序）
    setSortOrder(sortOrder) {
      this.sortOrder = sortOrder;
      this.sortCourses();
    },

  },

};
</script>

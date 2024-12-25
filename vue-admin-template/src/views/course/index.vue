<template>
  <div id="course-list">
    <el-form ref="form" label-width="300px" @keyup.enter.native="searchCourse(input)">
      <!-- 轮播图 -->
      <el-carousel height="400px" :autoplay="true" indicator-position="outside" type="card">
        <el-carousel-item v-for="(item, index) in filteredCarouselCourses" :key="index" @click="getDetail(item.id)">
          <div class="carousel-item">
            <img :src="item.logo" alt="课程图片" class="carousel-image" />
            <div class="carousel-text">
              <h2>{{ item.name }}</h2>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>

      <div id="latest-courses">
        <h2>最新课程</h2>
        <el-row :gutter="20">
          <el-col v-for="course in filteredLatestCourses" :key="course.id" :span="8" @click="getDetail(course.id)">
            <el-card shadow="hover">
              <img :src="course.logo" alt="课程图片" @click="getDetail(course.id)" class="course-logo" />
              <div class="course-info">
                <h3 class="truncate hover-show-full" :title="course.name">{{ course.name }}</h3>
                <p class="truncate hover-show-full" :title="course.title">{{ course.title }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-input class="input-item" placeholder="请输入内容" v-model="input" clearable>
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
      <el-button size="small" class="input-button" @click="searchCourse(input)">查询</el-button>

      <!-- 排序方式下拉菜单 -->
      <div class="sort-dropdowns">
        <el-select v-model="sortBy" placeholder="选择排序字段" @change="applySorting">
          <el-option label="按发布时间" value="gmtCreate"></el-option>
          <el-option label="按注册人数" value="through"></el-option>
          <el-option label="按更新时间" value="gmtModified"></el-option>
          <el-option label="按点赞人数" value="zan"></el-option>
        </el-select>
        <el-select v-model="sortOrder" placeholder="选择排序顺序" @change="applySorting">
          <el-option label="升序" value="asc"></el-option>
          <el-option label="降序" value="desc"></el-option>
        </el-select>
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
      <el-col :span="8" v-for="course in filteredCourses.slice(
        (currentPage - 1) * pagesize,
        currentPage * pagesize
      )" :key="course.id">
        <el-card direction="vertical" id="box-card" shadow="hover">
          <template #header>
            <div @click="getDetail(course.id)" class="box-card-header">
              <img style="width: 100%; height: 200px; border: none; object-fit: cover;" :src="course.logo" />
            </div>
            <div class="card-header" @click="getDetail(course.id)">
              <span>
                <h3 class="truncate hover-show-full" :title="course.name">{{ course.name }}</h3>
              </span>
            </div>
          </template>
          <div class="text-item truncate hover-show-full" :title="course.title">
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
        :page-size="pagesize" :total="filteredCourses.length" @current-change="handleCurrentChange"
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
  width: 100%;
  margin-bottom: 30px;
  height: 500px; /* 增加卡片高度 */
}

.card-header {
  font-family: "Microsoft YaHei";
  font-weight: 300;
  padding: 5px 10px; /* 增加标题部分的高度 */
}

.text-item {
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-weight: 400;
  padding: 5px 10px; /* 缩小间距 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.input-item {
  width: 80%;
  margin-right: 10px;
}

.carousel-item {
  position: relative;
  text-align: center;
  color: white;
  cursor: pointer;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-image:hover {
  transform: scale(1.05);
}

.carousel-text {
  position: absolute;
  bottom: 10%;
  left: 5%;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.carousel-item:hover .carousel-text {
  opacity: 1;
}

.course-logo {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.course-info {
  margin-top: 10px;
}

.sort-dropdowns {
  margin-bottom: 20px;
}

.sort-dropdowns .el-select {
  margin-right: 10px;
}

.box-card-header img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.card-header h3 {
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.el-col {
  margin-bottom: 50px; /* 确保每列之间有足够的间距 */
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hover-show-full:hover {
  overflow: visible !important;
  white-space: normal !important;
  text-overflow: clip !important;
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
      carouselCourses: [],  // 轮播图数据
      latestCourses: [], // 最新课程数据
      pagesize: 6,
      currentPage: 1,
      input: "",
      sortBy: '', // 默认排序方式为空
      sortOrder: 'desc', // 默认排序方式为降序
    };
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(course => course.status === 1);
    },
    filteredCarouselCourses() {
      return this.carouselCourses.filter(course => course.status === 1);
    },
    filteredLatestCourses() {
      return this.latestCourses.filter(course => course.status === 1);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAll().then((response) => {
        this.courses = response.data.items;
        this.carouselCourses = response.data.items.slice(0, 5); // 取前5个课程
        this.latestCourses = this.courses
          .filter(course => course.status === 1)
          .sort((a, b) => new Date(b.gmtCreate) - new Date(a.gmtCreate))
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
        this.courses = res.data.items.filter(course => course.status === 1);
        this.applySorting(); // 应用排序
      });
    },
    searchCourse2() {
      getContain(1).then((res) => {
        this.courses = res.data.courses.filter(course => course.status === 1);
        this.applySorting(); // 应用排序
      });
    },
    searchCourse3() {
      getContain(2).then((res) => {
        this.courses = res.data.courses.filter(course => course.status === 1);
        this.applySorting(); // 应用排序
      });
    },
    searchCourse4() {
      getContain(3).then((res) => {
        this.courses = res.data.courses.filter(course => course.status === 1);
        this.applySorting(); // 应用排序
      });
    },
    searchCourse5() {
      getContain(4).then((res) => {
        this.courses = res.data.courses.filter(course => course.status === 1);
        this.applySorting(); // 应用排序
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
    applySorting() {
      if (!this.sortBy) return; // 如果没有指定排序字段，则不执行排序
      const sortKey = this.sortBy; // 获取当前排序字段
      const order = this.sortOrder === "asc" ? 1 : -1; // 确定升序或降序

      this.courses.sort((a, b) => {
        if (sortKey === "gmtCreate" || sortKey === "gmtModified") {
          // 如果是日期类型，先转换为日期对象再比较
          return (new Date(a[sortKey]) - new Date(b[sortKey])) * order;
        }
        // 如果是数值类型，直接比较
        return (a[sortKey] - b[sortKey]) * order;
      });
    },
  },
};
</script>




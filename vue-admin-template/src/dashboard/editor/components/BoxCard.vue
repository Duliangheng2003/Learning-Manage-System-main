<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="Header Image">
    </div>
    <div class="content-container">
      <div class="recommend-title">推荐课程</div>
      <div class="progress-container">
        <div class="progress-item" v-for="(course, index) in courses" :key="index">
          <span @click="getDetail(course.id)" class="course-name">{{ course.name }}</span>
          <el-progress :percentage="course.progress" />
        </div>
      </div>
    </div>
  </el-card>
</template>


<script>
import { mapGetters } from "vuex";
import PanThumb from "@/components/PanThumb";
import Mallki from "@/components/TextHoverEffect/Mallki";

export default {
  components: { PanThumb, Mallki },
  data() {
    return {
      courses: [
        { id: 9, name: "Vue", progress: 70 },
        { id: 7, name: "Java", progress: 18 },
        { id: 7, name: "Python", progress: 12 },
        { id: 1, name: "软件构造", progress: 100 },
      ],
    };
  },
  methods: {
    getDetail(id) {
      this.$router.push("/course/detail/" + id);
    },
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
};
</script>
<style lang="scss" scoped>
.box-card-component {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px 15px 0 0;
      transition: transform 0.3s ease-in-out;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .recommend-title {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 6px;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
      color: #4a90e2;
      text-shadow: none;
    }
  }

  .content-container {
    padding: 20px;
  }

  .progress-container {
    padding-top: 10px;
  }

  .progress-item {
    margin-bottom: 15px;

    .course-name {
      display: inline-block;
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #4a90e2;
      }
    }

    .el-progress {
      margin-top: 5px;

      .el-progress-bar {
        background: linear-gradient(to right, #4a90e2, #9013fe);
      }
    }
  }
}
</style>


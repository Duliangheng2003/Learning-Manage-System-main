<template>
  <div id="ques-list">
    <el-row style="padding: 30px">
      <el-col :span="24">
        <el-button
          size="normal"
          type="info"
          class="back-button"
          @click="navigateToCourseDetails"
          >返回</el-button>
        <el-form
          ref="form"
          @keydown.enter.native="handleClick(input)"
          style="display: inline-block; margin-left: 10px;">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            style="width: 600px"
            clearable>
          </el-input>
        </el-form>
        <el-button
          size="normal"
          class="input-button"
          @click="handleClick(input)"
          style="margin-left: 10px;"
          >查询</el-button>
        <el-button
          size="normal"
          type="primary"
          class="input-button"
          @click="navigateToPublishDiscussion"
          style="margin-left: 10px;"
          >发布讨论</el-button>
      </el-col>
    </el-row>
    <div>
      <el-card
        direction="vertical"
        id="box-card"
        shadow="hover"
        class="question"
        v-for="(question, index) in filteredQuestions.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        :key="question.id">
        <template #header>
          <div class="card-header" @click="getDetail(question.id)">
            <el-avatar
              shape="square"
              size="small"
              :src="writers[(currentPage - 1) * pagesize + index].avatar"
              style="vertical-align: middle"
            ></el-avatar>
            <span class="name">{{ writers[(currentPage - 1) * pagesize + index].sname }}</span>
            <span class="name">{{ writers[(currentPage - 1) * pagesize + index].sid }}</span>
            <span><h1>{{ question.title }}</h1></span>
          </div>
        </template>
        <span class="text-item">{{ question.content }}</span>
        <el-row>
          <el-col :span="6" :offset="18"
            ><p class="time">提问于:{{ question.addTime | moment}}</p></el-col
          >
        </el-row>
      </el-card>
    </div>
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      :total="filteredQuestions.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<style scoped>
#ques-list {
  max-width: 960px;
  margin: 0 auto;
}
#box-card {
  width: 900px;
  margin-block: 30px;
}
.card-header {
  font-family: "PingFang SC";
  font-weight: 1900;
  padding: 10px;
}
.text-item {
  font-family: "PingFang SC";
  font-size: 20px;
  font-weight: 400;
  padding: 30px;
}
.time {
  font-family: "PingFang SC";
  color: dimgrey;
  font-size: 10px;
  padding-left: 30px;
}
.writer {
  padding: 10px;
}
.name {
  font-size: 15px;
  color: dimgrey;
  font-family: "PingFang SC";
  font-weight: bold;
  padding-left: 10px;
  vertical-align: middle;
}
.back-button {
  margin-bottom: 20px;
  background-color: #409EFF;
  border-color: #409EFF;
  color: white;
}
.back-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
.input-button {
  margin-top: 20px;
}
</style>

<script>
import { getAll, likeQuestion, search, query, getAllw, searchw, queryw } from "@/api/question";
import { get, getStuById } from "@/api/stu";

export default {
  data() {
    return {
      questions: [],
      writers: [],
      pagesize: 5,
      currentPage: 1,
      input: "",
      courseIdFromRoute: null, // 用于存储从路由中获取的courseId
    };
  },
  created() {
    this.fetchData();
    this.courseIdFromRoute = this.$route.params.id; // 获取路由中的courseId
  },
  computed: {
    filteredQuestions() {
      if (this.courseIdFromRoute) {
        const filtered = [];
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].courseId === parseInt(this.courseIdFromRoute)) {
            filtered.push(this.questions[i]);
          }
        }
        return filtered;
      }
      return this.questions;
    }
  },
  methods: {
    likeQuestion(qid) {
      likeQuestion(qid).then((res) => {
        this.$message({
          type: "success",
          message: "点赞成功!",
        });
        this.fetchQ(this.$route.params.id);
      });
    },
    fetchData() {
      getAll().then((response) => {
        this.questions = response.data.items;
      });
      getAllw().then((response) => {
        this.writers = response.data.items;
      });
    },
    getDetail(id) {
      this.$router.push("/course/question/" + id);
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    searchQuestions(input) {
      search(input.split(" ")).then((res) => {
        this.questions = res.data.items;
      });
      searchw(input.split(" ")).then((res) => {
        this.writers = res.data.items;
      });
    },
    handleClick(w) {
      query(-1, w).then((res) => {
        this.questions = res.data.items;
      });
      queryw(-1, w).then((res) => {
        this.writers = res.data.items;
      });
    },
    navigateToPublishDiscussion() {
      this.$router.push("/course/publish/" + this.courseIdFromRoute);
    },
    navigateToCourseDetails() {
      this.$router.push("/course/detail/" + this.courseIdFromRoute);
    },
  },
};
</script>




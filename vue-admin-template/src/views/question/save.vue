<template>
  <div class="app-container">
  <el-form ref="form" :model="question" label-width="80px">
  <el-form-item label="提问者id">
    <el-input v-model="question.cusId"></el-input>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="question.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" >
    <el-input type="textarea" v-model="question.content" :autosize="{ minRows: 4 }"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :disabled="disable" @click="onSubmit">保存</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {add,get, update} from '@/api/question'
export default {
    data() {
      return {
        question: {
				cusId: "", 
				title: "",
				content: "",
				type: "",
        addTime:""
        },
        disable:false
      }
    },
    created(){
      if(this.$route.params && this.$route.params.id){
        this.getInfo(this.$route.params.id)
      }
    },
    methods: {
      onSubmit() {
        if(this.question.id){
          this.updateInfo(this.question)
        }else{
          this.addInfo(this.question)
        }
      },
      getInfo(id){
        get(id).then(response=>{
          this.question = response.data.question
           this.question.addTime=new Date();
        })
      },
      addInfo(question){
        add(question).then(response=>{
          // 提示信息
          this.$message({
              type: 'success',
              message: '上传成功!'
            });
            // 跳转到列表页
            this.$router.push({path:"/question/list"})
        })
      },
      updateInfo(question){
        update(question).then(reponse=>{
          this.$message({
            type: 'success',
            message: '修改!'
          });
          // 跳转到列表页
          this.$router.push({path:"/question/list"})
        })
      },
      handleAvatarSuccess(res) {
        console.log("--------------------------------------")
        this.question.avatar = "http://localhost:8080"+res;
        // console.log("http://localhost:8080"+res)
      }
    }
  }
</script>



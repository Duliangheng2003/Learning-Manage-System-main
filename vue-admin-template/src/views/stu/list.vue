<template>
  <div class="app-container">
    <el-table
      :data="
        filteredTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%"
    >
      <el-table-column label="学生id" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.sname }}</p>
            <p>学号：{{ scope.row.sid }}</p>
            <p>性别：{{ scope.row.gender }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.sname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.birthday | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.age
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="220">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>邮箱: {{ scope.row.email }}</p>
            <p>电话: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.email }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, total, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="filteredTableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { delStu, getStu } from "@/api/stu";

export default {
  filters: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}-${day}`;
    }
  },
  data() {
    return {
      pagesize: 10,
      currentPage: 1,
      tableData: [],
    };
  },
  computed: {
    filteredTableData() {
      return this.tableData.filter(row => row.type !== 1 && row.type !== 2);
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleEdit(id) {
      // 路由跳转  /stu/save/xxxxxxx"
      this.$router.push("/stu/save/" + id);
    },
    fetchData() {
      getStu().then((response) => {
        this.tableData = response.data.items;
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用api中删除讲师的方法
          delStu(id).then((response) => {
            // 删除成功后，重新加载讲员工表
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>





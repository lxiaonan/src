<template>
  <div class="about">
    <el-form class="search">
      <el-input
        v-model="questionSubmitRequest.language"
        class="w-50 m-2"
        placeholder="请输入编程语言"
        style="width: 300px"
        :prefix-icon="Search"
      />
      <el-button style="margin-left: 10px" @click="handleChange" type="primary"
        >搜索</el-button
      >
    </el-form>
    <el-table :data="submitList" style="width: 100%">
      <el-table-column prop="id" label="Run ID" width="180" />
      <el-table-column prop="userVO.userName" label="User" width="120" />
      <el-table-column prop="questionId" label="Problem" width="250" />
      <el-table-column prop="judgeInfo.message" label="Result" width="180" />
      <el-table-column prop="judgeInfo.memory" label="Memory" width="120" />
      <el-table-column prop="judgeInfo.time" label="Time" width="120" />
      <el-table-column prop="language" label="Language" width="180" />
      <el-table-column prop="createTime" label="Submit Time" width="180" />
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="questionSubmitRequest.current"
        v-model:page-size="questionSubmitRequest.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="(total as number)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { QuestionSubmitQueryRequest, QuestionSubmitVO } from "../../generated";
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useQuestionSubmitStore } from "../store/questionSubmit";
const questionSubmitStore = useQuestionSubmitStore();
const questionSubmitRequest = ref<QuestionSubmitQueryRequest>({
  language: "",
  current: 0,
  pageSize: 10,
});
const submitList = ref<QuestionSubmitVO[]>();
const handleChange = async () => {
  await questionSubmitStore.getQuestionSubmitList(questionSubmitRequest.value);
  submitList.value = questionSubmitStore.questionSubmitList;
};
handleChange();
//定时器，10s执行一次
const timer = setInterval(() => handleChange(), 10000);
const total = ref<number>(
  parseInt(questionSubmitStore.questionSubmitTotal as string, 10)
);

const handleSizeChange = (size: number) => {
  questionSubmitRequest.value.pageSize = size;
  handleChange();
};
const handleCurrentChange = (current: number) => {
  questionSubmitRequest.value.current = current;
  handleChange();
};
</script>
<style scoped lang="scss">
.search {
  margin-bottom: 10px;
}
</style>

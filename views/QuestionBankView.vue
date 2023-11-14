<template>
  <div class="about">
    <el-table :data="questionList" style="width: 100%">
      <el-table-column type="index" label="题号" width="180" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="tags" label="标签" width="380" />
      <el-table-column prop="passRate" label="提交通过率">
        <template #default="item">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <template #default>
              <div>
                passRate: {{ item.row.submitNum }}/
                {{ item.row.acceptedNum }}
              </div>
            </template>
            <template #reference>
              <el-tag
                >{{ item.row.submitNum }}/ {{ item.row.acceptedNum }}</el-tag
              >
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="item">
          <el-button link type="primary" @click="editorQuestion(item.row.id)"
            >修改题目</el-button
          >
          <el-button link type="danger" @click="onDelete(item.row.id)"
            >删除题目</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="questionRequest.current"
        v-model:page-size="questionRequest.pageSize"
        :page-sizes="[2, 10, 15, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="(total as number)"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
import {
  QuestionVO,
  QuestionQueryRequest,
  QuestionControllerService,
  DeleteRequest,
} from "../../generated";
import { useQuestionStore } from "../store/question";
const questionStore = useQuestionStore();
const questionRequest = ref<QuestionQueryRequest>({
  current: 0,
  pageSize: 10,
});

const questionList = ref<QuestionVO[]>();
const handleChange = async () => {
  await questionStore.getQuestionList(questionRequest.value);
  questionList.value = questionStore.questions;
};
handleChange();
const total = ref<number>(parseInt(questionStore.questionTotal as string, 10));

const handleSizeChange = (size: number) => {
  questionRequest.value.pageSize = size;
  handleChange();
};
const handleCurrentChange = (current: number) => {
  questionRequest.value.current = current;
  handleChange();
};

const editorQuestion = (id: number) => {
  console.log(id);
  router.push({
    path: `/questionEditor/${id}`,
    params: {
      id: id,
    },
  });
};
const onDelete = async (id: number) => {
  ElMessageBox.confirm("您是否要删除这道题目?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await QuestionControllerService.deleteQuestionUsingPost({
        id: id,
      } as DeleteRequest);
      if (res.code === 0) {
        ElMessage.success("删除成功");
        handleChange();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch(() => {
      console.log(id);
    });
};
</script>
<style lang="scss" scoped></style>

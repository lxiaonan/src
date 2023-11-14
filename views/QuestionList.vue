<template>
  <div class="about">
    <div>
      <span style="color: #2887f3">编程题</span>
    </div>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar height="600px">
          <p
            v-for="(item, index) in questionList"
            :key="index"
            class="scrollbar-demo-item"
          >
            {{ index + 1 }} {{ item.title }}
          </p>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="search">
          <el-input
            @keyup.enter="goSearch"
            v-model="questionRequest.title"
            class="w-50 m-2"
            placeholder="搜索标题"
            size="large"
            :prefix-icon="Search"
          />

          <el-icon class="icon" @click="goSearch"><Search /></el-icon>
        </div>
        <el-table :data="questionList" style="width: 100%">
          <el-table-column type="index" label="题号" width="180" />
          <el-table-column prop="title" label="标题" width="200" />
          <el-table-column prop="tags" label="标签" width="380">
            <template #default="question"
              ><el-tag
                class="ml-2"
                type="success"
                v-for="(item, index) in question.row.tags"
                :key="index"
                >{{ item }}</el-tag
              ></template
            >
          </el-table-column>
          <el-table-column prop="passRate" label="提交通过率">
            <template #default="scope">
              <el-popover
                effect="light"
                trigger="hover"
                placement="top"
                width="auto"
              >
                <template #default>
                  <div>
                    passRate:
                    {{
                      (scope.row.submitNum === 0
                        ? 0
                        : scope.row.acceptedNum / scope.row.submitNum) * 100
                    }}% ({{ scope.row.acceptedNum }}/ {{ scope.row.submitNum }})
                  </div>
                </template>
                <template #reference>
                  <el-tag
                    >{{
                      (scope.row.submitNum === 0
                        ? 0
                        : scope.row.acceptedNum / scope.row.submitNum) * 100
                    }}% ({{ scope.row.acceptedNum }}/
                    {{ scope.row.submitNum }})</el-tag
                  >
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="item">
              <el-button
                type="primary"
                size="small"
                round
                @click="doQuestion(item.row.id)"
                >去做题</el-button
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
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { QuestionVO, QuestionQueryRequest } from "../../generated";
import { useQuestionStore } from "../store/question";
import { Search } from "@element-plus/icons-vue";
import router from "@/router";
const questionStore = useQuestionStore();
const questionRequest = ref<QuestionQueryRequest>({
  title: "",
  current: 0,
  pageSize: 10,
});

const questionList = ref<QuestionVO[]>();
const total = ref<number>(parseInt(questionStore.questionTotal as string, 10));
const handleChange = async () => {
  await questionStore.getQuestionList(questionRequest.value);
  questionList.value = questionStore.questions;
  total.value = parseInt(questionStore.questionTotal as string, 10);
};
handleChange();

const handleSizeChange = (size: number) => {
  questionRequest.value.pageSize = size;
  questionRequest.value.current = 0;
  handleChange();
};
const handleCurrentChange = (current: number) => {
  questionRequest.value.current = current;
  handleChange();
};
//搜索
const goSearch = () => {
  questionRequest.value.current = 0;
  handleChange();
};
//去做题
const doQuestion = (id: number) => {
  console.log(id);
  //使用命名路由
  router.push({
    name: "题目详情",
    params: {
      id: id,
    },
  });
};
</script>
<style lang="scss" scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  margin: 10px;
  text-align: left;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.demo-pagination-block {
  margin-top: 20px;
  text-align: right;
}
.search {
  display: flex;
  align-items: center;
  width: 400px;
  margin: auto;
  margin-bottom: 20px;
  .icon {
    margin-left: 15px;
    color: #409eff;
  }
}
</style>

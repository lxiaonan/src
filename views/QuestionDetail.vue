<template>
  <div class="about">
    <h1 :style="{ fontSize: '32px', marginTop: '0', marginBottom: '5px' }">
      {{ questionDetail?.title }}
    </h1>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="题目描述" name="first">
        <div>
          <el-row :gutter="20">
            <el-col :span="12" :xs="24">
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span>题目内容</span>
                    <el-tag
                      class="ml-2"
                      type="success"
                      v-for="(item, index) in questionDetail?.tags"
                      :key="index"
                      >{{ item }}</el-tag
                    >
                  </div>
                </template>
                <MdViewer :value="questionDetail?.content"></MdViewer> </el-card
            ></el-col>
            <el-col :span="12" :xs="24">
              <div class="language">
                编程语言
                <el-select
                  v-model="form.language"
                  class="m-2"
                  placeholder="Select"
                  size="large"
                >
                  <el-option value="java" />
                  <el-option value="cpp" />
                  <el-option value="go" />
                  <el-option value="html" />
                </el-select>
              </div>

              <CodeEditor
                :value="form.code"
                :language="form.language"
                :handle-change="onCodeChange"
              >
              </CodeEditor>
              <el-button
                type="primary"
                size="large"
                style="margin-top: 10px"
                @click="doSubmit"
                >提交代码</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="题解" name="key">题解</el-tab-pane>
      <el-tab-pane label="讨论" name="discussion">讨论</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type TabsPaneContext } from "element-plus";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useRoute } from "vue-router";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../generated";
import router from "@/router";
const route = useRoute();
//题目详情信息
const questionDetail = ref<QuestionVO>();
const questionId = route.params.id;
const getQuestionDetail = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    questionId as number
  );
  if (res.code !== 0) {
    ElMessage.error("获取题目详情失败" + res.message);
    router.push("/");
    return;
  }
  console.log(res);
  questionDetail.value = res.data;
};
getQuestionDetail();
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

// 代码编辑器
const form = ref<QuestionSubmitAddRequest>({
  code: "",
  language: "java",
  questionId: questionId,
});
const onCodeChange = (v: string) => {
  form.value.code = v;
};

const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  if (res.code !== 0) {
    ElMessage.error("提交失败" + res.message);
    return;
  }
  ElMessage.success("提交成功");
};
</script>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
}
.language {
  margin-bottom: 5px;
}
</style>

<template>
  <div class="about">
    <el-form :model="form" label-width="120px" size="large" :rules="rules">
      <el-form-item label="题目标签" prop="title">
        <el-input style="width: 400px" v-model="form.title" />
      </el-form-item>
      <el-form-item label="题目内容">
        <MdEditor :value="form.content" :handle-change="onMdChange"></MdEditor>
      </el-form-item>
      <el-form-item label="题目标签">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + 添加标签
        </el-button>
      </el-form-item>
      <el-form-item label="题目答案">
        <el-input v-model="form.answer" type="textarea" />
      </el-form-item>
      <el-form-item label="判题用例">
        <div
          class="judgeCaseBox"
          v-for="(item, index) in form.judgeCase"
          :key="index"
        >
          <el-form-item :label="'输入样例' + index">
            <el-input v-model="form.judgeCase[index].input" />
          </el-form-item>
          <el-form-item :label="'输出样例' + index">
            <el-input v-model="form.judgeCase[index].output" />
          </el-form-item>
          <el-button class="mt-2" @click.prevent="removeJudgeCase(item)"
            >删除</el-button
          >
        </div>

        <el-form-item>
          <el-button type="success" @click="addJudgeCase">增加样例</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item label="判题配置">
        <el-form-item label="空间限制">
          <el-input
            style="width: 400px"
            v-model="form.judgeConfig.memoryLimit"
          />
        </el-form-item>
        <el-form-item label="栈存限制">
          <el-input
            style="width: 400px"
            v-model="form.judgeConfig.stackLimit"
          />
        </el-form-item>
        <el-form-item label="时间限制">
          <el-input style="width: 400px" v-model="form.judgeConfig.timeLimit" />
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEditor">修改题目</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ElMessage } from "element-plus";
import {
  JudgeCase,
  QuestionControllerService,
  Question,
  QuestionUpdateRequest,
} from "../../generated";
import { ref, nextTick } from "vue";
import { ElInput } from "element-plus";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
console.log("editor" + route.params.id);
const getQuestion = async () => {
  const id = route.params.id;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(id);
  console.log(res.data);
  const data: Question = res.data as Question;
  form.value = data;
  form.value.tags = JSON.parse(data.tags as string);
  form.value.judgeConfig = JSON.parse(data.judgeConfig as string);
  form.value.judgeCase = JSON.parse(data.judgeCase as string);
};
getQuestion();

const onEditor = async () => {
  if (form.value.title === "") {
    ElMessage.error("题目标题长度需要在1到100位");
  }
  if (
    !form.value.judgeConfig?.memoryLimit ||
    !form.value.judgeConfig?.stackLimit ||
    !form.value.judgeConfig?.timeLimit
  ) {
    ElMessage.error("判题配置不为空");
  }
  if (
    (form.value.content as string).length < 1 ||
    (form.value.content as string).length > 1000
  ) {
    ElMessage.error("题目内容长度需要在1到1000");
  }
  console.log(form.value);
  const res = await QuestionControllerService.updateQuestionUsingPost(
    form.value
  );
  if (res.code === 0) {
    ElMessage({
      message: "题目修改成功.",
      type: "success",
    });
    router.push("/questionBank");
  } else {
    ElMessage.error(res.message);
  }
  console.log(res);
};
const reset = () => {
  console.log(111);
};

const removeJudgeCase = (item: JudgeCase) => {
  const index = form.value.judgeCase.indexOf(item);
  if (index !== -1) {
    form.value.judgeCase.splice(index, 1);
  }
};

const addJudgeCase = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
// 内容编辑器
const onMdChange = (v: string) => {
  form.value.content = v;
};
//标签
const inputValue = ref("");
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: never) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value as never);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const form = ref<QuestionUpdateRequest>({
  title: "",
  tags: dynamicTags.value,
  content: "",
  answer: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 1000,
    stackLimit: 1000,
  },
});
//校验
const rules = ref({
  title: [
    { required: true, message: "题目不为空", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "题目标题长度需要在1到100位",
      trigger: "blur",
    },
  ],
});
</script>
<style lang="scss" scoped>
.judgeCaseBox {
  display: flex;
  .mt-2 {
    margin: 0 20px;
  }
}
</style>

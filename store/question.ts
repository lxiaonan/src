import { defineStore } from "pinia";
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "../../generated";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
// 用户模块
export const useQuestionStore = defineStore(
  "question",
  () => {
    const questions = ref<QuestionVO[]>();
    const questionTotal = ref<string>();
    const getQuestionList = async (data: QuestionQueryRequest) => {
      const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
        data
      );
      if (res.code === 0) {
        questions.value = res.data?.records;
        console.log(res.data);
        questionTotal.value = res.data?.total;
      } else {
        ElMessage.error(res.message);
      }
    };
    return { getQuestionList, questions, questionTotal };
  },
  {
    persist: true, // 持久化
  }
);

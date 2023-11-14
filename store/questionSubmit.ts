import { defineStore } from "pinia";
import {
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionSubmitVO,
} from "../../generated";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
// 用户模块
export const useQuestionSubmitStore = defineStore(
  "questionSubmit",
  () => {
    const questionSubmitList = ref<QuestionSubmitVO[]>([]);
    const questionSubmitTotal = ref<string>();
    const getQuestionSubmitList = async (data: QuestionSubmitAddRequest) => {
      const res =
        await QuestionSubmitControllerService.listQuestionSubmitByPageUsingPost(
          data
        );
      if (res.code === 0) {
        questionSubmitList.value = res.data?.records;
        questionSubmitTotal.value = res.data?.total;
      } else {
        ElMessage.error(res.message);
      }
    };
    return { questionSubmitTotal, questionSubmitList, getQuestionSubmitList };
  },
  {
    persist: true, // 持久化
  }
);

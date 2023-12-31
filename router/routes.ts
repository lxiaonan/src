import { RouteRecordRaw } from "vue-router";
import QuestionList from "../views/QuestionList.vue";
import QuestionSubmitList from "../views/QuestionSubmitList.vue";
import DiscussionArea from "../views/DiscussionArea.vue";
import CompetitionView from "../views/CompetitionView.vue";
import QuestionDetail from "../views/QuestionDetail.vue";
import QuestionCreation from "../views/QuestionCreation.vue";
import UserLayout from "@/login/UserLayout.vue";
import QuestionBankView from "../views/QuestionBankView.vue";
import QuestionEditor from "../views/QuestionEditor.vue";
import loginView from "@/login/loginView.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题库",
    component: QuestionList,
    children: [
      {
        path: "questionDetail",
        name: "题目详情",
        component: QuestionDetail,
      },
    ],
  },
  {
    path: "/questionSubmit",
    name: "提交列表",
    component: QuestionSubmitList,
  },
  {
    path: "/questionBank",
    name: "题库列表",
    component: QuestionBankView,
    meta: {
      isAdmin: true,
    },
  },
  {
    path: "/questionDetail/:id",
    name: "题目详情",
    component: QuestionDetail,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questionEditor/:id",
    name: "修改题目",
    component: QuestionEditor,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/competition",
    name: "竞赛",
    component: CompetitionView,
  },
  {
    path: "/discussionArea",
    name: "讨论区",
    component: DiscussionArea,
  },
  {
    path: "/questionCreation",
    name: "创建题目",
    component: QuestionCreation,
    meta: {
      isAdmin: true,
    },
  },

  {
    path: "/user",
    name: "个人中心",
    component: UserLayout,
    meta: {
      hideInMenu: false,
    },
    children: [
      {
        path: "login",
        name: "登录页",
        component: loginView,
      },
    ],
  },
];

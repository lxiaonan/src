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
                v-loading="loading"
                >提交代码</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="题解" name="key">
        <div class="split-container">
          <div class="left-panel" :style="{ width: leftWidth + 'px' }">
            <!-- 左侧页面内容 -->
          </div>
          <div
            class="separator"
            @mousedown="startDrag"
            @mouseup="stopDrag"
            @mousemove="doDrag"
          >
            <button class="drag-handle"></button>
          </div>
          <div class="right-panel" :style="{ width: rightWidth + 'px' }">
            <!-- 右侧页面内容 -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="讨论" name="discussion">
        <div class="panel-body about-index-file-panel-body">
          <div class="about-index-file-type">
            题解
            <a
              href="/file_system/file/content/whole/index/content/10546648/"
              target="_blank"
              ><span class="file-field-title pull-right"
                >AcWing 839. 模拟堆</span
              ></a
            >
          </div>
          <hr style="margin: 0 0 10px 0" />
          <div class="row" style="margin: 0">
            <div class="col-xs-2 col-sm-1">
              <a href="/user/myspace/index/344786/" target="_blank">
                <img
                  class="img-circle"
                  src="https://cdn.acwing.com/media/user/profile/photo/344786_md_16e1f60572.jpg"
                  alt="DamianHuang的头像"
                  width="45px"
                />
              </a>
            </div>
            <div class="col-xs-10 col-sm-11">
              <a href="/user/myspace/index/344786/" target="_blank">
                <span class="about-index-file-panel-username">
                  DamianHuang
                </span>
              </a>
              <br />
              <span title="2023-11-19 13:30">
                <span class="about-index-file-panel-time">17分钟前</span>
              </span>
            </div>
          </div>
          <div style="padding-left: 45px">
            <div
              id="file-content-field-10546648"
              class="file-content-field"
              style="max-height: 300px"
            >
              <div
                class="main-martor main-martor-content"
                data-field-name="content"
              >
                <div class="section-martor">
                  <div
                    id="file-martor-field-10546648"
                    class="ui bottom attached tab active martor-preview"
                    data-tab="preview-tab-content"
                  >
                    <h4>主要是下标与第几次插入的映射关系</h4>
                    <pre class="hljs cs"><code>import java.util.*;

<span class="hljs-keyword"><span class="hljs-keyword">public</span></span> <span class="hljs-keyword"><span class="hljs-keyword">class</span></span> <span class="hljs-title"><span class="hljs-title">Main</span></span> {
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> final <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> N = <span class="hljs-number"><span class="hljs-number">100010</span></span>;
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[] h = <span class="hljs-keyword"><span class="hljs-keyword">new</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[N];
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[] ph = <span class="hljs-keyword"><span class="hljs-keyword">new</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[N]; <span class="hljs-comment"><span class="hljs-comment">// 第几次插入的下标</span></span>
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[] hp = <span class="hljs-keyword"><span class="hljs-keyword">new</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span>[N]; <span class="hljs-comment"><span class="hljs-comment">// 下标对应第几次插入</span></span>
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> m = <span class="hljs-number"><span class="hljs-number">0</span></span>; <span class="hljs-comment"><span class="hljs-comment">// 第几次插入</span></span>
    <span class="hljs-keyword"><span class="hljs-keyword">static</span></span> <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> cnt = <span class="hljs-number"><span class="hljs-number">0</span></span>; <span class="hljs-comment"><span class="hljs-comment">// 堆中元素个数</span></span>

    <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">private</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">static</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">void</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">heap_swap</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">int</span></span></span></span><span class="hljs-function"><span class="hljs-params"> a, </span></span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">int</span></span></span></span><span class="hljs-function"><span class="hljs-params"> b</span></span></span><span class="hljs-function">) </span></span>{ <span class="hljs-comment"><span class="hljs-comment">// a, b为两个下标</span></span>
        <span class="hljs-comment"><span class="hljs-comment">// 交换第几次插入</span></span>
        <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> t = ph[hp[a]];
        ph[hp[a]] = ph[hp[b]];
        ph[hp[b]] = t;

        <span class="hljs-comment"><span class="hljs-comment">// 交换下标</span></span>
        t = hp[a];
        hp[a] = hp[b];
        hp[b] = t;

        <span class="hljs-comment"><span class="hljs-comment">// 交换值</span></span>
        t = h[a];
        h[a] = h[b];
        h[b] = t;
    }

    <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">private</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">static</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">void</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">down</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">int</span></span></span></span><span class="hljs-function"><span class="hljs-params"> u</span></span></span><span class="hljs-function">) </span></span>{
        <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> t = u;
        <span class="hljs-keyword"><span class="hljs-keyword">if</span></span> (u * <span class="hljs-number"><span class="hljs-number">2</span></span> &lt;= cnt &amp;&amp; h[u * <span class="hljs-number"><span class="hljs-number">2</span></span>] &lt; h[t]) t = u * <span class="hljs-number"><span class="hljs-number">2</span></span>;
        <span class="hljs-keyword"><span class="hljs-keyword">if</span></span> (u * <span class="hljs-number"><span class="hljs-number">2</span></span> + <span class="hljs-number"><span class="hljs-number">1</span></span> &lt;= cnt &amp;&amp; h[u * <span class="hljs-number"><span class="hljs-number">2</span></span> + <span class="hljs-number"><span class="hljs-number">1</span></span>] &lt; h[t]) t = u * <span class="hljs-number"><span class="hljs-number">2</span></span> + <span class="hljs-number"><span class="hljs-number">1</span></span>;
        <span class="hljs-keyword"><span class="hljs-keyword">if</span></span> (u != t) {
            heap_swap(u, t);
            down(t);
        }
    }

    <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">private</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">static</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">void</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">up</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">int</span></span></span></span><span class="hljs-function"><span class="hljs-params"> u</span></span></span><span class="hljs-function">) </span></span>{
        <span class="hljs-keyword"><span class="hljs-keyword">while</span></span> (u / <span class="hljs-number"><span class="hljs-number">2</span></span> != <span class="hljs-number"><span class="hljs-number">0</span></span> &amp;&amp; h[u / <span class="hljs-number"><span class="hljs-number">2</span></span>] &gt; h[u]) {
            heap_swap(u, u / <span class="hljs-number"><span class="hljs-number">2</span></span>);
            u = u / <span class="hljs-number"><span class="hljs-number">2</span></span>;
        }
    }

    <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">public</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">static</span></span></span><span class="hljs-function"> </span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">void</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">main</span></span></span><span class="hljs-function">(</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">String[] args</span></span></span><span class="hljs-function">) </span></span>{
        Scanner sc = <span class="hljs-keyword"><span class="hljs-keyword">new</span></span> Scanner(System.<span class="hljs-keyword"><span class="hljs-keyword">in</span></span>);
        <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> n = sc.nextInt();
        <span class="hljs-keyword"><span class="hljs-keyword">while</span></span> (n-- &gt; <span class="hljs-number"><span class="hljs-number">0</span></span>) {
            String op = sc.next();
            <span class="hljs-keyword"><span class="hljs-keyword">if</span></span> (op.<span class="hljs-keyword"><span class="hljs-keyword">equals</span></span>(<span class="hljs-string"><span class="hljs-string">"I"</span></span>)) { <span class="hljs-comment"><span class="hljs-comment">// 插入一个数x</span></span>
                m++;
                cnt++;
                <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> x = sc.nextInt();
                ph[m] = cnt;
                hp[cnt] = m;
                h[cnt] = x;
                up(cnt);
            } <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">else</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">if</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">op.</span></span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">equals</span></span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-string"><span class="hljs-function"><span class="hljs-params"><span class="hljs-string">"PM"</span></span></span></span></span><span class="hljs-function">)) </span></span>{ <span class="hljs-comment"><span class="hljs-comment">// 输出堆顶元素</span></span>
                System.<span class="hljs-keyword"><span class="hljs-keyword">out</span></span>.println(h[<span class="hljs-number"><span class="hljs-number">1</span></span>]);
            } <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">else</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">if</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">op.</span></span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">equals</span></span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-string"><span class="hljs-function"><span class="hljs-params"><span class="hljs-string">"D"</span></span></span></span></span><span class="hljs-function">)) </span></span>{ <span class="hljs-comment"><span class="hljs-comment">// 删除第k个插入的元素</span></span>
                <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> k = sc.nextInt();
                k = ph[k];
                heap_swap(k, cnt);
                cnt--;
                up(k);
                down(k);
            } <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">else</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">if</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">op.</span></span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">equals</span></span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-string"><span class="hljs-function"><span class="hljs-params"><span class="hljs-string">"C"</span></span></span></span></span><span class="hljs-function">)) </span></span>{ <span class="hljs-comment"><span class="hljs-comment">// 修改第k个插入的元素为k</span></span>
                <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> k = sc.nextInt();
                <span class="hljs-keyword"><span class="hljs-keyword">int</span></span> x = sc.nextInt();
                k = ph[k];
                h[k] = x;
                up(k);
                down(k);
            } <span class="hljs-function"><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-keyword">else</span></span></span><span class="hljs-function"> </span><span class="hljs-title"><span class="hljs-function"><span class="hljs-title">if</span></span></span><span class="hljs-function"> (</span><span class="hljs-params"><span class="hljs-function"><span class="hljs-params">op.</span></span><span class="hljs-keyword"><span class="hljs-function"><span class="hljs-params"><span class="hljs-keyword">equals</span></span></span></span><span class="hljs-function"><span class="hljs-params">(</span></span><span class="hljs-string"><span class="hljs-function"><span class="hljs-params"><span class="hljs-string">"DM"</span></span></span></span></span><span class="hljs-function">)) </span></span>{ <span class="hljs-comment"><span class="hljs-comment">// 删除堆顶元素</span></span>
                heap_swap(<span class="hljs-number"><span class="hljs-number">1</span></span>, cnt);
                cnt--;
                down(<span class="hljs-number"><span class="hljs-number">1</span></span>);
            }
        }
    }
}
</code></pre>
                  </div>
                </div>
                <!-- end  /.section-martor -->
              </div>
            </div>
            <a
              id="file-content-filed-more-btn-10546648"
              style="margin-left: -30px; cursor: pointer"
              >展开</a
            >
          </div>
          <hr style="margin: 10px 0 0 0" />
          <div
            class="btn-group btn-group-justified"
            role="group"
            style="padding-bottom: 5px"
          >
            <div class="btn-group" role="group">
              <form
                id="form_vote_10546648"
                action="/file_system/file/operation/vote/up/10546648/"
                method="post"
              >
                <input
                  type="hidden"
                  name="csrfmiddlewaretoken"
                  value="4GHSLCMf5Jl4zEg8Pvv6bYIKHN4TwcJ5MZXXBKISVI6rrT2Aj4uifhRm3LYj1WOH"
                />
                <a
                  class="btn btn-link"
                  title="赞"
                  onclick="$('#form_vote_10546648').submit();"
                  style="cursor: pointer"
                >
                  <span
                    class="glyphicon glyphicon-heart-empty form_vote_10546648_heart"
                    style="top: 2px"
                  ></span>

                  &nbsp;
                  <span class="form_vote_10546648_votecnt"> 赞 </span>
                </a>
              </form>
            </div>
            <div class="btn-group" role="group">
              <a
                id="comment_field_btn_10546648"
                class="btn btn-link"
                title="评论"
              >
                <span
                  class="file_commentcnt glyphicon glyphicon-comment"
                  style="top: 2px"
                ></span>
                &nbsp;
                <span id="file_commentcnt_10546648"> 评论 </span>
              </a>
            </div>
            <div class="btn-group" role="group">
              <form
                id="form_collect_10546648"
                class="form_collect"
                action="/file_system/file/operation/collect/add/10546648/"
                method="post"
              >
                <input
                  type="hidden"
                  name="csrfmiddlewaretoken"
                  value="4GHSLCMf5Jl4zEg8Pvv6bYIKHN4TwcJ5MZXXBKISVI6rrT2Aj4uifhRm3LYj1WOH"
                />
                <a
                  class="btn btn-link"
                  title="收藏"
                  onclick="$('#form_collect_10546648').submit();"
                  style="cursor: pointer"
                >
                  <span
                    class="glyphicon glyphicon-star-empty form_collect_10546648_star"
                    style="top: 2px"
                  ></span>

                  &nbsp;
                  <span class="form_collect_10546648_collectcnt"> 收藏 </span>
                </a>
              </form>
            </div>
          </div>
          <hr style="margin: 0 0 10px 0" />

          <div
            id="comment_field_10546648"
            style="
              background-color: #f8f8f8;
              margin: -10px;
              padding: 10px;
              display: none;
            "
          >
            <h3 style="font-weight: normal; margin: 10px 0 30px 0">0 评论</h3>
            <div class="row">
              <div class="col-md-1 col-sm-2 col-xs-3">
                <a href="/user/myspace/index/234230/">
                  <img
                    class="img-circle"
                    src="https://cdn.acwing.com/media/user/profile/photo/234230_md_0934c61d47.jpg"
                    width="45px"
                    alt="我的头像"
                  />
                </a>
              </div>

              <div class="col-md-11 col-sm-10 col-xs-9">
                <form
                  id="comment_reply_form_top_10546648"
                  class="comment_reply_form"
                  role="form"
                  method="post"
                  action="/file_system/file/operation/comment/add/10546648/0/"
                  enctype="multipart/form-data"
                >
                  <input
                    type="hidden"
                    name="csrfmiddlewaretoken"
                    value="4GHSLCMf5Jl4zEg8Pvv6bYIKHN4TwcJ5MZXXBKISVI6rrT2Aj4uifhRm3LYj1WOH"
                  />
                  <textarea
                    class="file-comment"
                    name="content"
                    cols="40"
                    rows="2"
                    maxlength="3000"
                    title="回复"
                    placeholder="在这里写评论...（支持MarkDown和Latex语法）"
                  ></textarea>
                  <div
                    class="col-md-offset-10 col-md-2 col-sm-offset-9 col-sm-3 col-xs-offset-7 col-xs-5"
                  >
                    <button
                      id="comment_reply_submit_btn_10546648"
                      class="form-control btn btn-link"
                      style="border-radius: 5px"
                    >
                      提交评论
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div
              id="comment_list_field_10546648"
              class="comment_list_field"
            ></div>
          </div>
        </div>
      </el-tab-pane>
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

//加载
const loading = ref<boolean>(false);

//题目详情信息
const questionDetail = ref<QuestionVO>();
const questionId = route.params.id;
const getQuestionDetail = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    questionId
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
  loading.value = true;
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost(
    form.value
  );
  if (res.code !== 0) {
    ElMessage.error("提交失败" + res.message);
    loading.value = false;
    return;
  }
  ElMessage.success("提交成功");
  setTimeout(() => {
    loading.value = false;
    router.push("/questionSubmit");
  }, 2000);
};

//题解页面
const isDragging = ref(false);
const startX = ref(0);
// 在 setup 函数中设置初始的 leftWidth 和 rightWidth
const leftWidth = ref(window.innerWidth * 0.45); // 左侧宽度占45%
const rightWidth = ref(window.innerWidth * 0.55); // 右侧宽度占55%

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
};

const stopDrag = () => {
  isDragging.value = false;
};

const doDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    const offset = e.clientX - startX.value;
    leftWidth.value += offset;
    rightWidth.value -= offset;
    startX.value = e.clientX;
  }
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

//题解
.split-container {
  display: flex;
}

.left-panel,
.right-panel {
  height: 100vh;
  overflow: auto;
  border: 1px solid #ebeef5;
  background-color: #f7f7f7;
}

.separator {
  position: relative;
  height: 100%;
  user-select: none; /* 防止选中文本 */
  touch-action: none; /* 禁止触摸事件的默认行为 */
  will-change: width; /* 告诉浏览器该元素的 width 属性将会发生改变 */
  transition: width 0.2s ease; /* 添加过渡效果 */
}
.drag-handle {
  position: absolute;
  left: -7.5px; /* 将按钮左移一半长度，使其居中 */
  width: 15px;
  height: 50px;
  cursor: col-resize;
  background-color: #ddd;
  border: none;
}
</style>

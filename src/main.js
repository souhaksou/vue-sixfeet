import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// vue loading-overlay
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// bootstrap icon
import 'bootstrap-icons/font/bootstrap-icons.css';

// 表單驗證
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';

// css動畫
import 'animate.css';

const app = createApp(App);

app.config.globalProperties.$filters = { date, currency };

// 表單驗證
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

// 整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(VueAxios, axios);
app.use(router);
app.component('loading-overlay', Loading); // 全域註冊
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');

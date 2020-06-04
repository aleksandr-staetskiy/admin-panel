import Vue from 'vue';
import {
  Form,
  Input,
  Button,
  Dropdown,
  Select,
  Icon,
  Menu,
  Divider,
  Layout,
  Breadcrumb,
  Table,
  Switch,
  Tabs,
  Popover,
  Tag,
  Drawer,
  Row,
  Col,
  Modal,
  DatePicker,
  Radio,
  InputNumber,
} from 'ant-design-vue/es';
// eslint-disable-next-line import/extensions
import router from './router';
// eslint-disable-next-line import/extensions
import store from './store';
import App from './App.vue';

Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Divider);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(InputNumber);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

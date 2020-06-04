import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AppNavbar from '../components/AppNavbar.vue';
import Lists from '../views/Lists.vue';
import RC from '../components/ResidentialComplex.vue';
import AppSidebar from '../components/AppSidebar.vue';
import ObjList from '../components/Objects.vue';
import Rooms from '../components/Rooms.vue';
import AppSidebarExpanded from '../components/AppSidebarExpanded.vue';
import Discount from '../views/Discount.vue';
import DiscountList from '../views/DiscountList.vue';
import Settings from '../views/Settings.vue';
import EditorNavigation from '../components/EditorNavigation.vue';
import PlanEditor from '../views/PlanEditor.vue';
import FacadeEditor from '../views/FacadeEditor.vue';
import RCEditor from '../views/RCEditor.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: { default: Home, AppNavbar },
  },
  {
    path: '/login',
    name: 'Login',
    components: { default: Login },
  },
  {
    path: '/lists',
    name: 'List',
    components: { default: Lists, AppNavbar },
    children: [
      {
        path: 'res-complex',
        name: 'RC',
        components: { content: RC },
      },
      {
        path: 'objects',
        name: 'Objects',
        components: { sidebar: AppSidebar, content: ObjList },
      },
      {
        path: 'rooms',
        name: 'Rooms',
        components: { sidebar: AppSidebarExpanded, content: Rooms },
      },
    ],
  },
  {
    path: '/discount',
    name: 'Discount',
    components: { default: Discount, AppNavbar },
  },
  {
    path: '/discount-list',
    name: 'DiscountList',
    components: { default: DiscountList, AppNavbar },
  },
  {
    path: '/settings',
    name: 'Settings',
    components: { default: Settings, AppNavbar },
  },
  {
    path: '/plan-editor',
    name: 'PlanEditor',
    components: { default: PlanEditor, AppNavbar: EditorNavigation },
  },
  {
    path: '/facade-editor',
    name: 'FacadeEditor',
    components: { default: FacadeEditor, AppNavbar: EditorNavigation },
  },
  {
    path: '/rc-editor',
    name: 'RCEditor',
    components: { default: RCEditor, AppNavbar: EditorNavigation },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

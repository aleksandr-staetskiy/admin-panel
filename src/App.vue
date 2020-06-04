<template>
  <div id="app">
    <router-view name="AppNavbar" />
    <router-view />
  </div>
</template>

<script>
import 'ant-design-vue/dist/antd.css';

export default {
};
</script>

<style lang="scss">
    #app {
      height: 100vh;
      padding-top: 40px;
    }
    body {
      min-width: 1024px;
      background: #f0f2f5;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: auto;
    }
    .ant-form-item-label {
      line-height: 16px;
    }
   .ant-form-item-required {
     &::before {
       display: none;
     }
  }
   .content {

     &-header {
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-bottom: 31px;
     }

     &-sync {
       padding-right: 30px;
     }

     &-title {
       display: flex;
       align-items: baseline;
       color: #000;
       font-weight: 500;
       font-size: 24px;
       line-height: 28px;
       margin: 0;
     }
     &-length {
       color: #828282;
       font-weight: 500;
       font-size: 14px;
       line-height: 16px;
       margin-left: 23px;
     }
   }
    .ant-table-row {
      cursor: pointer;
    }

  .ant-drawer {
    z-index: 1;
  }

   .svg-polygon {
    opacity: .4;
    cursor: pointer;
    &:hover {
      fill: rgba(137, 43, 226, 0.568)!important;
    }
  }
</style>

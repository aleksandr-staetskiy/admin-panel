<template>
  <a-layout-header
    style="padding: 0px 30px;"
    class="header"
  >
    <div class="wrap">
      <div class="left-side">
        <div class="name">
          СеверЗастройщик
        </div>
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a-icon type="user" />1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="user" />2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="user" />3rd item
                </a-menu-item>
              </a-menu>
              <a-button
                style="margin-left: 8px; color: #fff;"
                type="link"
              >
                Объекты
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-menu-item>

          <a-menu-item key="2">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a-icon type="user" />1st menu item
                </a-menu-item>
              </a-menu>
              <a-button
                style="margin-left: 8px; color: #fff;"
                type="link"
              >
                Акции
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right-side">
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1">
              <a-icon type="user" />1st menu item
            </a-menu-item>
          </a-menu>
          <a-button
            style="margin-right: 8px; color: #fff;"
            type="link"
            @click="() => this.$router.push({ name: 'Settings' })"
          >
            Настройки
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <div
          class="icon-wrap"
          v-html="header_help"
        />
        <div
          class="icon-wrap"
          v-html="header_logout"
        />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import Svg from '../Svg.js';

export default {
  name: 'AppNavbar',
  data() {
    return {
      header_help: Svg.header_help,
      header_logout: Svg.header_logout,
    };
  },
};
</script>

<style lang="scss" scoped>
  .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .left-side {
    display: flex;
    align-items: center;
  }
  .right-side {
    display: flex;
    align-items: center;
  }
  .app-logo {
    width: 32px;
    height: 32px;
  }
  .name {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    margin: 0;
    margin-left: 16px;
    margin-right: 33px;
  }
  .icon-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
  }

</style>

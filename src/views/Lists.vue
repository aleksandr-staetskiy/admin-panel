<template>
  <div class="lists">
    <router-view name="sidebar" />
    <a-layout style="padding: 16px 24px 20px; overflow: hidden">
      <router-view
        class="content-area"
        name="content"
      />
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Lists',
};
</script>

<style lang="scss" scoped>
  .lists {
    height: 100%;
    display: flex;
  }

  .content-area {
    width: 100%;
    margin: 24px 24px 0 0;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar { width: 0; }
  }
</style>

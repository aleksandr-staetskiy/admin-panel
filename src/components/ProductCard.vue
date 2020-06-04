<template>
  <div class="card">
    <div
      class="card-img-wrap"
      @click="linkTo"
    >
      <div class="card-img" />
    </div>
    <h3 class="card-title">
      {{ info }}
    </h3>
    <ul class="card-list">
      <li
        v-for="item of list"
        :key="item"
        class="card-list-item"
      >
        {{ item }}
      </li>
    </ul>
    <a-button
      class="card-btn"
      type="primary"
      block
      @click="linkTo"
    >
      {{ amount }}
    </a-button>
  </div>
</template>

<script>

export default {
  name: 'ProductCard',
  props: {
    info: String,
    list: Object,
    amount: Number,
    linkTo: Function,
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
  .card {
    width: 340px;
    padding: 32px;
    margin: 0 15px 32px 0;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    &-btn {
      margin-top: 24px;
    }

    &-img {
      background: url("../assets/NY.jpg")no-repeat;
      background-size: 100%;
      height: 100%;
      &-wrap {
        cursor: pointer;
        width: 276px;
        height: 212px;
        margin-bottom: 24px;
        border-radius: 4px;
        overflow: hidden;
      }
      &-title {
        color: #000;
        font-weight: bold;
        font-size: 18px;
        line-height: 21px;
      }
    }
    &-list {
      padding-left: 12px;
      margin-bottom: 0;
    }
  }
</style>

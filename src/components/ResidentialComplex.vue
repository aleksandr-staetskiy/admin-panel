<template>
  <div class="rc">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>Стартовый экран</a-breadcrumb-item>
      <a-breadcrumb-item>Список ЖК</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '30px 24px 24px 24px', margin: '17px 0 0 0' }"
    >
      <div class="content-header">
        <h1 class="content-title">
          Список ЖК
        </h1>
        <a-button
          class="errors-btn"
          type="primary"
          ghost
        >
          Помещения с ошибками
        </a-button>
      </div>
      <div class="rc-catalogue">
        <ProductCard
          v-for="item in houses"
          :key="item.id"
          :info="item.name"
          :list="item.address"
          :amount="item.id"
          :link-to="toObjects"
        />
      </div>
    </a-layout-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  name: 'ResidentialComplex',
  components: {
    ProductCard,
  },
  computed: {
    ...mapState([
      'houses',
    ]),
  },
  mounted() {
    this.$store.dispatch('GET_DATA');
  },
  methods: {
    toObjects() {
      this.$router.push({ name: 'Objects' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .rc-catalogue {
    display: flex;
    flex-wrap: wrap;
    /*margin-top: 40px;*/
  }
  .errors-btn {
    margin-right: 32px;
  }
</style>

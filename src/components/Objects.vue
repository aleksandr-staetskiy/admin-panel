<template>
  <div class="objects">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>
        Стартовый экран
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        Список объектов
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{ background: '#fff', padding: '30px 24px 24px 24px', margin: '17px 0 0 0' }"
    >
      <div class="content-header">
        <h1 class="content-title">
          Список объектов
        </h1>
        <div class="content-sync">
          Синх. в 15:34 - 13.12.2020
        </div>
      </div>

      <div class="objects-inner">
        <ProductCard
          v-for="item in houses"
          :key="item.id"
          :info="item.name"
          :list="item.address"
          :amount="item.id"
          :link-to="toRooms"
        />
      </div>
    </a-layout-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
    };
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
    toRooms() {
      this.$router.push({ name: 'Rooms' });
    },
  },
};
</script>
<style lang="scss" scoped>
  .objects {
    &-inner {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
    }
  }
</style>

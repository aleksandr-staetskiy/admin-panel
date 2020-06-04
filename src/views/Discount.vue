<template>
  <div class="discount">
    <AppFilter />
    <a-layout style="padding: 36px 24px 20px; overflow: hidden">
      <!--      content  -->
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>Стартовый экран</a-breadcrumb-item>
        <a-breadcrumb-item>Список акций</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        class="content-area"
        :style="{ background: '#fff', padding: '30px 24px 24px 24px', margin: '17px 0 0 0'}"
      >
        <div class="content-header">
          <h1 class="content-title">
            Назначение акций
          </h1>
        </div>
        <div class="discount-table">
          <a-table
            :columns="columns"
            :data-source="rooms_data"
            :scroll="{ x: 1200, y: 500 }"
            :loading="tableLoading"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppFilter from '../components/AppFilter.vue';

const columns = [
  {
    title: 'Планировка', dataIndex: 'name', key: '1', width: 160,
  },
  {
    title: 'Подъезд', dataIndex: 'email', key: '2', width: 160,
  },
  {
    title: 'Этаж', dataIndex: 'id', key: '3', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: '№', dataIndex: 'address.suite', key: '4', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Кол-во комнат', dataIndex: 'id', key: '5', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Площадь', dataIndex: 'address.zipcode', key: '6', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Стоимость', dataIndex: 'address.geo.lng', key: '7', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Стоимость м2', dataIndex: 'phone', key: '8', width: 160, sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Акции', dataIndex: 'company.name', key: '9', width: 160,
  },
];


export default {
  name: 'Discount',
  components: {
    AppFilter,
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    ...mapState(['rooms_data', 'tableLoading']),
  },
  mounted() {
    this.$store.dispatch('GET_ROOMS');
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.discount {
  height: 100%;
  display: flex;
}

.content-area {
  width: 100%;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    width: 0;
  }
}

</style>

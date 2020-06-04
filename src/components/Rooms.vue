<template>
  <div class="rooms">
    <div class="rooms-statusbar">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>Стартовый экран</a-breadcrumb-item>
        <a-breadcrumb-item>Список ЖК</a-breadcrumb-item>
        <a-breadcrumb-item>Список объектов ЖК</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="rooms-statusbar-manipulate">
        <div class="rooms-statusbar-txt">
          Скрыть объект
        </div>
        <div class="switch-status">
          {{ switchStatus }}
        </div>
        <a-switch @change="handleChange" />
      </div>
    </div>
    <a-layout-content
      :style="{ background: '#fff', padding: '30px 24px 0 24px', margin: '17px 0 0 0' }"
    >
      <div class="content-header">
        <div class="content-title">
          Список помещений
          <div class="content-length">
            всего {{ rooms_data.length }}
          </div>
        </div>
        <div class="content-sync">
          Синх. в 15:34 - 13.12.2020
        </div>
      </div>
      <div class="rooms-table">
        <a-table
          v-if="rooms_data"
          :columns="columns"
          :data-source="rooms_data"
          :scroll="{ x: 1200, y: 450}"
          :loading="tableLoading"
        />
      </div>
    </a-layout-content>
    <!--  drawer here-->
    <a-drawer
      v-if="tableRowIndex !== null"
      width="359"
      placement="right"
      :closable="false"
      :visible="drawerIsVisible"
      @close="closeDrawer"
    >
      <div class="drawer">
        <div class="drawer-header-info">
          {{ rooms_data[tableRowIndex].name }}
        </div>
        <div class="drawer-rooms">
          {{ rooms_data[tableRowIndex].id }}
        </div>
        <img
          class="drawer-plan-img"
          src="../assets/dashboardimg.jpg"
          alt=""
        >
        <a-tabs
          default-active-key="1"
          size="large"
        >
          <a-tab-pane
            key="1"
            tab="О помещении"
          >
            <div class="drawer-pricing">
              <a-row>
                <a-col
                  :span="10"
                  class="drawer-title"
                >
                  <p>Стоимость</p>
                </a-col>
                <a-col
                  :span="7"
                  style="text-align: center"
                >
                  <strike class="drawer-pricing-old">
                    {{ rooms_data[tableRowIndex].address.suite }}
                  </strike>
                </a-col>
                <a-col
                  :span="7"
                  style="text-align: right"
                >
                  {{ rooms_data[tableRowIndex].address.suite }}
                </a-col>
              </a-row>
              <a-row>
                <a-col
                  :span="10"
                  class="drawer-title"
                >
                  Стоимость за м²
                </a-col>
                <a-col
                  :span="7"
                  style="text-align: center"
                >
                  <strike class="drawer-pricing-old">
                    103 932 р.
                  </strike>
                </a-col>
                <a-col
                  :span="7"
                  style="text-align: right"
                >
                  93 932 р.
                </a-col>
              </a-row>
            </div>
            <div class="drawer-discount">
              <div class="drawer-discount">
                <div class="drawer-discount-title drawer-title">
                  Акция
                </div>

                <div class="drawer-discount-item">
                  <div class="">
                    <div class="drawer-title">
                      Скидка 10%
                    </div>
                    <div class="">
                      - 1 211 548₽
                    </div>
                  </div>
                  <div class="drawer-discount-duration">
                    до 20 января 2020
                  </div>
                  <div class="close-cross" />
                </div>

                <a-button
                  class="drawer-btn"
                  type="primary"
                  ghost
                  @click="toDiscount"
                >
                  Назначить акцию
                </a-button>
              </div>
            </div>
            <a-divider class="drawer-divider" />
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Подъезд</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Этаж</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>

            <a-divider class="drawer-divider" />
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Количество комнат</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Отделка</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Высота потолка</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>

            <a-divider class="drawer-divider" />
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Общая площадь</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Жилая площадь</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col
                class="drawer-title"
                :span="20"
              >
                <p>Нежилая площадь</p>
              </a-col>
              <a-col :span="4">
                <p>eiortj</p>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const columns = [
  {
    title: 'Планировка', dataIndex: 'name', key: '1', width: 160,
  },
  {
    title: 'Подъезд', dataIndex: 'email', key: '2', width: 190,
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
    title: 'Стоимость', dataIndex: 'address.geo.lng', key: '7', width: 160, align: 'right', sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Стоимость м2', dataIndex: 'phone', key: '8', width: 160, sorter: (a, b) => a.phone - b.phone,
  },
  {
    title: 'Акции', dataIndex: 'company.name', key: '9', width: 160,
  },
];


export default {
  name: 'Rooms',
  data() {
    return {
      columns,
      isSwitched: false,
      drawerIsVisible: false,
      tableRowIndex: null,
    };
  },
  computed: {
    ...mapState([
      'rooms_data',
      'tableLoading',
    ]),
    switchStatus() {
      return this.isSwitched ? 'Да' : 'Нет';
    },
  },
  mounted() {
    this.$store.dispatch('GET_ROOMS');
    this.rowClickListener();
  },
  methods: {
    foo(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows);
    },
    handleChange(checked) {
      this.isSwitched = !!checked;
    },
    showDrawer() {
      this.drawerIsVisible = true;
    },
    closeDrawer() {
      this.drawerIsVisible = false;
    },
    rowClickListener() {
      const tableBody = document.querySelector('.ant-table-tbody');

      tableBody.addEventListener('click', (e) => {
        const tag = e.target.tagName;

        if (tag === 'TD') {
          this.tableRowIndex = e.target.parentNode.dataset.rowKey;
          this.showDrawer();
        }
        if (tag === 'TR') {
          this.tableRowIndex = e.target.dataset.val.rowKey;
          this.showDrawer();
        }
      });
    },
    toDiscount() {
      this.$router.push({ name: 'Discount' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .rooms {
    &-table {
      max-width: 1480px;
      margin-top: 40px;
    }
    &-statusbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-manipulate {
        display: flex;
        align-items: center;
        margin-right: 25px;
      }
      &-txt {
        color: rgb(24, 144, 255);
        margin-right: 19px;
      }
    }
  }
  .switch-status {
    width: 30px;
    margin-right: 11px;
  }

  .drawer {
    padding-top: 35px;
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 14px;
    }
    &-plan {
      &-img {
        width: 295px;
        height: 218px;
        margin-top: 16px;
        margin-bottom: 20px;
        object-fit: cover;
      }
    }
    &-divider {
      margin: 16px 0;
    }
    &-header-info {
      color: rgba(0, 0, 0, 0.85);
      font-weight: bold;
      font-size: 20px;
      line-height: 27px;
      margin-top: 30px;
    }
    &-rooms {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 19px;
      margin-top: 16px;
    }
    &-discount {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 7px;
      &-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border: 1px solid #DCDCDC;
        box-sizing: border-box;
        border-radius: 3px;
        margin-top: 6px;
        margin-bottom: 16px;
      }
      &-title {
        align-self: flex-start;
      }
      &-duration {
        align-self: flex-end;
        color: rgba(153, 153, 153, 0.84);
        font-size: 12px;
        line-height: 120%;
        margin-left: 50px;
      }
    }
    &-pricing-old {
      font-size: 10px;
    }
  }
</style>

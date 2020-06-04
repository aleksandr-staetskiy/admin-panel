<template>
  <div class="discount">
    <a-layout style="padding: 36px 24px 20px; overflow: hidden; height: 100%">
      <!--      content  -->
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          Стартовый экран
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          Список акций
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        class="content-area"
        :style="{ background: '#fff',
                  padding: '30px 24px 24px 24px',
                  margin: '17px 0 0 0',
        }"
      >
        <div class="content-header fixed-width">
          <h1 class="content-title">
            Назначение акций
          </h1>
          <div class="btn-group">
            <a-button
              type="primary"
              @click="showModal"
            >
              Создать акцию
            </a-button>
            <a-button
              type="primary"
              style="margin-left: 16px"
              @click="() => this.$router.push({ name: 'Discount' })"
            >
              Назначить акции
            </a-button>
          </div>
        </div>
        <div class="discount-list-table">
          <a-table
            :columns="columns"
            :data-source="data"
            :scroll="{ y: 400 }"
          >
            <template
              slot="gender"
              slot-scope="gender"
            >
              <div v-html="matchIcon(gender)" />
            </template>
            <template
              slot="name"
              slot-scope="name"
            >
              {{ name }}
            </template>
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>

    <AModal
      title="Создание акции"
      style="top: 28px;"
      width="359px"
      :footer="null"
      v-model="modalIsOpen"
    >
      <div class="form-title">
        Общее
      </div>
      <AForm
        :form="form"
        @submit="handleSubmit"
      >
        <AFormItem
          label="Название акции"
          class="form-label"
        >
          <AInput
            placeholder="Акция месяца"
            v-decorator="['name']"
          />
        </AFormItem>

        <AFormItem
          label="Краткое описание акции"
          class="form-label"
        >
          <ATextarea
            placeholder="Basic usage"
            :rows="4"
            v-decorator="['descr']"
          />
        </AFormItem>

        <AFormItem
          label="Ссылка на описание акции на сайте"
          class="form-label"
        >
          <AInput
            placeholder="Текст поля"
            v-decorator="['link']"
          />
        </AFormItem>

        <ARow :gutter="37">
          <ACol
            v-for="(icon, index) in discountIcons"
            :key="index"
            :span="6"
          >
            <div
              :class="{ active: index === activeIcon }"
              class="discount-icon"
              v-html="icon"
              @click="chooseIcon(index)"
            />
          </ACol>
        </ARow>

        <div class="form-title">
          Условия акции
        </div>
        <div class="discount-row">
          <div class="discount">
            Бесрочная акция
          </div>
          <span class="switch-row">
            {{ switchStatus }}
            <a-form-item class="switch-wrap">
              <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" />
            </a-form-item>
          </span>
        </div>

        <AFormItem
          v-bind="formItemLayout"
          class="form-label"
        >
          <ARangePicker v-decorator="['range-picker', rangeConfig]" />
        </AFormItem>

        <div :style="{ marginTop: '16px' }">
          <AFormItem
            label="Вычесть из стоимости"
            class="form-label"
          >
            <ARadioGroup
              default-value="a"
              v-decorator="['price_change']"
            >
              <ARadioButton
                style="width: 132px; text-align: center"
                value="Процент"
              >
                Процент
              </ARadioButton>
              <ARadioButton
                value="Фиксированную сумму"
              >
                Фиксированную сумму
              </ARadioButton>
            </ARadioGroup>
          </AFormItem>
        </div>

        <div :style="{ marginTop: '16px' }">
          <AFormItem label="Вычесть процент из">
            <ARadioGroup
              default-value="a"
              v-decorator="['price_in']"
            >
              <ARadioButton
                value="a"
              >
                Стоимости за м²
              </ARadioButton>
              <a-radio-button
                style="width: 170px; text-align: center"
                value="b"
              >
                Общей стоимости
              </a-radio-button>
            </ARadioGroup>
          </AFormItem>
        </div>

        <AFormItem label="Процент вычета из стоимости за м²">
          <a-input-number
            class="full-width"
            :default-value="10"
            :min="0"
            :max="100"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            v-decorator="['percent']"
          />
        </AFormItem>
        <div class="form-bottom">
          <AButton
            type="primary"
            html-type="submit"
          >
            Создать акцию
          </AButton>
        </div>
      </AForm>
    </AModal>

    <!--    drawer here-->
    <a-drawer
      v-if="tableRowIndex && tableRowIndex !== null && tableRowIndex !== undefined"
      width="359"
      placement="right"
      :closable="false"
      :visible="drawerIsVisible"
      @close="closeDrawer"
    >
      <div class="drawer">
        <div class="drawer-header">
          <div
            class="drawer-icon"
            v-html="Svg.discount_icon"
          />
          <div class="drawer-header-info">
            <div class="drawer-name">
              {{ data[tableRowIndex].name }}
            </div>
            <div class="drawer-status">
              {{ data[tableRowIndex].status }}
            </div>
          </div>
        </div>

        <ADivider />

        <div class="drawer-conditions">
          <div class="drawer-conditions-title">
            Условия
          </div>
          <div class="drawer-conditions-discount">
            {{ data[tableRowIndex].price_change }}
          </div>
          <div class="drawer-conditions-duration">
            c {{ data[tableRowIndex].start }}
            по {{ data[tableRowIndex].end }}
          </div>
        </div>

        <ADivider />

        <div class="drawer-description-title">
          Описание акции
        </div>
        <div class="drawer-description">
          {{ data[tableRowIndex].descr }}
        </div>
        <a
          href="#"
          class="drawer-link-to"
        >Подробнее на сайте</a>

        <ADivider class="drawer-divider" />

        <div class="drawer-discounts">
          <div class="drawer-discounts-info">
            Помещений с акцией
          </div>
          <div class="drawer-discounts-amount">
            {{ data[tableRowIndex].discount }}
          </div>
        </div>

        <ADivider class="drawer-divider" />

        <a-row :gutter="13">
          <a-col
            class="drawer-title"
            :span="12"
          >
            <a-button
              class="drawer-btn"
              type="primary"
              block
              ghost
            >
              Изменить
            </a-button>
          </a-col>
          <a-col :span="12">
            <a-button
              class="drawer-btn"
              type="primary"
              block
              ghost
              @click="() => this.$router.push({ name: 'Discount' })"
            >
              Назначить
            </a-button>
          </a-col>
          <a-col
            class="drawer-title"
            :span="12"
          >
            <a-button
              class="drawer-btn"
              type="primary"
              block
              ghost
            >
              Отключить
            </a-button>
          </a-col>
          <a-col
            class="drawer-title"
            :span="12"
          >
            <a-button
              class="drawer-btn"
              type="primary"
              block
              ghost
              @click="deleteDiscount"
            >
              Удалить
            </a-button>
          </a-col>
        </a-row>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import Svg from '../Svg.js';

const columns = [
  {
    title: 'Иконка',
    dataIndex: 'gender',
    width: '10%',
    scopedSlots: { customRender: 'gender' },
  },
  {
    title: 'Название',
    dataIndex: 'name',
    width: '35%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Начало',
    dataIndex: 'start',
    width: '10%',
  },
  {
    title: 'Конец',
    dataIndex: 'end',
    width: '10%',
  },
  {
    title: 'Изменение стоимости',
    dataIndex: 'price_change',
    width: '18%',
  },
  {
    title: 'Помещений с акцией',
    dataIndex: 'discount',
    width: '18%',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    width: '12%',
  },
];

export default {
  name: 'DiscountList',
  data() {
    return {
      Svg,
      data: [
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales ipsum velit ipsum varius amet ipsum ornare commodo lorem et sagittis morbi leo augue ut sed quis aliquam at neque, interdum mauris commodo nisl varius diam hendrerit',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales ipsum velit ipsum varius amet ipsum ornare commodo',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: 'Безсрочно',
          end: 'Безсрочно',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales ipsum velit ipsum',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: 'Безсрочно',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: 'Не назначена',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: 'Не назначена',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare',
        },
        {
          name: 'Воспитательный грач',
          gender: 'kek',
          start: '01.03.2018',
          end: '31.07.2020',
          price_change: '- фикс. 200 000₽',
          discount: '125',
          status: 'Активна',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare',
        },
      ],
      obj: {
        lol: '<svg width="25" height="25" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n       <rect width="3" height="3" fill="#828282"/>\n       <rect y="5" width="3" height="3" fill="#828282"/>\n       <rect y="10" width="3" height="3" fill="#828282"/>\n       <rect x="5" y="10" width="3" height="3" fill="#828282"/>\n       <rect x="5" y="5" width="3" height="3" fill="#828282"/>\n       <rect x="5" width="3" height="3" fill="#828282"/>\n     </svg>',
        kek: '<svg width="25" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 34.88c.039-9.349-3.569-18.126-10.159-24.716S486.457-.028 477.126.006c-9.322.039-18.098 3.702-24.711 10.314-2.8 2.8-7.893 8.848-10.679 12.205a8.294 8.294 0 001.083 11.68 8.294 8.294 0 0011.68-1.083c4.364-5.256 7.971-9.395 9.646-11.071 3.498-3.497 8.132-5.435 13.05-5.456h.079c4.862 0 9.419 1.88 12.837 5.299 3.437 3.437 5.32 8.024 5.299 12.916-.021 4.917-1.959 9.551-5.456 13.05-3.131 3.131-13.893 11.668-29.312 22.439-9.121-15.594-26.037-26.099-45.37-26.099H293.808c-16.396 0-31.81 6.385-43.405 17.978L7.613 304.971C2.704 309.88 0 316.407 0 323.349s2.704 13.47 7.613 18.378L170.28 504.394c5.068 5.067 11.722 7.6 18.378 7.6 6.656 0 13.312-2.534 18.378-7.6l242.792-242.791c11.593-11.594 17.978-27.008 17.978-43.405V96.735c0-3.585-.363-7.085-1.051-10.47 17.551-12.077 30.435-22.18 34.929-26.674 6.614-6.612 10.277-15.388 10.316-24.711zm-60.783 183.318c0 11.965-4.66 23.214-13.119 31.673L195.306 492.664c-3.664 3.665-9.63 3.665-13.295 0L19.344 329.997c-1.775-1.775-2.754-4.136-2.754-6.648s.978-4.872 2.754-6.647L262.135 73.911c8.461-8.46 19.709-13.119 31.673-13.119h121.463c13.64 0 25.53 7.637 31.618 18.859a672.558 672.558 0 01-32.408 20.171 35.31 35.31 0 00-1.119-1.177c-13.584-13.584-35.686-13.584-49.27 0-13.584 13.584-13.584 35.686 0 49.27 6.792 6.792 15.714 10.187 24.635 10.187 8.921 0 17.843-3.395 24.635-10.187 9.067-9.067 12.072-21.926 9.036-33.517a696.517 696.517 0 0028.815-17.743l.003.081v121.462zm-69.898-91.191a8.294 8.294 0 0011.139 3.682 519.856 519.856 0 0014.504-7.596c.048 4.735-1.722 9.485-5.328 13.091-7.116 7.115-18.692 7.115-25.808 0-7.115-7.116-7.115-18.692 0-25.808a18.191 18.191 0 0112.904-5.336c3.7 0 7.389 1.134 10.536 3.363a509.19 509.19 0 01-14.263 7.468 8.29 8.29 0 00-3.684 11.136z"/><path d="M247.162 168.962a8.295 8.295 0 00-8.295 8.295v175.179a8.295 8.295 0 0016.59 0V177.257a8.295 8.295 0 00-8.295-8.295zM209.231 240.213c-13.583-13.586-35.686-13.585-49.268-.001-13.584 13.584-13.584 35.686 0 49.27 6.793 6.793 15.713 10.188 24.635 10.187 8.92 0 17.843-3.397 24.634-10.187 6.581-6.581 10.205-15.329 10.205-24.635s-3.625-18.055-10.206-24.634zm-11.73 37.537c-7.116 7.116-18.692 7.115-25.807 0-7.115-7.116-7.115-18.692 0-25.808 3.558-3.558 8.231-5.336 12.904-5.336s9.346 1.778 12.904 5.336a18.128 18.128 0 015.345 12.904 18.133 18.133 0 01-5.346 12.904zM334.36 240.212c-13.584-13.585-35.687-13.584-49.268 0-13.584 13.584-13.584 35.686 0 49.27 6.792 6.792 15.713 10.187 24.635 10.187 8.921 0 17.843-3.395 24.634-10.187 13.583-13.584 13.583-35.686-.001-49.27zm-11.731 37.538c-7.116 7.116-18.692 7.115-25.807 0-7.115-7.116-7.115-18.692 0-25.808 3.558-3.558 8.231-5.336 12.904-5.336s9.346 1.778 12.904 5.336c7.115 7.116 7.115 18.692-.001 25.808z"/></svg>',
      },
      columns,
      modalIsOpen: false,
      switchStatus: 'нет',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
      config: {
        rules: [{ type: 'object', required: true, message: 'Введите данные!' }],
      },
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Введите данные!' }],
      },
      discountIcons: [
        Svg.discount_icon,
        Svg.discount_icon,
        Svg.discount_icon,
        Svg.discount_icon,
        Svg.discount_icon,
        Svg.discount_icon,
        Svg.discount_icon,
      ],
      activeIcon: null,
      tableRowIndex: null,
      drawerIsVisible: false,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'validate_other' });
  },

  mounted() {
    this.rowClickListener();
  },

  methods: {
    // eslint-disable-next-line consistent-return
    matchIcon(gender) {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in this.obj) {
        if (key === gender) {
          return this.obj[key];
        }
      }
    },

    showModal() {
      this.modalIsOpen = true;
    },

    chooseIcon(index) {
      this.activeIcon = index;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('DD.MM.YYYY'), rangeValue[1].format('DD.MM.YYYY')],
        };

        console.log('Received values of form: ', values);
        this.data.push({
          name: values.name,
          start: values['range-picker'][0],
          end: values['range-picker'][1],
          price_change: values.price_change,
          gender: this.activeIcon,
        });
        console.log(this.activeIcon);
        this.modalIsOpen = false;
      });
    },

    rowClickListener() {
      const tableBody = document.querySelector('.ant-table-tbody');

      tableBody.addEventListener('click', (e) => {
        const tag = e.target.tagName;

        if (tag === 'TD') {
          this.tableRowIndex = e.target.parentNode.dataset.rowKey;
          this.drawerIsVisible = true;
        }

        if (tag === 'TR') {
          this.tableRowIndex = e.target.dataset.val.rowKey;
          this.drawerIsVisible = true;
        }
      });
    },

    closeDrawer() {
      this.drawerIsVisible = false;
    },

    deleteDiscount() {
      this.closeDrawer();
      console.log(this.tableRowIndex);
      this.data.splice(this.tableRowIndex, 1);
      this.tableRowIndex = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .content-area {
    height: 100%;
  }
  .discount {
    height: 100%;

    &-list-table {
      max-width: 1200px;
    }
    &-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid transparent;
      border-radius: 10px;
      padding: 5px 0;
      transition: .3s ease;
      margin-bottom: 10px;
      &:hover {
        border: 2px solid #828282;
      }
      &.active {
        border: 2px solid #828282;
      }
    }
  }
  .fixed-width {
    max-width: 1200px;
  }

  .form {
    &-label {
      margin-bottom: 8px;
    }

    &-title {
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      margin-top: 24px;
      &:first-child {
        margin-top: 0;
      }
    }

    &-bottom {
      display: flex;
      justify-content: center;
    }
  }

  .switch {
    &-row {
      display: flex;
      align-items: center;
    }
    &-wrap {
      margin-bottom: 0;
      padding-left: 10px;
    }
  }

  .full-width {
    width: 100%;
  }

  .drawer {
    padding-top: 68px;
    &-btn {
      margin-bottom: 9px;
    }
    &-header {
      display: flex;
      align-items: center;
    }
    &-name {
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
    }
    &-icon {
      margin-right: 16px;
    }
    &-status {
      color: rgba(0, 0, 0, 0.51);
      font-size: 14px;
      line-height: 16px;
    }
    &-conditions {
      &-title {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;
      }
    }
    &-description {
      font-size: 12px;
      line-height: 170%;
      &-title {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;
      }
    }
    &-link-to {
      display: block;
      margin-top: 16px;
      text-decoration: underline;
    }
    &-discounts {
      display: flex;
      justify-content: space-between;
      &-info {
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
</style>

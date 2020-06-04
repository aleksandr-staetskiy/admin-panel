<template>
  <a-layout-sider
    style="overflow: auto; height: 100%;
  min-width: 350px; background: #fff!important;"
    class="filter-sidebar"
  >
    <div class="filter-wrap">
      <div class="filter-title">
        Найти помещения
      </div>
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <!--        city choose-->
        <a-form-item
          class="form-item"
          label="Город"
        >
          <a-select
            placeholder="Выбрать..."
            v-decorator="[
              'city',
              { rules: [{ required: true, message: 'Выбирете город!' }] },
            ]"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <!--        object choose-->
        <a-form-item
          class="form-item"
          label="Объекты"
        >
          <a-select
            placeholder="Выбрать..."
            v-decorator="[
              'object',
              { rules: [{ required: true, message: 'Выбирете объект!' }] },
            ]"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <!--        choose rooms-->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Подъезды"
            >
              <a-select
                placeholder="Выбрать..."
                v-decorator="[
                  'entrance',
                  { rules: [{ required: true, message: 'Выбирете город!' }] },
                ]"
              >
                <a-select-option value="male">
                  1
                </a-select-option>
                <a-select-option value="female">
                  2
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Этажи"
            >
              <a-select
                placeholder="Выбрать..."
                v-decorator="[
                  'floors',
                  { rules: [{ required: true, message: 'Выбирете город!' }] },
                ]"
              >
                <a-select-option value="male">
                  1
                </a-select-option>
                <a-select-option value="female">
                  2
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!--        choose rooms-->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Количество комнат"
            >
              <a-select
                placeholder="Выбрать..."
                v-decorator="[
                  'rooms_amount',
                  { rules: [{ required: true, message: 'Выбирете город!' }] },
                ]"
              >
                <a-select-option value="male">
                  1
                </a-select-option>
                <a-select-option value="female">
                  2
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Типы планировок"
            >
              <a-select
                placeholder="Выбрать..."
                v-decorator="[
                  'planirovki',
                  { rules: [{ required: true, message: 'Выбирете город!' }] },
                ]"
              >
                <a-select-option value="male">
                  1
                </a-select-option>
                <a-select-option value="female">
                  2
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <!--        choose rooms-->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Площадь от"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['ploshchad_ot', { rules: [{ required: false}] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Площадь до"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['ploshchad_do']"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <!--        choose rooms-->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Стоимость от"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['price_from']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Стоимость до"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['price_to']"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <!--        choose rooms-->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Стоимость м2 от"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['square_metre_from']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="Стоимость м2 до"
            >
              <a-input
                placeholder="Введите..."
                v-decorator="['square_metre_to']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <!--    item-->
        <a-form-item
          class="form-item"
          label="Уже назначены акции"
        >
          <a-select
            placeholder="Выбрать..."
            v-decorator="[
              'is_discount',
              { rules: [{ required: true, message: 'Выбирете город!' }] },
            ]"
          >
            <a-select-option value="male">
              1
            </a-select-option>
            <a-select-option value="female">
              2
            </a-select-option>
          </a-select>
        </a-form-item>

        <!--        item-->
        <a-form-item
          class="form-item"
          label="Номера помещений через запятую"
        >
          <a-input
            placeholder="Введите..."
            v-decorator="['rooms_number_arr', { rules:
              [{ required: true, message: 'Выбирете город!' }] }]"
          />
        </a-form-item>

        <a-button
          type="primary"
          html-type="submit"
          block
          ghost
        >
          Найти
        </a-button>
      </a-form>
      <a-divider />
      <div class="filter-title">
        Назначить акцию
      </div>
      <a-form-item
        class="form-item"
        label="Выберите акцию"
      >
        <a-select
          placeholder="Выбрать..."
          :style="{ width: '100%' }"
          v-decorator="[
            'is_discount',
            { rules: [{ required: true, message: 'Выберите акцию' }] },
          ]"
        >
          <a-select-option value="male">
            1
          </a-select-option>
          <a-select-option value="female">
            2
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-button
        type="primary"
        block
      >
        Назначить на найденные
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'AppFilter',
  components: {
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' }),
    };
  },
  computed: {
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },
  },
};
</script>


<style scoped lang="scss">
  .link {
    color: #FFFFFF;
  }

  .filter-wrap {
    display: flex;
    flex-direction: column;
    padding: 32px;
    background: #fff;
  }

  .filter-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;
    margin: 14px 0;
  }

  .title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
  }

  .info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 19px;
    margin-top: 11px;
  }
  .form-item {
    margin-bottom: 14px;
  }

  .filter-sidebar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar { width: 0; }
  }
</style>

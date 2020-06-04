<template>
  <a-layout-sider
    class="sidebar"
    style="overflow: auto; height: 100%; min-width: 350px; background: #fff"
  >
    <div class="wrap">
      <div class="title">
        ЖК «Архангельск Парк»
      </div>
      <div class="info">
        4 объекта
      </div>
      <div class="img-wrap">
        <img
          src="../assets/dashboardimg.jpg"
          alt="planirovka"
          class="img"
        >
      </div>

      <a-tabs
        default-active-key="1"
        size="large"
      >
        <a-tab-pane
          key="1"
          tab="Планы ЖК - 3"
        >
          <a-button
            block
            type="primary"
            ghost
            style="margin: 24px 0;"
            @click="addPlan"
          >
            Добавить план
          </a-button>

          <draggable
            class="plans"
            ghost-class="ghost"
            v-model="plans"
          >
            <transition-group
              type="transition"
              name="flip-list"
            >
              <div
                :id="item.id"
                v-for="(item, index) in plans"
                :key="item.id"
                class="plan sortable"
              >
                <a-input
                  v-if="inputVisible === item"
                  ref="input"
                  type="text"
                  size="small"
                  :style="{ width: '230px' }"
                  :value="inputValue"
                  @change="handleInputVal"
                  @keydown.enter="confirmChange(index)"
                />
                <div
                  v-else
                  class="plan-title"
                >
                  {{ item.title }}
                </div>
                <div
                  class="plan-trigger"
                  v-html="drag_trigger"
                />
                <div
                  class="plan-item"
                  @mouseenter="showStatus"
                  @mouseleave="hideStatus"
                >
                  <img
                    class="plan-img"
                    src="../assets/dashboardimg.jpg"
                    alt="планировка"
                  >
                  <div class="plan-status">
                    <div
                      v-if="item.empty"
                      class="plan-empty"
                    >
                      Не размечен
                    </div>
                    <div class="plan-manipulate">
                      <a-button
                        class="change-btn"
                        type="primary"
                        @click="toggleInput(item)"
                      >
                        Изменить
                      </a-button>
                      <a-button @click="deletePlan(index)">
                        Удалить
                      </a-button>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-sider>
</template>

<script>
import draggable from 'vuedraggable';
import Svg from '../Svg.js';

export default {
  name: 'AppSidebar',
  components: {
    draggable,
  },
  data() {
    return {
      drag_trigger: Svg.drag_trigger,
      inputVisible: true,
      inputValue: '',
    };
  },
  computed: {
    plans: {
      get() {
        return this.$store.state.sidebarData;
      },
      set(value) {
        this.$store.commit('SET_PLANS', value);
      },
    },
  },
  methods: {
    addPlan() {
      this.$store.commit('ADD_PLAN');
    },
    deletePlan(index) {
      this.$store.commit('DELETE_PLAN', index);
    },
    handleInputVal(e) {
      this.inputValue = e.target.value;
    },
    toggleInput(item) {
      this.inputVisible = item;
    },
    confirmChange(index) {
      this.$store.commit('RENAME_PLAN', { index, val: this.inputValue });
      this.inputVisible = false;
      this.inputValue = '';
    },
    showStatus(e) {
      const elem = e.target.querySelector('.plan-manipulate');
      const plan = e.target.querySelector('.plan-empty');
      const img = e.target.querySelector('.plan-img');

      if (plan !== null) {
        plan.style.display = 'none';
      }

      elem.style.display = 'flex';
      img.classList.add('plan-img-active');
    },
    hideStatus(e) {
      const elem = e.target.querySelector('.plan-manipulate');
      const plan = e.target.querySelector('.plan-empty');
      const img = e.target.querySelector('.plan-img');

      if (plan !== null) {
        plan.style.display = 'block';
      }

      elem.style.display = 'none';
      img.classList.remove('plan-img-active');
    },
  },
};
</script>

<style scoped lang="scss">
  .link {
    color: #FFFFFF;
  }

  .wrap {
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    padding: 32px;
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

  .subtitle {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
  }

  .img {
    &-wrap {
      width: 100%;
      height: 218px;
      margin-top: 16px;
      margin-bottom: 21px;
    }
  }

  .plans {
    padding-left: 0;
  }

  .plan {
    color: #FFFFFF;
    position: relative;
    margin-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f6f6f6;
    &-manipulate {
      display: none;
    }
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
    }
    &-trigger {
      cursor: pointer;
      position: absolute;
      top: 2px;
      right: 0;
    }
    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 280px;
      height: 100px;
      margin-top: 11px;
    }
    &-empty {
      font-size: 12px;
      padding: 12px;
      background: rgba(0, 21, 41, 0.85);
      border-radius: 3px;
    }
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      &-active {
        -webkit-filter: brightness(40%);
        filter: brightness(40%);
      }
    }
    &-status {
      position: absolute;
    }
  }

  .change-btn {
    margin-right: 16px;
  }

  .flip-list-move {
    transition: transform .5s;
  }
</style>

<template>
  <a-layout-sider
    style="overflow: auto; height: 100%; min-width: 350px; background: #fff"
    class="expanded-sidebar"
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
        size="small"
      >
        <a-tab-pane
          key="1"
          tab="Фасады"
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
        <a-tab-pane
          key="2"
          tab="Планы этажей"
        >
          <div
            v-for="(item, index) in floors"
            :key="index"
            class="upload"
          >
            <div
              v-if="item.isEmpty"
              style="margin-bottom: 16px"
            >
              <input
                class="file-input"
                type="file"
              >
              <AButton
                type="primary"
                block
                ghost
              >
                Загрузить план
              </AButton>
            </div>
            <div v-else>
              <div
                v-for="(item, index) in plans"
                :key="index"
                class="plan"
              >
                <div class="plan-title">
                  {{ item.stage }} Этаж
                </div>
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
                      v-if="item.isEmpty"
                      class="plan-empty"
                    >
                      Не размечен
                    </div>
                    <div class="plan-manipulate floor-plan-manipulator">
                      <a-button
                        class="change-btn app-sidebar-btn"
                        style="padding: 0 7px; margin-right: 5px!important;"
                        type="primary"
                      >
                        Изменить
                      </a-button>
                      <a-popover
                        trigger="click"
                        placement="right"
                        @visibleChange="handlePopoverChange"
                      >
                        <template slot="content">
                          <div class="popover">
                            <div class="popover-title">
                              Копирование планов этажей
                            </div>
                            <p class="popover-descr">
                              Укажите этажи в которые нужно скопировать
                              выбранный план. Внимание! Разметка помещений будет
                              скопированна
                              вместе с планом, но назначение номеров помещений нужно
                              производить
                              повторно для каждого скопированного плана
                            </p>
                            <div class="popover-subtitle">
                              Этажи
                            </div>
                            <div class="popover-floors">
                              <a-tag
                                v-for="(floor, index) in floors"
                                :key="floor.stage"
                                class="popover-tag"
                                :color="floor.isEmpty ? 'rgba(1,1,1,0.38)' : '#108ee9'"
                                @click="choosePlane(index)"
                              >
                                {{ floor.stage }}
                              </a-tag>
                            </div>
                            <a-divider />
                            <a-button
                              type="primary"
                              block
                            >
                              Скопировать
                            </a-button>
                          </div>
                        </template>
                        <a-button
                          class="change-btn app-sidebar-btn"
                          style="margin-right: 5px; padding: 0 7px;"
                        >
                          Копировать
                        </a-button>
                      </a-popover>
                      <a-button
                        class="app-sidebar-btn"
                        style="padding: 0 7px;"
                        @click="deleteFloor(index)"
                      >
                        Удалить
                      </a-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-sider>
</template>

<script>
import draggable from 'vuedraggable';
import Svg from '../Svg.js';

export default {
  name: 'AppSidebarExpanded',
  components: {
    draggable,
  },
  data() {
    return {
      floors: [
        { stage: '1', isEmpty: true },
        { stage: '2', isEmpty: true },
        { stage: '3', isEmpty: false },
        { stage: '4', isEmpty: false },
        { stage: '5', isEmpty: true },
        { stage: '6', isEmpty: true },
        { stage: '7', isEmpty: true },
        { stage: '8', isEmpty: true },
        { stage: '9', isEmpty: true },
        { stage: '10', isEmpty: true },
        { stage: '11', isEmpty: true },
        { stage: '12', isEmpty: true },
        { stage: '13', isEmpty: true },
        { stage: '14', isEmpty: true },
      ],
      isOpen: false,
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

      if (plan !== null && this.isOpen === false) {
        plan.classList.add('hidden');
      }

      elem.classList.add('shown');
      img.classList.add('plan-img-active');
    },
    hideStatus(e) {
      const elem = e.target.querySelector('.plan-manipulate');
      const plan = e.target.querySelector('.plan-empty');
      const img = e.target.querySelector('.plan-img');

      if (this.isOpen) {
        return;
      }

      if (plan !== null) {
        plan.classList.remove('hidden');
      }

      elem.classList.remove('shown');
      img.classList.remove('plan-img-active');
    },
    deleteFloor(index) {
      this.floors.splice(index, 1);
    },
    choosePlane(index) {
      this.floors[index].isEmpty = !this.floors[index].isEmpty;
    },
    handlePopoverChange(state) {
      this.isOpen = state;
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .popover {
    width: 332px;
    padding: 16px;
    &-title {
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 16px;
    }
    &-descr {
      font-size: 12px;
      line-height: 14px;
    }
    &-subtitle {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 8px;
    }
  }

  .popover-floors {
    display: flex;
    flex-wrap: wrap;
  }

  .popover-tag {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .hidden {
    display: none;
  }

  .shown {
    display: flex;
  }

  .file-input {
    position: relative;
  }

  .file-input {
    position: absolute;
    opacity: 0;
    z-index: 2;
  }
</style>

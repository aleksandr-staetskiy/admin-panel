<template>
  <div class="home">
    <div class="home-wrapper">
      <div class="home-intro">
        <div class="home-title">
          Добрый день!
        </div>
        <p class="home-descriptor">
          Начине работу с одного из ниже предложенных действий
        </p>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-type">
            Объекты
          </div>
          <div class="card-info">
            Всего объектов: 36
          </div>
          <div
            class="card-img-wrap"
            v-html="home_obj"
          />
          <a-button
            class="card-btn"
            type="primary"
            block
          >
            Список объектов
          </a-button>
          <a-button
            class="card-btn"
            type="link"
            block
          >
            Ошибки загрузки
          </a-button>
        </div>

        <div class="card">
          <div class="card-type">
            Акции
          </div>
          <div class="card-info">
            Всего акций: 12
          </div>
          <div
            class="card-img-wrap"
            v-html="home_promo"
          />
          <a-button
            class="card-btn"
            type="primary"
            block
          >
            Список акций
          </a-button>
          <a-button
            class="card-btn"
            type="link"
            block
            @click="createSale"
          >
            Создать акцию
          </a-button>
        </div>

        <div class="card">
          <div class="card-type">
            Настройки
          </div>
          <div class="card-info">
            Синх. в 15:34 - 13.12.2020
          </div>
          <div
            class="card-img-wrap"
            v-html="home_settings"
          />
          <a-button
            class="card-btn"
            type="primary"
            block
            @click="sync"
          >
            Синхронизация
          </a-button>
          <a-button
            class="card-btn"
            type="link"
            block
          >
            Все настройки
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Svg from '../Svg.js';

export default {
  Svg,
  name: 'Home',
  components: {
  },
  data() {
    return {
      home_obj: Svg.home_obj,
      home_promo: Svg.home_promo,
      home_settings: Svg.home_settings,
    };
  },
  methods: {
    sync() {
      console.log('sync');
    },
    createSale() {
      console.log('sale');
    },
  },
};
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #fff;
    &-wrapper {
      width: 1164px;
      margin: 0 auto;
    }
    &-intro {
      text-align: center;
    }
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
    }
    &-descriptor {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 19px;
      margin-top: 24px;
    }
  }
  .cards {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 340px;
    height: 495px;
    padding: 0px 32px;
    margin-left: 15px;
    background: #FFF;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
    border-radius: 4px;

    &-img-wrap {
      width: 212px;
      height: 212px;
      margin-bottom: 34px;
    }

    &-type {
      color: #000;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      margin-top: 48px;
      margin-bottom: 24px;
    }

    &-info {
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 32px;
    }

    &-btn {
      margin-bottom: 16px;
    }
  }
</style>

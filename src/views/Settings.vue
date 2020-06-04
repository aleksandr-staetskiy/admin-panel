<template>
  <div class="discount">
    <a-layout style="padding: 32px 24px 20px; overflow: hidden">
      <!--      content  -->
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <router-link to="/">
            Главный экран
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout-content
        class="content-area"
        :style="{ background: '#fff',
                  padding: '30px 24px 24px 24px',
                  margin: '17px 0 0 0'
        }"
      >
        <div class="container">
          <div class="wrap">
            <div class="title">
              Настройки
            </div>
            <div class="box">
              <div
                v-for="item in data"
                :key="item.title"
                class="card"
              >
                <div class="card-title">
                  {{ item.title }}
                </div>
                <p>
                  {{ item.descr }}
                </p>
                <a-button
                  type="primary"
                  block
                  ghost
                >
                  Открыть
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      data: [
        {
          title: 'Синхронизация',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales',
        },
        {
          title: 'Виджет',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales',
        },
        {
          title: 'Аккаунт',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales',
        },
        {
          title: 'Оплата',
          descr: 'Leo eu sit mattis potenti massa in pharetra amet a sapien, lorem ultricies sit ornare ut placerat mauris mattis nunc, tempus fermentum, sodales',
        },
      ],
    };
  },
  methods: {
    toHomePage() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    color: #000000;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    margin-bottom: 40px;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 712px;
  }

  .card {
    width: 340px;
    padding: 32px;
    margin-bottom: 32px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    transition: .6s ease;
    &-title {
      color: #000;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      margin-bottom: 13px;
    }
    &-descr {
      font-size: 12px;
      line-height: 170%;
    }
    &:hover {
      transform: scale(1.1);
    }
  }

  .discount {
    height: 100%;
  }
</style>

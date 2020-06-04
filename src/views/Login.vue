<template>
  <div class="login">
    <div class="login-wrap">
      <h1 class="title">
        SmCat Admin
      </h1>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <div class="login-title">
          Вход
        </div>
        <a-form-item
          class="login-item"
          label="E-mail"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'Вы ввели неверный E-mail!',
                  },
                  {
                    required: true,
                    message: 'Введите ваш email',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="Пароль">
          <a-input
            type="password"
            v-decorator="['password', { rules: [{ required: true, message: 'Введите пароль!' }] },]"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-btn login-form-button"
            :loading="isLoading"
            block
          >
            Войти
          </a-button>
          <a-divider />
          <a
            class="login-form-forgot login-link"
            href
          >Забыли пароль?</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        this.isLoading = true;
        setTimeout(() => {
          if (!err) {
            // console.log('Received values of form: ', values);
            this.$router.push('/');
          }
        }, 3000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 38px;
    line-height: 51px;
    text-align: center;
    margin-bottom: 48px;
  }
  .login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
      &-wrap {
      }
      &-form {
        width: 364px;
        background: #fff;
        padding: 32px 47px 5px;
        border-radius: 4px;
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
      }
      &-item {
        margin-bottom: 16px;
      }
      &-login-btn {
        margin-top: 15px;
      }
      &-link {
        display: block;
        text-align: center;
        text-decoration: underline;
      }
      &-title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 29px;
      }
  }
</style>

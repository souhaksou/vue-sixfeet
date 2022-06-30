<template>
  <div class="bg-light mb-3">
    <h2 class="py-5 text-center display-3 fw-bold">管理員介面</h2>
  </div>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <div class="mb-2">
          <label for="inputEmail" class="sr-only mb-3">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control mb-3"
            placeholder="Email address"
            required
            v-model="user.username"
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="sr-only mb-3">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control mb-3"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <div class="d-grid">
          <button class="btn btn-lg btn-dark mb-3" type="submit">登入</button>

          <button type="button" class="btn btn-lg btn-info" @click="toHome">回首頁</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
          this.$router.push('/dashboard/products');
        }
      });
    },
    toHome() {
      this.$router.push('/');
    },
  },
};
</script>

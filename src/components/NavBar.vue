<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-lg-top">
    <div class="container fs-4">
      <div class="d-flex align-items-center justify-content-center">
        <div class="navbar-brand logo"><h1>6ft</h1></div>
      </div>
      <div class="d-lg-none">
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item mx-3">
            <a href="#" class="nav-link" @click.prevent="logOut"
              ><i class="bi bi-person-square"></i>&ensp;登出
            </a>
          </li>
        </ul>
      </div>
      <!-- button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="clickToggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 選單 -->
      <div class="collapse navbar-collapse" id="navbarText" ref="navbar">
        <ul class="navbar-nav me-auto mb-3 mb-lg-0 text-center">
          <li class="nav-item mx-3 mt-2 mt-lg-0">
            <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          </li>
        </ul>
      </div>
      <!-- 右邊 -->
      <div class="d-none d-lg-block">
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item mx-3">
            <a href="#" class="nav-link" @click.prevent="logOut"
              ><i class="bi bi-person-square"></i>
              <span class="d-none d-lg-inline">&ensp;登出</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      navbarCollapse: {},
    };
  },
  methods: {
    logOut() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/login');
        }
      });
    },
    clickToggle() {
      this.navbarCollapse.toggle();
    },
  },
  mounted() {
    this.navbarCollapse = new Collapse(this.$refs.navbar);
  },
};
</script>

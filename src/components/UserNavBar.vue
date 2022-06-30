<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-lg-top">
    <div class="container fs-4">
      <div class="d-flex align-items-center justify-content-center">
        <router-link to="/user" class="navbar-brand logo"><h1>6ft</h1></router-link>
      </div>
      <div class="d-lg-none">
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item mx-3">
            <router-link to="/favorites" class="nav-link"
              ><i class="bi bi-bag-heart-fill"></i
            ></router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/cart" class="nav-link"><i class="bi bi-cart-fill"></i></router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/login" class="nav-link"
              ><i class="bi bi-person-square"></i>
            </router-link>
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
            <router-link to="/user" class="nav-link">首頁</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/products" class="nav-link">商品列表</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/coupons" class="nav-link">優惠券</router-link>
          </li>
        </ul>
      </div>
      <!-- 最右邊 -->
      <div class="d-none d-lg-block">
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item mx-3">
            <router-link to="/favorites" class="nav-link"
              ><i class="bi bi-bag-heart-fill"></i
              ><span class="d-none d-xl-inline">&ensp;最愛</span></router-link
            >
          </li>
          <li class="nav-item mx-3">
            <router-link to="/cart" class="nav-link"
              ><i class="bi bi-cart-fill"></i
              ><span class="d-none d-xl-inline">&ensp;購物車</span></router-link
            >
          </li>
          <li class="nav-item mx-3">
            <router-link to="/login" class="nav-link"
              ><i class="bi bi-person-square"></i>
              <span class="d-none d-xl-inline">&ensp;管理員</span>
            </router-link>
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
    clickToggle() {
      this.navbarCollapse.toggle();
    },
  },
  mounted() {
    this.navbarCollapse = new Collapse(this.$refs.navbar, { toggle: false });
  },
};
</script>

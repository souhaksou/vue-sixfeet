<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <!-- header -->
  <section class="row g-0">
    <div class="col-md-6">
      <img class="img-fluid w-100 h-100" src="../assets/images/love.jpg" alt="moon" />
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center bg-light">
      <p class="d-none d-md-block py-5 lh-lg fs-1">
        當我們愛這世界時<br />
        我們才生活在這世界裡
      </p>
    </div>
  </section>
  <!-- 我的最愛 -->
  <div class="container">
    <div v-if="favorites.length === 0" class="m-5">
      <h2 class="text-center display-5">我的最愛是空的QQ😢</h2>
    </div>
    <div v-else class="my-3 row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
      <div class="col" v-for="item in favorites" :key="item.id">
        <div class="card h-100">
          <img :src="item.imageUrl" class="card-img-top img-fluid" :alt="item.title" />
          <div class="card-body text-center d-flex justify-content-end flex-column">
            <h3 class="card-title mb-3">{{ item.title }}</h3>
            <div class="card-text border-bottom mb-3 pb-3">
              <p class="h6 text-secondary lh-base">
                原價
                <span class="text-decoration-line-through"
                  >NT${{ $filters.currency(item.origin_price) }}</span
                >
              </p>
              <p class="h5 text-dark">特價 NT${{ $filters.currency(item.price) }}</p>
              <a href="#" class="btn btn-dark d-block" @click.prevent="getProduct(item.id)">
                <i class="bi bi-info-square-fill"></i>&ensp;&ensp;查看更多資訊
              </a>
            </div>
            <div class="row row-cols-1 row-cols-md-2 gx-1">
              <div class="col mb-3 mb-lg-0">
                <a
                  href="#"
                  class="d-block btn btn-outline-dark px-1"
                  @click.prevent="addCart(item.id)"
                >
                  <i class="bi bi-cart-plus-fill"></i>&ensp;加入購物車
                </a>
              </div>
              <div class="col">
                <a
                  href="#"
                  class="d-block btn btn-outline-dark px-1"
                  @click.prevent="deleteFavorites(item)"
                >
                  <span><i class="bi bi-heartbreak-fill"></i>&ensp;我不愛它</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      favorites: [],
    };
  },
  methods: {
    // 跳轉頁面
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    // 加入購物車
    addCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(url, { data: cart }).then((res) => {
        console.log(res.data);
        this.$httpMessageState(res, '加到購物車');
        this.isLoading = false;
      });
    },
    // 取得我的最愛
    getFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    },
    // 從我的最愛中刪除
    deleteFavorites(value) {
      const checkId = value.id;
      const idNum = this.favorites.find((item) => item.id === checkId);
      this.favorites.splice(this.favorites.indexOf(idNum), 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      const res = { data: { success: true } };
      this.$httpMessageState(res, '從我的最愛移除');
      this.getFavorites();
    },
  },
  created() {
    this.getFavorites();
  },
};
</script>

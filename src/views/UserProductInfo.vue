<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <!-- header -->
  <section class="row g-0">
    <div class="col-md-6">
      <img class="img-fluid w-100 h-100" src="../assets/images/product.jpg" alt="flower" />
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center bg-secondary">
      <p class="d-none d-md-block py-5 text-light lh-lg fs-1">
        鳥兒願為一朵雲<br />
        雲兒願為一隻鳥
      </p>
    </div>
  </section>
  <!-- 商品 -->
  <section class="container my-5">
    <div class="row g-5">
      <div class="col-lg-6">
        <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
        <div class="row g-0" v-if="product.images">
          <div class="col-lg-4" v-for="item in product.images" :key="item">
            <img class="img-fluid" :src="item" :alt="其他圖片" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3 pb-3 border-bottom fw-bold">{{ product.title }}</h3>
            <div class="card-text">
              <p class="h5 mb-3 pb-3 border-bottom lh-lg">
                &ensp;&ensp;&ensp;&ensp;{{ product.content }}
              </p>
              <p class="h6 mb-3 pb-3 border-bottom lh-base">
                分類 : {{ product.category }} <br />{{ product.description }}
              </p>
            </div>
            <div class="card-text border-bottom mb-3 pb-3 row text-end">
              <div class="col-sm-6">
                <p class="h5 text-secondary lh-base">
                  原價
                  <span class="text-decoration-line-through"
                    >NT${{ $filters.currency(product.origin_price) }}</span
                  >
                </p>
              </div>
              <div class="col-sm-6">
                <p class="h4 text-dark">特價 NT${{ $filters.currency(product.price) }}</p>
              </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 gx-1">
              <div class="col mb-3 mb-md-0">
                <a
                  href="#"
                  class="d-block btn btn-outline-dark px-1"
                  @click.prevent="addCart(product.id)"
                >
                  <i class="bi bi-cart-plus-fill"></i> 加入購物車
                </a>
              </div>
              <div class="col">
                <a
                  href="#"
                  class="d-block btn btn-outline-dark px-1"
                  @click.prevent="toggleFavorites(product)"
                >
                  <span v-if="!isFavorite(product.id)"
                    ><i class="bi bi-bag-heart-fill"></i>&ensp;加入最愛</span
                  ><span v-else><i class="bi bi-heartbreak-fill"></i>&ensp;我不愛它</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      id: '',
      isLoading: false,
      favorites: [],
      favoriteId: [],
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        console.log('product', res.data);
        this.isLoading = false;
        if (res.data.success) {
          this.product = res.data.product;
        }
      });
    },
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
      console.log('favorites', this.favorites);
      this.favoriteId = [];
      this.favorites.forEach((item) => {
        this.favoriteId.push(item.id);
      });
    },
    // 切換我的最愛
    toggleFavorites(value) {
      const checkId = value.id;
      const checkFavorite = this.favorites.some((item) => item.id === checkId);
      if (!checkFavorite) {
        // 不是最愛
        this.favorites.push(value);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        const res = { data: { success: true } };
        this.$httpMessageState(res, '加入我的最愛');
      } else {
        // 是最愛
        const idNum = this.favorites.find((item) => item.id === checkId);
        this.favorites.splice(this.favorites.indexOf(idNum), 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        const res = { data: { success: true } };
        this.$httpMessageState(res, '從我的最愛移除');
      }
      this.getFavorites();
    },
    // 檢查是否最愛
    isFavorite(id) {
      return this.favoriteId.includes(id);
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
    this.getFavorites();
  },
};
</script>

<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <!-- 商品 -->
  <section class="container my-5">
    <div class="row gx-0 g-lg-5">
      <div class="col-lg-6">
        <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
        <div class="row g-0" v-if="product.images">
          <div class="col-lg-4" v-for="item in product.images" :key="item">
            <img class="img-fluid w-100" :src="item" alt="其他圖片" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <h3 class="card-title mb-3 pb-3 border-bottom fw-bold">{{ product.title }}</h3>
            <div class="card-text">
              <p class="h5 mb-3 pb-3 border-bottom lh-lg">
                &ensp;&ensp;&ensp;&ensp;{{ product.content }}
              </p>
            </div>
            <div class="card-text">
              <p class="h6 mb-3 pb-3 border-bottom lh-base">
                分類 : {{ product.category }} <br />{{ product.description }}
              </p>
            </div>
            <div class="card-text border-bottom mb-3 pb-3 row">
              <div class="col-sm-6">
                <p class="h5 text-secondary lh-base text-center text-lg-start">
                  原價
                  <span class="text-decoration-line-through"
                    >NT${{ $filters.currency(product.origin_price) }}</span
                  >
                </p>
              </div>
              <div class="col-sm-6">
                <p class="h4 text-dark text-center text-lg-end">
                  特價 NT${{ $filters.currency(product.price) }}
                </p>
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
    <div class="my-5 col-lg-8">
      <h3 class="ms-3 mb-3">購物須知</h3>
      <ol class="list-group list-group-numbered list-group-flush">
        <li class="list-group-item">
          本公司不提供產品以外的任何形式連帶保證責任，也不具備任何形式的賠償負責。
        </li>
        <li class="list-group-item">商品尺寸規格可能些許誤差率，以實際商品出貨為主。</li>
        <li class="list-group-item">本公司不提供代為處理廢棄家具服務，請自行處理。</li>
        <li class="list-group-item">
          收到商品請立即確認否有任何問題，並與服務人員接洽處理換貨事宜，避免後續爭議。
        </li>
        <li class="list-group-item">客戶使用不當損壞暇疵，非商品本身問題，恕不接受退/換貨。</li>
        <li class="list-group-item">所有客製化商品，非產品自身瑕疵不接受退/換貨。</li>
      </ol>
    </div>
  </section>
  <!-- 可能會感興趣的商品 -->
  <section class="bg-light py-5">
    <div class="container">
      <h3 class="mb-5 text-center text-lg-start">您可能會感興趣的商品</h3>
      <div class="row gy-3">
        <div class="col-lg-4" v-for="item in interests" :key="item.id">
          <div class="card border-secondary h-100">
            <img class="card-img-top img-fluid other-img" :src="item.imageUrl" :alt="item.title" />
            <h3 class="card-title mt-3 mb-0 text-center">{{ item.title }}</h3>
            <div class="card-body d-flex justify-content-end flex-column">
              <a
                href="#"
                class="btn btn-secondary d-block stretched-link"
                @click.prevent="toProduct(item.id)"
              >
                <i class="bi bi-info-square-fill"></i>&ensp;&ensp;查看更多資訊
              </a>
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
      products: [],
      id: '',
      isLoading: false,
      favorites: [],
      favoriteId: [],
      interests: [],
    };
  },
  watch: {
    $route(to, from) {
      console.log('to:', to);
      console.log('from:', from);
      if (this.$route.name === 'productInfo') {
        this.id = this.$route.params.productId;
        this.getProduct();
      }
    },
  },
  methods: {
    thislog() {
      console.log(this.$route.name);
    },
    // 取得單一產品
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
    // 取得所有產品
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      return this.$http.get(url).then((res) => {
        this.products = res.data.products;
        console.log('products:', res);
        this.isLoading = false;
      });
    },
    // 過濾並隨機選擇
    getInterests() {
      this.interests = [];
      const index = this.products.findIndex((element) => element.id === this.id);
      this.products.splice(index, 1);
      const arr = [];
      while (arr.length < 3) {
        const num = parseInt(Math.random() * (this.products.length - 1), 10);
        if (arr.indexOf(num) === -1) {
          arr.push(num);
        }
      }
      arr.forEach((element) => {
        this.interests.push(this.products[element]);
      });
      console.log(arr, this.interests);
    },
    // 跳轉商品頁面
    toProduct(id) {
      this.$router.push(`/product/${id}`);
      this.id = id;
      this.getProducts();
      this.getFavorites();
      this.getProduct();
      this.getInterests();
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProducts().then(() => {
      this.getFavorites();
      this.getProduct();
      this.getInterests();
    });
  },
};
</script>

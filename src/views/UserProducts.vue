<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <!-- header -->
  <section class="bg-light py-5">
    <h2 class="text-center">選你所愛&ensp;&ensp;/&ensp;&ensp;愛你所選</h2>
  </section>
  <!-- main -->
  <section class="container">
    <div class="row my-5">
      <!-- 選單 -->
      <div class="col-lg-3">
        <ul class="nav nav-pills flex-row flex-lg-column text-center text-lg-start fs-3">
          <li class="nav-item col" v-for="item in list" :key="item.name">
            <a
              href="#"
              class="nav-link"
              :class="{ active: item.active === category }"
              @click.prevent="showProducts(item.active)"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
      <!-- 內容 -->
      <div class="col-lg-9">
        <div class="mt-5 mt-lg-0 row row-cols-1 row-cols-sm-2 row-cols-xl-3 gy-3">
          <div class="col" v-for="item in products" :key="item.id">
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
                      :class="{ disabled: status.loadingItem === item.id }"
                    >
                      <i class="bi bi-cart-plus-fill"></i>&ensp;加入購物車
                    </a>
                  </div>
                  <div class="col">
                    <a
                      href="#"
                      class="d-block btn btn-outline-dark px-1"
                      @click.prevent="toggleFavorites(item)"
                    >
                      <span v-if="!isFavorite(item.id)"
                        ><i class="bi bi-bag-heart-fill"></i>&ensp;加入最愛</span
                      ><span v-else><i class="bi bi-heartbreak-fill"></i>&ensp;我不愛它</span>
                    </a>
                  </div>
                </div>
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
      isLoading: false,
      status: {
        loadingItem: '',
      },
      list: [
        {
          name: '全部',
          active: 'all',
        },
        {
          name: '椅',
          active: 'chair',
        },
        {
          name: '桌',
          active: 'table',
        },
        {
          name: '系列',
          active: 'series',
        },
      ],
      category: 'all',
      products: [],
      allProducts: [],
      chairProducts: [],
      tableProducts: [],
      seriesProducts: [],
      favorites: [],
      favoriteId: [],
    };
  },
  methods: {
    // 取得產品資料
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        console.log('products:', res);
        this.sortProducts(res.data.products);
        this.isLoading = false;
      });
    },
    // 產品資料排序
    sortProducts(value) {
      this.allProducts = [...value];
      const chair = value.filter((e) => e.category === '椅');
      this.chairProducts = chair;
      const table = value.filter((e) => e.category === '桌');
      this.tableProducts = table;
      const series = value.filter((e) => e.category === '系列');
      this.seriesProducts = series;
    },
    // 切換顯示產品
    showProducts(value) {
      this.category = value;
      this.isLoading = true;
      switch (value) {
        case 'all':
          this.products = this.allProducts;
          break;
        case 'chair':
          this.products = this.chairProducts;
          break;
        case 'table':
          this.products = this.tableProducts;
          break;
        case 'series':
          this.products = this.seriesProducts;
          break;
        default: {
          break;
        }
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    // 跳轉產品頁面
    getProduct(id) {
      this.$router.push(`/product/${id}`);
    },
    // 加入購物車
    addCart(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.status.loadingItem = id;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = '';
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
    this.getProducts();
    this.getFavorites();
  },
};
</script>

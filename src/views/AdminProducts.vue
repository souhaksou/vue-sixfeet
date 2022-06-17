<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="container text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">增加一個產品</button>
  </div>
  <div class="container table-responsive">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>編輯</th>
          <th>產品名稱</th>
          <th width="120" class="text-end">分類</th>
          <th width="120" class="text-end">原價</th>
          <th width="120" class="text-end">售價</th>
          <th width="100" class="text-end">狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                <i class="bi bi-pencil-square"></i
                ><span class="d-none d-md-inline">&ensp;編輯</span>
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">
                <i class="bi bi-x-square-fill"></i
                ><span class="d-none d-md-inline">&ensp;刪除</span>
              </button>
            </div>
          </td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.category }}</td>
          <td class="text-end">${{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">${{ $filters.currency(item.price) }}</td>
          <td class="text-end">
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <pagination :pages="pagination" @emit-pages="getProducts"></pagination>
  <productmodal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></productmodal>
  <delmodal :item="tempProduct" ref="delModal" @del-item="delProduct"></delmodal>
</template>

<script>
import productmodal from '../components/ProductModal.vue';
import pagination from '../components/PaginationPage.vue';
import delmodal from '../components/DelModal.vue';
// import { currency } from '../methods/filters';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: {
    productmodal,
    delmodal,
    pagination,
  },
  inject: ['emitter'],
  methods: {
    // currency,
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          console.log(res.data, res.data.pagination);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        productComponent.hideModal();
        if (httpMethod === 'post') {
          this.$httpMessageState(res, '新增');
        } else {
          this.$httpMessageState(res, '更新');
        }
        this.getProducts();
        // if (res.data.success) {
        //   this.getProducts();
        //   this.emitter.emit('push-message', {
        //     style: 'success',
        //     title: '更新成功',
        //   });
        // } else {
        //   this.emitter.emit('push-message', {
        //     style: 'danger',
        //     title: '更新失敗',
        //     content: res.data.message.join('、'),
        //   });
        // }
      });
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url).then((res) => {
        console.log(res.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.$httpMessageState(res, '刪除');
        this.getProducts();
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

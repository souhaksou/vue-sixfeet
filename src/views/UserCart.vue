<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <!-- header -->
  <section class="row g-0">
    <div class="col-md-6 d-flex justify-content-center align-items-center bg-light">
      <p class="d-none d-md-block py-5 lh-lg fs-1">趕快結帳吧！</p>
    </div>
    <div class="col-md-6">
      <img class="img-fluid w-100 h-100" src="../assets/images/cart.jpg" alt="moon" />
    </div>
  </section>
  <!-- cart -->
  <section class="container my-5">
    <div class="">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th class="text-end">
              <span v-if="cart.final_total === cart.total">單價</span>
              <span class="text-success" v-else>折扣價</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-x-circle-fill"></i
                  ><span class="d-none d-sm-inline">&ensp;刪除</span>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <!-- <div class="text-success" v-if="item.coupon">已套用優惠券</div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="item.qty"
                    :disabled="item.id === status.loadingItem"
                    @change="updateCart(item)"
                  />
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-end" :class="{ 'text-success': cart.final_total !== cart.total }">
                <span class="d-none d-sm-inline"> NT$</span
                >{{ $filters.currency(item.final_total) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">NT${{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">NT${{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <!-- 按鈕 -->
      <div class="row g-3" v-if="cart.final_total !== 0">
        <div class="col-6 col-sm-3 d-grid">
          <button type="button" class="btn btn-outline-danger align-self-center" @click="removeAll">
            <i class="bi bi-x-circle-fill"></i>&ensp;清空購物車
          </button>
        </div>
        <div class="col-6 col-sm-3 d-grid">
          <button type="button" class="btn btn-dark" @click="openModal()">去結帳</button>
        </div>
        <div class="col input-group input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode(coupon_code)"
              :class="{ disabled: cart.final_total !== cart.total }"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- formModal -->
  <orderform ref="formModal" @create-order="createOrder"></orderform>
</template>

<script>
import orderform from '../components/OrderForm.vue';

export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: '',
      },
      cart: {},
      coupon_code: '',
    };
  },
  components: {
    orderform,
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        console.log('getCart', res);
        this.cart = res.data.data;
        this.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = { product_id: item.product_id, qty: item.qty };
      this.$http.put(url, { data: cart }).then((res) => {
        console.log('updateCart', res);
        this.status.loadingItem = '';
        this.$httpMessageState(res, '修改數量');
        this.getCart();
      });
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.status.loadingItem = id;
      this.$http.delete(url).then((res) => {
        console.log('remove', res);
        this.$httpMessageState(res, '移除購物車品項');
        this.status.loadingItem = '';
        this.getCart();
      });
    },
    addCouponCode(couponCode) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.isLoading = true;
      const coupon = { code: couponCode };
      this.$http.post(url, { data: coupon }).then((res) => {
        console.log('addCoupon', res);
        this.$httpMessageState(res, '加入優惠券');
        this.getCart();
      });
    },
    removeAll() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        console.log('removeAll', res);
        this.$httpMessageState(res, '清空購物車');
        this.getCart();
      });
    },
    openModal() {
      this.$refs.formModal.showModal();
    },
    createOrder(value) {
      console.log('createOrder', value);
      this.$refs.formModal.hideModal();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = value;
      this.$http.post(url, { data: order }).then((res) => {
        console.log('createOrder', res);
        this.$httpMessageState(res, '送出訂單');
        if (res.data.success) {
          this.$router.push(`/checkout/${res.data.orderId}`);
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<template>
  <loading-overlay :active="isLoading"></loading-overlay>
  <div class="container table-responsive">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>編輯</th>
          <th>付款狀況</th>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買內容</th>
          <th class="text-end">總金額</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                  <i class="bi bi-pencil-square"></i
                  ><span class="d-none d-md-inline">&ensp;檢視</span>
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openDelOrderModal(item)">
                  <i class="bi bi-eye-fill"></i><span class="d-none d-md-inline">&ensp;刪除</span>
                </button>
              </div>
            </td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-end">NT${{ item.total }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal :order="tempOrder" ref="orderModal" @update-paid="updatePaid"></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationPage.vue';
import OrderModal from '@/components/OrderModal.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1,
    };
  },
  components: {
    Pagination,
    DelModal,
    OrderModal,
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
        this.isLoading = false;
        console.log(res);
      });
    },
    openModal(isNew, item) {
      this.tempOrder = { ...item };
      this.isNew = false;
      const orderComponent = this.$refs.orderModal;
      orderComponent.showModal();
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    updatePaid(item) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(api, { data: paid }).then((res) => {
        this.isLoading = false;
        this.getOrders(this.currentPage);
        this.$httpMessageState(res, '更新付款狀態');
      });
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        console.log(res);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getOrders(this.currentPage);
        this.$httpMessageState(res, '刪除訂單');
      });
    },
  },
  created() {
    this.getOrders();
    console.log(process.env.VUE_APP_API);
  },
};
</script>

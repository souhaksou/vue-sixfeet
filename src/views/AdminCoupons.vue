<template>
  <div>
    <loading-overlay :active="isLoading"></loading-overlay>
    <div class="container text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <div class="container table-responsive">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>編輯</th>
            <th>名稱</th>
            <th class="text-end">折扣%</th>
            <th class="text-end">到期日</th>
            <th class="text-end">狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal(false, item)"
                >
                  <i class="bi bi-pencil-square"></i
                  ><span class="d-none d-md-inline">&ensp;編輯</span>
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openDelCouponModal(item)">
                  <i class="bi bi-x-square-fill"></i
                  ><span class="d-none d-md-inline">&ensp;刪除</span>
                </button>
              </div>
            </td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.percent }}%</td>
            <td class="text-end">{{ $filters.date(item.due_date) }}</td>
            <td class="text-end">
              <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import CouponModal from '@/components/CouponModal.vue';

export default {
  components: { CouponModal, DelModal },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    getCoupons() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons;
        this.isLoading = false;
        console.log(res);
      });
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          console.log(res, tempCoupon);
          this.$httpMessageState(res, '新增優惠券');
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          console.log(res);
          this.$httpMessageState(res, '新增優惠券');
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      }
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        console.log(res, this.tempCoupon);
        this.$httpMessageState(res, '刪除優惠券');
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

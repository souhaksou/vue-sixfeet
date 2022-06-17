<template>
  <!-- coupon -->
  <section>
    <div class="row gx-0">
      <div class="d-none d-xl-block col-xl-3">
        <img class="img-fluid h-100" src="../assets/images/couponBox.jpg" alt="box" />
      </div>
      <div class="col-xl-9 bg-light p-5">
        <h2 class="text-center fs-1 mb-3">
          <i class="bi bi-star"></i>&ensp;人人有獎！！&ensp;<i class="bi bi-star"></i>
        </h2>
        <div class="row gx-5 gy-3 mt-lg-5">
          <div class="col-lg-6">
            <p class="fs-2 mb-3 mb-lg-5">
              {{ `今天日期是 ${time.year} 年 ${time.month} 月 ${time.date} 日` }}
            </p>
            <p class="fs-3 lh-lg">
              狂賀！本店自2022年3月1日開幕，至今有{{
                time.month - 3
              }}個月，為了感謝各位客人的捧場，現在只要購物就能參加抽出折價的機會，請點以下按鈕抽出優惠券，結帳時可享折扣！
            </p>
            <div>
              <button
                type="button"
                @click="randomNum"
                class="btn btn-dark"
                :class="{ disabled: isClicked }"
              >
                按我
              </button>
            </div>
          </div>
          <div class="col-lg-6 d-flex justify-content-center align-items-center">
            <!-- <p class="display-6">今天的優惠券是什麼呢？</p> -->
            <div class="card h-100">
              <div class="card-body">
                <h3 class="card-title mb-3">優惠券</h3>
                <p class="card-text h4">
                  <span class="text-danger" v-if="!isClicked">優惠碼是多少呢?</span>
                  <span class="text-success" v-else>{{ couponCode }}</span>
                </p>
              </div>
              <img src="../assets/images/question.jpg" class="img-fluid card-img-bottom" alt="?" />
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
      isClicked: false,
      time: {},
      coupon: ['88', ' 87', ' 85', '80', '77'],
      couponCode: '',
      num: 10,
    };
  },
  methods: {
    randomNum() {
      this.num = Math.floor(Math.random() * 5);
      this.couponCode = `${this.coupon[this.num]}percent`;
      this.isClicked = true;
    },
    getTime() {
      const Today = new Date();
      this.time = { year: Today.getFullYear(), month: Today.getMonth() + 1, date: Today.getDate() };
    },
  },
  created() {
    this.getTime();
  },
};
</script>

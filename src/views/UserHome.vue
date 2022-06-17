<template>
  <!-- header -->
  <header class="d-flex justify-content-center align-items-center home-background">
    <figure class="home-header-text p-5 rounded-5">
      <blockquote class="blockquote">
        <p class="fs-1 fw-bolder">放慢自己的腳步，用心體會生活的一切</p>
      </blockquote>
      <figcaption class="fs-3 blockquote-footer text-end">sixfeet</figcaption>
    </figure>
  </header>
  <!-- card -->
  <section class="container my-5">
    <div class="row py-5 gy-5 px-5 px-sm-0 row-cols-1 row-cols-sm-2 row-cols-lg-3">
      <div v-for="item in card" :key="item.title" class="col">
        <div class="card shadow rounded-5 h-100">
          <div class="d-flex justify-content-center py-4">
            <i class="bi display-1 text-primary home-icon stretched-link" :class="item.icon"></i>
          </div>
          <div class="card-body px-5">
            <h3 class="card-title text-center text-warning">{{ item.title }}</h3>
            <p class="card-text h5 my-4 lh-base">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 簡介 -->
  <section class="row flex-lg-row-reverse g-0">
    <div class="col-lg-6">
      <img class="img-fluid h-100" src="../assets/images/boss.jpg" alt="boss" />
    </div>
    <div
      class="col-lg-6 py-4 bg-light d-flex flex-column justify-content-center align-items-center"
    >
      <p class="fs-1 mb-3 mb-lg-5">sixfeet&ensp;六腳家具</p>
      <p class="fs-3 border-top border-3 border-dark mx-5 p-3 pb-lg-5 lh-lg">
        &ensp;&ensp;&ensp;&ensp;sixfeet&ensp;六腳家具的座右銘是&ensp;&ensp;"Choose your love and
        love your choice."
        <br />&ensp;&ensp;&ensp;&ensp;六腳家具帶您打造風格居家，挑選最適合的家具，沐浴在您所選所愛的家具裡，幸福洋溢每一天！
      </p>
    </div>
  </section>
  <!-- 最新消息 -->
  <section class="container py-3 animate__animated animate__backInLeft">
    <p class="h3 text-center py-3">最新消息</p>
    <ul class="list-group list-group-flush px-0 px-lg-5">
      <li
        v-for="item in information"
        :key="item.date"
        class="list-group-item h5 py-3 d-flex flex-column flex-lg-row"
      >
        <div class="mb-3 mb-lg-0 px-0 px-lg-5 text-dark">{{ item.date }}</div>
        <div class="text-truncate">{{ item.text }}</div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      information: [
        {
          date: '2022/05/27',
          text: '結帳時出示優惠碼可享折扣',
        },
        {
          date: '2022/04/08',
          text: '總金額超過16888元即享88折優惠，一路發發發！',
        },
        {
          date: '2022/03/15',
          text: '只要購物金額超過888元就免運，祝大家發發發',
        },
        {
          date: '2022/02/10',
          text: 'sixfeet 電商即將上線！',
        },
        {
          date: '2022/01/01',
          text: 'sixfeet 開始籌備！',
        },
      ],
      card: [
        {
          icon: 'bi-check-circle-fill',
          title: '最好的服務',
          text: 'sixfeet非常重視使用者需求，以人為本，並考量實務的可行性提供最好的建議與服務。',
        },
        {
          icon: 'bi-bullseye',
          title: '精準的眼光',
          text: 'sixfeet設身處地替客戶著想，依照客戶需求挑選最適合的家具。精準的眼光就是我們的特色。',
        },
        {
          icon: 'bi-heart-fill',
          title: '滿滿的熱忱',
          text: 'sixfeet從設計的角度出發，不僅有專業能力，更對生活充滿熱忱，定能有求必應，使命必達。',
        },
      ],
    };
  },
};
</script>

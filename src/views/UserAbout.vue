<template>
  <!-- 用過的都說讚 -->
  <section class="row gx-0">
    <div class="col-lg-6">
      <img class="img-fluid w-100" src="../assets/images/thumb.png" alt="用過的都說讚" />
    </div>
    <div class="col-lg-6 position-relative d-flex justify-content-center">
      <img class="img-fluid w-100" src="../assets/images/thumbtext.png" alt="用過的都說讚" />
      <div class="position-absolute mt-5">
        <p class="text-center display-5 text-light lh-lg pt-3 pt-lg-0">
          用過的都說讚！<br />（六腳家具）
        </p>
      </div>
    </div>
  </section>
  <!-- 介紹 -->
  <section class="container mt-5">
    <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
      <div class="pe-5">
        <img class="img-fluid" src="../assets/images/logo.svg" alt="logo" style="height: 50px" />
      </div>
      <h2 class="display-3">關於我們</h2>
    </div>
    <div class="row gx-0 gy-3 g-lg-5 mt-1">
      <div class="col-lg-6">
        <p class="h3 lh-lg">
          &ensp;&ensp;&ensp;&ensp;sixfeet&ensp;六腳家具是成立於 2022
          年的家具品牌，團隊成員包含家具設計、產品設計、室內設計等各領域的專業設計師，透過「設計思考」來滿足使用者需求，
          協助客戶挑選與搭配風格家具。<br />
          &ensp;&ensp;&ensp;&ensp;六腳家具希望發揚臺灣在地的創意與工藝，把臺灣本土具代表性的元素融入設計，
          期盼能陪伴使用者度過靜好的歲月。
        </p>
      </div>
      <div class="col-lg-6">
        <img class="img-fluid h-100" src="../assets/images/member.jpg" alt="member" />
      </div>
    </div>
  </section>
  <!-- 使用者心得 -->
  <section class="bg-light py-5">
    <div
      id="carouselExampleCaptions"
      class="carousel carousel-dark slide"
      data-bs-ride="carousel"
      ref="carousel"
    >
      <div class="carousel-inner container text-center">
        <div class="carousel-item customer active">
          <div class="row flex-column flex-lg-row h-100">
            <div class="col position-relative">
              <img
                src="../assets/images/user1.jpg"
                class="d-block position-absolute top-50 start-50 translate-middle rounded-circle"
                alt="user1"
              />
            </div>
            <div class="col d-flex flex-column justify-content-evenly">
              <p class="px-5 h2 lh-base mb-0 text-start">
                &ensp;&ensp;&ensp;&ensp;謝謝六腳幫助我挑選孩子們的家具，自從用了他們的家具，我小孩每次考試都考一百分呢！
              </p>
              <figcaption class="px-5 blockquote-footer text-end">
                <span class="h3">來自臺北的王女士</span>
              </figcaption>
            </div>
          </div>
        </div>
        <div class="carousel-item customer">
          <div class="row flex-column flex-lg-row h-100">
            <div class="col position-relative">
              <img
                src="../assets/images/user2.jpg"
                class="d-block position-absolute top-50 start-50 translate-middle rounded-circle"
                alt="user1"
              />
            </div>
            <div class="col d-flex flex-column justify-content-evenly">
              <p class="px-5 h2 lh-base mb-0 text-start">
                &ensp;&ensp;May my love surround you like sunshine and give you glorious freedom.
              </p>
              <figcaption class="px-5 blockquote-footer text-end">
                <span class="h3">來自海外的約翰史密斯</span>
              </figcaption>
            </div>
          </div>
        </div>
        <div class="carousel-item customer">
          <div class="row flex-column flex-lg-row h-100">
            <div class="col position-relative">
              <img
                src="../assets/images/user3.jpg"
                class="d-block position-absolute top-50 start-50 translate-middle rounded-circle"
                alt="user1"
              />
            </div>
            <div class="col d-flex flex-column justify-content-evenly">
              <p class="px-5 h2 lh-base mb-0 text-center">
                山頂一個白狗兄 我是牧場的少爺<br />
                透早到晚真打拼 牧場開闊歸山坪
              </p>
              <figcaption class="px-5 blockquote-footer text-end">
                <span class="h3">來自山頂的白狗兄</span>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  data() {
    return {
      aboutCarousel: {},
    };
  },
  mounted() {
    this.aboutCarousel = new Carousel(this.$refs.carousel);
  },
};
</script>

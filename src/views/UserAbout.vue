<template>
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
  <section class="bg-light py-3 py-lg-5">
    <h2 class="container mb-3 mb-lg-4 fw-bold">顧客心得</h2>
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
                <span class="h3">約翰史密斯先生</span>
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
              <p class="px-5 h2 lh-base mb-0 text-start">
                &ensp;&ensp;&ensp;&ensp;六腳的家具不僅外觀優美，而且非常舒服，尤其是這他們的沙發，我們家的狗狗小黑很喜歡，謝謝六腳家具！
              </p>
              <figcaption class="px-5 blockquote-footer text-end">
                <span class="h3">中部的林家兄妹</span>
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
  <!-- 家具小教室 -->
  <section class="container py-3 py-lg-5">
    <h2 class="fw-bold mb-3 mb-lg-4">家具小教室</h2>
    <div class="row g-3 gx-lg-5">
      <div class="col-lg-6">
        <img class="img-fluid h-100" :src="knowledge.imgUrl" :alt="knowledge.title" />
      </div>
      <div class="col-lg-6 d-flex flex-column justify-content-between">
        <p class="h4 lh-lg my-3">
          {{ knowledge.text }}
        </p>
        <div class="text-center">
          <button type="button" class="btn btn-outline-dark btn-lg" @click="readKnowledge()">
            看下一則小知識
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel';

export default {
  data() {
    return {
      aboutCarousel: {},
      num: 0,
      knowledge: {
        title: '',
        imgUrl: '',
        text: '',
      },
      knowledges: [
        {
          title: '知識1',
          imgUrl: 'https://upload.cc/i1/2022/07/11/JDhdQC.jpg',
          text: '家具是日常生活和社會活動中為起居，或工作方便而配備的用具，傳統的家具都是獨立於房屋主體結構之外可以移動的，現代很多家具已成為建築的一個組成部分。',
        },
        {
          title: '知識2',
          imgUrl: 'https://upload.cc/i1/2022/07/11/JKsZ2X.jpg',
          text: '家具按設計風格可分為：現代家具、中式古典家具、歐式古典家具、美式家具、在地家具（指當地生產的家具，並使用當地材料和技術）等。',
        },
        {
          title: '知識3',
          imgUrl: 'https://upload.cc/i1/2022/07/11/6yo1Qc.jpg',
          text: '家具設計是藝術和技術的結合，反映了當代產品設計的發展，偏重於藝術。設計師會和製造商共同合作來完成設計，家具設計是經過兩者的共同努力完成良好的家具。',
        },
        {
          title: '知識4',
          imgUrl: 'https://upload.cc/i1/2022/07/11/DNwSgO.jpg',
          text: '家具按所用材料可分為：實木家具、板木結合家具、板式家具、鋼木家具、複合板式家具、石材家具、軟體家具、藤編家具、竹編家具、和其他人造材材料家具（如玻璃、不鏽鋼、塑膠等）。',
        },
      ],
    };
  },
  methods: {
    readKnowledge() {
      this.num += 1;
      if (this.num > 3) {
        this.num = 0;
      }
      this.knowledge.title = this.knowledges[this.num].title;
      this.knowledge.imgUrl = this.knowledges[this.num].imgUrl;
      this.knowledge.text = this.knowledges[this.num].text;
    },
  },
  created() {
    this.knowledge.title = this.knowledges[this.num].title;
    this.knowledge.imgUrl = this.knowledges[this.num].imgUrl;
    this.knowledge.text = this.knowledges[this.num].text;
  },
  mounted() {
    this.aboutCarousel = new Carousel(this.$refs.carousel);
  },
};
</script>

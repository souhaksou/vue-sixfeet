<template>
  <footer class="bg-info py-4">
    <div class="container">
      <div class="row gx-0 mx-3">
        <div class="col-md-6 col-lg-4 d-flex justify-content-between flex-column mb-3 mb-lg-0">
          <div class="mb-3 text-center text-lg-start">
            <a href="https://www.instagram.com/" target="_blank" class="me-5 link-dark"
              ><i class="fs-3 bi bi-instagram"></i
            ></a>
            <a href="https://www.facebook.com/" target="_blank" class="me-5 link-dark"
              ><i class="fs-3 bi bi-facebook"></i
            ></a>
            <a href="https://line.me/zh-hant/" target="_blank" class="link-dark"
              ><i class="fs-3 bi bi-line"></i
            ></a>
          </div>
          <p class="mb-0 text-dark">圖片僅供個人學習使用，無商業用途</p>
        </div>
        <div class="col-md-6 col-lg-4 fs-5 d-flex justify-content-between flex-column mb-3 mb-lg-0">
          <div class="mb-3">
            <a href="mailto:sixfeet@mail.com.tw" target="_blank" class="link-warning"
              ><i class="bi bi-envelope-fill"></i
              ><span class="fst-normal">&ensp;&ensp;信箱&ensp;sixfeet@mail.com.tw</span></a
            >
          </div>
          <div>
            <a href="tel:+886-1-2345678" target="_blank" class="link-warning"
              ><i class="bi bi-telephone-fill"></i
              ><span class="fst-normal">&ensp;&ensp;電話&ensp;0912345678</span></a
            >
          </div>
        </div>
        <div class="col-lg-4 d-flex justify-content-between align-items-center">
          <div class="ms-3 ms-lg-5">
            <router-link to="/login" class="fs-4 link-dark"
              ><i class="bi bi-person-square"></i>
            </router-link>
          </div>
          <p class="text-end mb-0 text-dark lh-lg h5">
            Copyright © 2022 sixfeet.<br />
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

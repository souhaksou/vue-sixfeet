<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <!-- 新增產品和關閉 -->
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>填寫資料</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 表單內容 -->
          <div class="row justify-content-center">
            <Form class="col-md-6" v-slot="{ errors }" @submit="$emit('create-order', form)">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="form.user.email"
                ></Field>
                <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <Field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  rules="required"
                  v-model="form.user.name"
                ></Field>
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <Field
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                  rules="required"
                  v-model="form.user.tel"
                ></Field>
                <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <Field
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                  rules="required"
                  v-model="form.user.address"
                ></Field>
                <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">留言</label>
                <textarea
                  name=""
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="3"
                  v-model="form.message"
                ></textarea>
              </div>

              <div class="text-end">
                <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">
                  取消</button
                ><button class="btn btn-danger">送出訂單</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {},
  mixins: [modalMixin],
};
</script>

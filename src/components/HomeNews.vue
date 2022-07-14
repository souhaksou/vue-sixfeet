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
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <!-- 新增產品和關閉 -->
        <div class="modal-header bg-secondary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ news.date }}
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
          <div class="p-3 py-lg-5">
            <p class="h4 lh-lg">{{ news.news }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  props: ['news'],
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

<template>
  <navbar></navbar>
  <div class="container-fluid mt-3 position-relative">
    <toastmessages></toastmessages>
    <router-view />
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import toastmessages from '@/components/ToastMessages.vue';
import navbar from '../components/NavBar.vue';

export default {
  components: {
    navbar,
    toastmessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      // console.log(res);
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>

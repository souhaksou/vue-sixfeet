<template>
  <div class="position-relative">
    <usernavbar></usernavbar>
    <div class="fixed-top">
      <toastmessages></toastmessages>
    </div>
    <router-view />
    <userfooter></userfooter>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import toastmessages from '@/components/ToastMessages.vue';
import usernavbar from '../components/UserNavBar.vue';
import userfooter from '../components/FooterPage.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    usernavbar,
    userfooter,
    toastmessages,
  },
};
</script>

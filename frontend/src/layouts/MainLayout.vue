<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-white text-blue-grey-7 shadow-3">
      <q-toolbar class="container layout__toolbar" style="min-height: 60px">
        <div class="layout__logo" @click="goToMainPage">
          <CommonLogo style="margin-top: 6px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-app-background--light">
      <router-view class="container" style="padding-top: 38px" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import CommonLogo from 'components/common/CommonLogo.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CommonLogo,
  },

  setup() {
    const router = useRouter();

    function goToMainPage() {
      void router.push('/');
    }

    return {
      goToMainPage,
    };
  },
});
</script>

<style lang="scss">
.layout__toolbar {
  justify-content: space-between;
  gap: 16px;
  @media screen and (max-width: 1000px) {
    flex-grow: 1;
  }
}
.layout__logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  flex-grow: 1;
}
.search-menu {
  position: absolute;
  top: 58px;
  left: -75px;
  right: 0;
  bottom: 0;
  height: 300px;
  width: 375px;
  background: white;
  overflow-y: scroll;
}
</style>

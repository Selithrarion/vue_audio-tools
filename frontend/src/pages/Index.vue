<template>
  <q-page class="row gap-4 q-px-md no-wrap">
    <div class="feed"></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.feed {
  display: flex;
  flex-flow: column;
  gap: 32px;
  flex-grow: 1;
  max-width: 655px;
}
</style>

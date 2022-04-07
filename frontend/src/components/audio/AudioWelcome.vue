<template>
  <div class="column items-center w-full gap-4 q-pt-xl">
    <div class="text-h3 text-weight-bold">Audio Tools</div>
    <div class="text-subtitle2 q-mb-lg">Cut track, change volume, change bitrate online</div>

    <CommonUploader accept="audio/*" @set-file="$emit('set-audio', $event)" @set-file-duration="$emit('set-audio-duration', $event)">
      <BaseButton style="width: 250px" color="primary" label="Open file" size="18px" unelevated />
    </CommonUploader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonUploader from 'components/common/CommonUploader.vue';

export default defineComponent({
  name: 'AudioWelcome',

  components: {
    CommonUploader,
  },

  emits: ['set-audio', 'set-audio-duration'],

  setup() {
    return {};
  },
});
</script>

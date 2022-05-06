<template>
  <q-page class="row gap-4 no-wrap">
    <AudioWelcome v-if="!rawAudio" @set-audio="rawAudio = $event" @set-audio-duration="rawAudioDuration = $event" />
    <AudioEditor v-else :raw-audio="rawAudio" :raw-audio-duration="rawAudioDuration" @close="close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import AudioWelcome from 'components/audio/AudioWelcome.vue';
import AudioEditor from 'components/audio/AudioEditor.vue';

export default defineComponent({
  name: 'Index',

  components: {
    AudioEditor,
    AudioWelcome,
  },

  setup() {
    const rawAudio = ref<File | null>(null);
    const rawAudioDuration = ref(0);

    function close() {
      rawAudio.value = null;
      rawAudioDuration.value = 0;
    }

    return {
      rawAudio,
      rawAudioDuration,

      close,
    };
  },
});
</script>

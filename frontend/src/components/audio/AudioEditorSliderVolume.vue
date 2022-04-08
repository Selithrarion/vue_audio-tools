<template>
  <AudioEditorSlider :model-value="modelValue" @update:model-value="$emit('update:model-value', $event)">
    <template #append>
      <q-icon v-if="modelValue >= 60" name="volume_up" />
      <q-icon v-else-if="modelValue > 0" name="volume_down" />
      <q-icon v-else name="volume_off" />
    </template>
  </AudioEditorSlider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AudioEditorSlider from 'components/audio/AudioEditorSlider.vue';

export default defineComponent({
  name: 'AudioEditorSliderVolume',

  components: { AudioEditorSlider },

  props: {
    modelValue: {
      type: Number,
      default: 50,
    },
  },

  emits: ['update:model-value'],

  setup() {
    return {};
  },
});
</script>

<template>
  <div class="flex items-center gap-2">
    <div v-if="label" style="width: 120px">
      {{ label }}
    </div>
    <q-item class="row gap-3 items-center" style="width: 200px">
      <q-item-section>
        <q-slider
          :model-value="modelValue"
          :min="0"
          :max="100"
          label
          switch-label-side
          @update:model-value="$emit('update:model-value', $event)"
        />
      </q-item-section>
      <q-item-section class="no-padding" side>
        <q-icon v-if="modelValue >= 60" name="volume_up" />
        <q-icon v-else-if="modelValue > 0" name="volume_down" />
        <q-icon v-else name="volume_off" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AudioEditorVolume',

  props: {
    modelValue: {
      type: Number,
      default: 50,
    },
    label: {
      type: String,
      default: null,
    },
  },

  emits: ['update:model-value'],

  setup() {
    return {};
  },
});
</script>

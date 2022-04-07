<template>
  <div class="column w-full">
    <div class="action-tabs flex-center gap-4 shadow-1">
      <BaseButton
        v-for="action in actions"
        :key="action.key"
        :class="{ 'shadow-14': selectedAction === action.key }"
        :color="selectedAction === action.key ? 'primary' : 'blue-grey-7'"
        :tooltip="action.tooltip"
        :flat="selectedAction !== action.key"
        @click="selectedAction = action.key"
      >
        <q-icon :name="action.icon" size="18px" />
      </BaseButton>
    </div>

    <div class="waveform-wrapper">
      <div id="waveform" class="waveform" />
    </div>

    <div class="bottom-section flex-center column gap-8 q-py-xl shadow-1">
      <BaseButton
        class="shadow-14"
        color="primary"
        size="20px"
        padding="sm xl"
        unelevated
        @click="wavesurfer.playPause()"
      >
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
          <q-icon v-if="wavesurfer.isPlaying()" class="play-icon" name="pause" />
          <q-icon v-else class="play-icon" name="play_arrow" />
        </transition>
      </BaseButton>

      <div>
        <AudioEditorVolume :model-value="volume" label="Browser volume" @update:model-value="setVolume" />
        <AudioEditorVolume v-model="exportVolume" label="Export volume" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';

import AudioEditorVolume from 'components/audio/AudioEditorVolume.vue';

import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

export default defineComponent({
  name: 'AudioEditor',
  components: { AudioEditorVolume },
  props: {
    rawAudio: {
      type: File,
      default: null,
    },
    rawAudioDuration: {
      type: Number,
      default: null,
    },
  },

  setup(props) {
    const wavesurfer = ref<WaveSurfer | null>(null);

    const volume = ref(10);
    const exportVolume = ref(100);
    function setVolume(v = 10) {
      volume.value = v;
      wavesurfer.value?.setVolume(volume.value / 100);
    }

    onMounted(() => {
      wavesurfer.value = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgb(207,217,237)',
        progressColor: '#0d91c5',
        normalize: true,
        // barRadius: 50,
        // barGap: 50,
        // barHeight: 50,
        plugins: [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          Regions.create(),
        ],
      });
      wavesurfer.value?.loadBlob(props.rawAudio);
      setVolume()

      wavesurfer.value.on('ready', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        wavesurfer.value?.addRegion({
          end: props.rawAudioDuration,
          loop: true,
        });
      });
      wavesurfer.value.on('region-update-end', updateExportRegion);

      addEventListener('keydown', handleKeyPress);
    });
    onBeforeUnmount(() => {
      removeEventListener('keydown', handleKeyPress);
    });
    function handleKeyPress($event: KeyboardEvent) {
      const code = $event.code;
      if (code === 'Space') {
        void wavesurfer.value?.playPause();
        $event.preventDefault();
      } else if (code === 'ArrowLeft') {
        wavesurfer.value?.skipBackward(3);
        $event.preventDefault();
      } else if (code === 'ArrowRight') {
        wavesurfer.value?.skipForward(3);
        $event.preventDefault();
      }
    }

    const region = ref([0, props.rawAudioDuration]);
    function updateExportRegion(updatedRegion: { start: number; end: number }) {
      region.value = [updatedRegion.start, updatedRegion.end];
    }

    const actions = [
      {
        tooltip: 'Cut',
        key: 'cut',
        icon: 'content_cut',
      },
      {
        tooltip: 'Speed',
        key: 'speed',
        icon: 'speed',
      },
      {
        tooltip: 'Pitch',
        key: 'pitch',
        icon: 'graphic_eq',
      },
      {
        tooltip: 'Equalizer',
        key: 'equalizer',
        icon: 'equalizer',
      },
    ];
    const selectedAction = ref('cut');

    return {
      wavesurfer,
      volume,
      exportVolume,
      setVolume,

      region,

      actions,
      selectedAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.waveform-wrapper {
  padding: 64px 32px;
  background: #d4dded2e;

  ::v-deep .wavesurfer-region {
    background-color: #23c1ff33 !important;
    border-radius: 12px !important;
    box-shadow: rgb(210 245 255) 0 0 32px 7px, #537c7aad 0 0 0 10000px;
  }
  ::v-deep .wavesurfer-handle {
    background-color: #23c1ff !important;
    width: 16px !important;
  }
  ::v-deep .wavesurfer-handle-start {
    border-radius: 12px 0 0 12px !important;
  }
  ::v-deep .wavesurfer-handle-end {
    border-radius: 0 12px 12px 0 !important;
  }
}

.action-tabs {
  padding: 32px 16px;
}

.bottom-section {
  padding-left: 32px;
  padding-right: 32px;
}

.play-icon {
  --animate-duration: 50ms;
}
</style>

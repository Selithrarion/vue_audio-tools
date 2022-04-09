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

      <div v-if="selectedAction === 'volume'">
        <AudioEditorSliderVolume :model-value="volume" label="Browser volume" @update:model-value="setVolume" />
        <AudioEditorSliderVolume v-model="exportedVolume" label="Export volume" />
      </div>
      <div v-else-if="selectedAction === 'speed'">
        <AudioEditorSlider
          :model-value="speed"
          label="Speed"
          :label-value="speed / 100"
          :min="10"
          :max="300"
          :step="10"
          @update:model-value="setSpeed"
        />
      </div>
      <div v-else-if="selectedAction === 'bitrate'">
        <AudioEditorSlider v-model="bitrate" label="Export bitrate" :min="16" :max="320" />
      </div>

      <BaseButton class="shadow-14" label="Export" color="primary" padding="sm xl" unelevated @click="exportAudio" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';

import AudioEditorSliderVolume from 'components/audio/AudioEditorSliderVolume.vue';

import WaveSurfer from 'wavesurfer.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import audioEncoder from 'audio-encoder';
import AudioEditorSlider from 'components/audio/AudioEditorSlider.vue';

export default defineComponent({
  name: 'AudioEditor',

  components: {
    AudioEditorSlider,
    AudioEditorSliderVolume,
  },

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
    const exportedVolume = ref(100);
    function setVolume(v = 10) {
      volume.value = v;
      wavesurfer.value?.setVolume(volume.value / 100);
    }

    const speed = ref(100);
    function setSpeed(v: number) {
      speed.value = v;
      wavesurfer.value?.setPlaybackRate(speed.value / 100);
    }

    // TODO: set current audio bitrate and limit slider max?
    // didn't found how to get bitrate in js, only duration, size and samplerate
    const bitrate = ref(192);

    onMounted(() => {
      wavesurfer.value = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'rgb(207,217,237)',
        progressColor: '#60A5FA',
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
      setVolume();

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
      console.log(updatedRegion);
      region.value = [updatedRegion.start, updatedRegion.end];
    }

    function exportAudio() {
      try {
        // TODO: fix err https://github.com/zhuker/lamejs/issues/86

        const audioContext = new AudioContext();
        // const buffer = await new Response(props.rawAudio).arrayBuffer();
        //
        // const decodedData = await audioContext.decodeAudioData(buffer);
        // console.log('decodedData', decodedData);

        const length = 44100; // one second @ 44.1KHz
        const audioBuffer = audioContext.createBuffer(1, length, 44100);
        const channelData = audioBuffer.getChannelData(0);

        // fill some audio
        for (let i = 0; i < length; i++) {
          channelData[i] = Math.sin(i * 0.03);
        }

        // convert as mp3 and save file using file-saver
        audioEncoder(audioBuffer, 128, null, (blob) => {
          const url = URL.createObjectURL(blob);
          console.log('MP3 URl: ', url);
        });

        // const mp3Encoder = new Mp3Encoder(decodedData.numberOfChannels, decodedData.sampleRate, 128);
        // const mp3Data: string[] = [];
        //
        // console.log(mp3Encoder);
        //
        // const left = new Int16Array(44100); //one second of silence (get your data from the source you have)
        // const right = new Int16Array(44100); //one second of silence (get your data from the source you have)
        // const samples = new Int16Array(44100); //one second of silence (get your data from the source you have)
        // const sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier
        //
        // for (let i = 0; i < samples.length; i += sampleBlockSize) {
        //   const leftChunk = left.subarray(i, i + sampleBlockSize);
        //   const rightChunk = right.subarray(i, i + sampleBlockSize);
        //   const encoded = mp3Encoder.encodeBuffer(leftChunk, rightChunk);
        //   if (encoded.length > 0) {
        //     mp3Data.push(encoded);
        //   }
        // }
        // const mp3 = mp3Encoder.flush();
        // if (mp3.length > 0) {
        //   mp3Data.push(mp3);
        // }
        //
        // console.log('mp3Data', mp3Data);
        //
        // const blob = new Blob(mp3Data, { type: 'audio/mp3' });
        // console.log('blob', blob);
        // const url = URL.createObjectURL(blob);
        // console.log('MP3 URl: ', url);
      } catch (e) {
        console.error(e);
      }
    }

    const actions = [
      {
        tooltip: 'Volume',
        key: 'volume',
        icon: 'volume_up',
      },
      {
        tooltip: 'Speed',
        key: 'speed',
        icon: 'speed',
      },
      {
        tooltip: 'Bitrate',
        key: 'bitrate',
        icon: 'grain',
      },
      {
        tooltip: 'Equalizer',
        key: 'equalizer',
        icon: 'equalizer',
      },
    ];
    const selectedAction = ref('volume');

    return {
      wavesurfer,

      volume,
      exportedVolume,
      setVolume,

      speed,
      setSpeed,

      bitrate,

      region,
      exportAudio,

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

  ::v-deep .waveform > wave {
    border-radius: 12px;
    > wave {
      border-right-color: #ff2a6f !important;
    }
  }

  ::v-deep .wavesurfer-region {
    background-color: rgba($primary, 0.2) !important;
    border-radius: 12px !important;
    box-shadow: lighten($primary, 20%) 0 0 32px 7px, #738caa7a 0 0 0 10000px;
  }
  ::v-deep .wavesurfer-handle {
    background-color: #60a5fa !important;
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

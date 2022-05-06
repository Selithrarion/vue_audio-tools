declare module 'lamejs' {
  export class Mp3Encoder {
    channels: number;
    sampleRate: number;
    bitrate: number;
    // TODO: fix An implementation cannot be declared in ambient contexts
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructor(channels: number, sampleRate: number, bitrate: number) {
      this.channels = channels;
      this.sampleRate = sampleRate;
      this.bitrate = bitrate;
    }

    encodeBuffer(left: Int16Array, right: Int16Array): string;
    flush(): string;
  }
}
declare module 'music-tempo' {
  class MusicTempo {
    constructor(v: number[] | Float32Array);
    tempo: string;
    tempoList: number[];
    peaks: number[];
    spectralFlux: number[];
    events: number[];
    beats: number[];
    beatInterval: number;
  }

  export = MusicTempo;
}
export interface MusicTempoData {
  tempo: string;
  tempoList: number[];
  peaks: number[];
  spectralFlux: number[];
  events: number[];
  beats: number[];
  beatInterval: number;
}
//
// declare module 'audio-encoder' {
//   type progressCallback = () => void;
//   type completeCallback = (v: Blob) => void;
//   function AudioEncoder(
//     buffer: AudioBuffer,
//     bitrate: number | null,
//     onProgress: progressCallback | null,
//     onComplete: completeCallback
//   ): void;
//   export = AudioEncoder;
// }

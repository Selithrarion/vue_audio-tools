# Audio tools with Vue 3

prev project - [instagram clone](https://github.com/Selithrarion/quasar-nest_instagram-clone)

### Content
- [Video](#video)
- [Stack](#stack)
- [App Features](#app-features)
- [Known bugs](#known-bugs)
- [Installation](#installation)
- [Notes](#notes)

### Video
![browser_4C5nJukf4Q](https://user-images.githubusercontent.com/59411497/168537844-8eea7c09-3cf1-48db-8230-9e4ae230624a.png)  
  
https://user-images.githubusercontent.com/59411497/168537104-10047b92-c337-441e-abaf-6c40c0316c78.mp4

### Stack
1. Vue 3
2. Typescript
3. Quasar
4. [Wavesurfer](https://github.com/katspaugh/wavesurfer.js)
5. [MusicTempo](https://github.com/killercrush/music-tempo)
6. other - date-fns, some lodash functions, eslint + tslint + prettier

### App Features
❌ === not implemented yet  
✨ === TODO idea. it seems that it won't be implemented but there were some plans

#### Audio
- Select region to export
- Change export and browser volume
- Change bitrate ✨
- Change speed
- Hotkeys to stop/pause, move current time with arrows
- Waveform
- Equalizer
- Equalizer spectrum ✨
- Detect BPM with music-tempo
- Change detected BPM when we're changing song speed  
- Detect and visualize beats ✨
- Snap to nearest beat when selecting export region ✨
- Export cropped audio to mp3 format with selected settings. [lamejs issue](https://github.com/zhuker/lamejs/issues/89) ❌
- Export to wav ✨
#### Other
- Google analytics
- Sentry - error monitoring and logging for both frontend and backend

### Known bugs
- TODO

### Installation  
1. Clone project  
2. "yarn global add @quasar/cli" and "cd .\frontend\" and "quasar dev"
3. star? 🤩😊 anyway, glad to any PRs  

### Notes
- 1-month pet-project from 1st to 31st of april. probably LOL  
upd: haha.. 

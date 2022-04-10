# Audio tools with Vue 3 and Nest

prev project - [instagram clone](https://github.com/Selithrarion/quasar-nest_instagram-clone)

### Content
- [Video](#video)
- [Project structure](#project-structure)
- [Stack](#stack)
- [App Features](#app-features)
- [Known bugs](#known-bugs)
- [Installation](#installation)
- [Notes](#notes)

### Video
TODO

### Project structure
for a quick understanding of project structure you can look at frontend models (frontend/src/models) or backend modules and their entities (backend/src/modules)

### Stack
#### Frontend
1. Vue 3
2. Vuex
3. Typescript
4. Quasar
5. Vue i18n
6. other - date-fns, some lodash functions, eslint + tslint + prettier

#### Backend
1. Node.js (Nest.js)
2. Typescript
3. PostgreSQL + TypeORM
4. AWS S3 (Amazon Simple Storage Service)

#### Other
Github actions CI pipeline

### App Features
❌ === not implemented yet  
✨ === TODO idea. it seems that it won't be implemented but there were some plans

#### Audio
- Cut mp3 ❌
- Change export and browser volume
- Change bitrate ❌
- Change speed
- Hotkeys to stop/pause, move current time with arrows
- [Waveform](https://github.com/katspaugh/wavesurfer.js)
- Equalizer ❌
- Equalizer spectrum ❌
- Export cropped audio with updated data ❌
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

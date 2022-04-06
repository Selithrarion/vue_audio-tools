# Audio cutter with Vue 3 and Nest

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


#### Global
- TODO
- Google analytics
- Sentry - error monitoring and logging for both frontend and backend

#### Audio
- TODO

### Known bugs
- TODO

### Installation  
1. Clone project  
2. Terminal 1 - "docker compose up"  
3. Terminal 2 - "yarn global add @quasar/cli" and "cd .\frontend\" and "quasar dev"  
4. Terminal 3 - "cd .\backend\" and "yarn start:dev" 
5. Don't forget to create new server (Object => Create => Server) and then database (instagram) in pgadmin (localhost:8082). small tip: in server connection field enter: host.docker.internal
6. star? 🤩😊 anyway, glad to any PRs  

### Notes
- 2-month pet-project from 1st april to the end of may. probably LOL  

## Install nestjs cli  
npm i -g @nestjs/cli

## Create new NestJS project
nest new nestjs-api  

## Install project dependencies  
npm i nestjs-typegoose @typegoose/typegoose mongoose @nestjs/platform-express
npm i --save-dev @types/mongoose

nesstjs-typegoose - help us to define database entities (we are using mongodb)
@typegoose/typegoose mongoose - packages to use mongodb
@nestjs/platform-express - package to help us with file upload

## Create project files  
nest g module image  
nest g controller image  
nest g service image  
nest g class image/image.model

## Docker  
run this command from docker folder  
docker-compose up --build -d mongodb  

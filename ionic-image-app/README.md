## Create Ionic project  
ionic start ionic-image-app blank --type=angular --capacitor  

#### Install pwa-elements to be able access camera from web browser  
npm i @ionic/pwa-elements  

#### New service for our API  
ionic g service services/api  
 
#### Create native projects  
ionic build  
npx cap add ios  
npx cap add android  


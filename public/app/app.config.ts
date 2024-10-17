import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), 
  provideFirebaseApp(() => initializeApp({"projectId":"simuacro-parcial1","appId":"1:1050263600187:web:8de52d6cf1d40b6307b01e","storageBucket":"simuacro-parcial1.appspot.com","apiKey":"AIzaSyAPz3Xfy1w76awfKuxEy0T-dHz8a6ZScjc","authDomain":"simuacro-parcial1.firebaseapp.com","messagingSenderId":"1050263600187"})), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore()),
  provideHttpClient()
]
};

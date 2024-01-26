import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom([
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyAklQnCtNL8CdVevCFlLJE1VbkmyvFncZw",
          authDomain: "crud-17-a1293.firebaseapp.com",
          projectId: "crud-17-a1293",
          storageBucket: "crud-17-a1293.appspot.com",
          messagingSenderId: "168818002278",
          appId: "1:168818002278:web:6a788c16cc1ff52046a0a7",
          measurementId: "G-E7H54GSLPT"
        })
      ),
      provideFirestore(() => getFirestore()),
    ]),
  ],
};

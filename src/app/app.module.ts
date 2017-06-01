import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyATGbZQMp9tkpVhFsxRJDScM6JirJMCGh0",
  authDomain: "r3auth.firebaseapp.com",
  databaseURL: "https://r3auth.firebaseio.com",
  projectId: "r3auth",
  storageBucket: "r3auth.appspot.com",
  messagingSenderId: "378959722272"
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

import { AngularFireModule } from 'angularfire2';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import {routes} from './app.routes';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AuthService} from './shared/auth.service';
import {AuthGuard} from './shared/guard.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {FeedService} from './feeds/feed.service';
import { MigComponent } from './mig/mig.component';
import { MeduzaComponent } from './meduza/meduza.component';
import { NepComponent } from './nep/nep.component';
import { MarkerComponent } from './marker/marker.component';
import { NewsruComponent } from './newsru/newsru.component';
import { FooterComponent } from './footer/footer.component';
import { CursorComponent } from './israelinfo/israelinfo.component';
import { SamoComponent } from './samo/samo.component';
import {GoogleMapService} from './shared/google-map.service';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { CounterComponent } from './counter/counter.component';
import {CountService} from "./counter/count.service";
import { PostsComponent } from './posts/posts.component';
import {PostsService} from "./posts/posts.service";

export const firebaseConfig = {
  apiKey: 'AIzaSyATGbZQMp9tkpVhFsxRJDScM6JirJMCGh0',
  authDomain: 'r3auth.firebaseapp.com',
  databaseURL: 'https://r3auth.firebaseio.com',
  projectId: 'r3auth',
  storageBucket: 'r3auth.appspot.com',
  messagingSenderId: '378959722272'
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MembersComponent,
    HeaderComponent,
    HomeComponent,
    MigComponent,
    MeduzaComponent,
    NepComponent,
    MarkerComponent,
    NewsruComponent,
    FooterComponent,
    CursorComponent,
    SamoComponent,
    MapComponent,
    AboutComponent,
    CounterComponent,
    PostsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    routes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyATbHLEJIxXo3yLBciyu5I8mFKIo6Ewjgw',
      libraries: ['places']
    }),

  ],
  providers: [ AuthService, AuthGuard, FeedService, GoogleMapService, FormsModule, CountService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

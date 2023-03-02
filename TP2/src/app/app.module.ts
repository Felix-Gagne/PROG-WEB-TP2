import { HttpClient, HttpHandler } from '@angular/common/http';
import { SpotifyService } from './services/spotify.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConcertComponent } from './concert/concert.component';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TrustPipe } from './pipe/trust.pipe';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConcertComponent,
    AlbumComponent,
    SongComponent,
    TrustPipe, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule.forRoot([
      {path: "", redirectTo: "/home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "album/:artistName", component: AlbumComponent},
      {path: "concert/:artistName", component: ConcertComponent},
      {path: "song/:albumName/:artistName", component: SongComponent}
    ])
  ],
  providers: [
    SpotifyService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

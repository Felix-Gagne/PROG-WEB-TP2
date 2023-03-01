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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConcertComponent,
    AlbumComponent,
    SongComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", redirectTo: "/home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "album/:artistName", component: AlbumComponent},
      {path: "concert", component: ConcertComponent},
      {path: "song/:albumName", component: SongComponent}
    ])
  ],
  providers: [
    SpotifyService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

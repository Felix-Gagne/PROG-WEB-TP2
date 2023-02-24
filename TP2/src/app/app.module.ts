import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConcertComponent } from './concert/concert.component';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConcertComponent,
    AlbumComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot([
      {path: "", redirectTo: "/home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "album", component: AlbumComponent},
      {path: "concert", component: ConcertComponent},
      {path: "song", component: SongComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

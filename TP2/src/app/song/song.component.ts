import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Album } from '../modele/album';
import { SpotifyService } from '../services/spotify.service';
import { StockageService } from '../services/stockage.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  albumName : string | null = null;
  album ?: Album;

  songId : string = "";
  songUrl : string = "";
  safeUrl : SafeResourceUrl = "";

  enabled : boolean = false;

  constructor(public route : ActivatedRoute, public spotify : SpotifyService, public stockage : StockageService, public http : HttpClient,
    public sanitizer : DomSanitizer) { }

    // getSafeUrl(url : string) : SafeResourceUrl {
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // }

  ngOnInit(): void 
  {
    this.albumName = this.route.snapshot.paramMap.get("albumName");
    this.getSongs();
  }

  async getSongs() : Promise<void>
  {
    for(let lesAlbums of this.stockage.albums)
    {
      if(lesAlbums.name == this.albumName)
      {
        this.album = lesAlbums;
      }
    }

    if(this.album != undefined)
    {
      this.stockage.songs = await this.spotify.getSongs(this.album);
    }
  }

  async playSong(songName : string) : Promise<void>
  {
    console.log(songName);
    let x = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=AIzaSyBkS79RFn3dhqZCLl6ARGu8dZUSAKeK6m8&q=" + songName));
    console.log(x);
    console.log(x.items[0].id.videoId);

    this.songId = x.items[0].id.videoId;
    this.songUrl = "https://youtube.com/embed/" + this.songId;
    console.log(this.safeUrl);

    this.enabled = true;
  }

}

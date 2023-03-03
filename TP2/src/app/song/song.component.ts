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

  albumId : string | null = null;
  artistName : string | null = null;
  album ?: Album;
  albumName : string | null = null;

  songId : string = "";
  songUrl : string = "";
  safeUrl : SafeResourceUrl = "";

  enabled : boolean = false;

  constructor(public route : ActivatedRoute, public spotify : SpotifyService, public stockage : StockageService, public http : HttpClient,
    public sanitizer : DomSanitizer) { }

  ngOnInit(): void 
  {
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.albumName = this.route.snapshot.paramMap.get("albumName");
    this.getSongs();
    console.log(this.stockage.songs);
  }

  async getSongs() : Promise<void>
  {
    if(this.albumId != null)
    {
      this.stockage.songs = await this.spotify.getSongs(this.albumId);
    }
  }

  async playSong(songName : string) : Promise<void>
  {
    console.log(songName);
    let x = await lastValueFrom(this.http.get<any>("https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=AIzaSyBkS79RFn3dhqZCLl6ARGu8dZUSAKeK6m8&q=" + songName + this.artistName));
    console.log(x);
    console.log(x.items[0].id.videoId);

    this.songId = x.items[0].id.videoId;
    this.songUrl = "https://youtube.com/embed/" + this.songId;

    this.enabled = true;
  }

}

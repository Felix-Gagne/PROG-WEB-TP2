import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../modele/artist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jsonData : string | null = null;
  artistName : string = "";
  artist : Artist | undefined;

  artists : Artist[]=[];

  delete : boolean = false;

  dejaPresent : boolean = false;

  constructor(public spotify : SpotifyService) { }

  ngOnInit(): void 
  {
    this.spotify.connect();
    this.jsonData = localStorage.getItem("artists");
    if(this.jsonData != null)
    {
      this.artists = JSON.parse(this.jsonData);
    }
  }

  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName);

    if(this.artist != undefined)
    {
      this.artists.push(this.artist);
      localStorage.setItem("artists", JSON.stringify(this.artists));
      this.dejaPresent = false;
    }

    console.log(this.artists);
  }

  clearLocal(){
    localStorage.clear();
    this.artists = [];

    if(this.dejaPresent == true)
    {
      this.dejaPresent = false;
    }
  }
}

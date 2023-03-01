import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../modele/artist';
import { StockageService } from '../services/stockage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jsonData : string | null = null;
  artistName : string = "";
  artist : Artist | undefined;

  delete : boolean = false;

  dejaPresent : boolean = false;

  constructor(public spotify : SpotifyService, public stockage : StockageService) { }

  ngOnInit(): void 
  {
    this.spotify.connect();
    this.jsonData = localStorage.getItem("artists");
    if(this.jsonData != null)
    {
      this.stockage.artists = JSON.parse(this.jsonData);
    }
  }

  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName);

    if(this.artist != undefined)
    {
      this.stockage.artists.push(this.artist);
      localStorage.setItem("artists", JSON.stringify(this.stockage.artists));
      this.dejaPresent = false;
    }

    console.log(this.stockage.artists);
  }

  clearLocal(){
    localStorage.clear();
    this.stockage.artists = [];

    if(this.dejaPresent == true)
    {
      this.dejaPresent = false;
    }
  }
}

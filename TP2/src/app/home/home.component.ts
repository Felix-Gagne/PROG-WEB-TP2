import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../modele/artist';
import { StockageService } from '../services/stockage.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';

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

  constructor(public spotify : SpotifyService, public stockage : StockageService, public translator : TranslateService) { 
  }

  ngOnInit(): void 
  {
    this.spotify.connect();
    this.jsonData = localStorage.getItem("artists");
    if(this.jsonData != null)
    {
      this.stockage.artists = JSON.parse(this.jsonData);
    }
    if(this.jsonData != null)
    {
      this.delete = true;
    }
  }

  async getArtist() : Promise<void>{
    this.artist = await this.spotify.searchArtist(this.artistName);

    if(this.artist != undefined)
    {
      const found = this.stockage.artists.some(el => el.id === this.artist?.id);
      if(found)
      {
        this.dejaPresent = true;
      }
      else
      {
      this.stockage.artists.push(this.artist);
      localStorage.setItem("artists", JSON.stringify(this.stockage.artists));
      this.delete = true;
        if(this.dejaPresent = true)
        {
          this.dejaPresent = false;
        }
      }
    }

    console.log(this.stockage.artists);
  }

  clearLocal(){
    localStorage.clear();
    this.stockage.artists = [];

    console.log(this.stockage.artists);
    if(this.delete = true)
    {
      this.delete = false;
    }
    if(this.dejaPresent = true)
    {
      this.dejaPresent = false;
    }
  }
}

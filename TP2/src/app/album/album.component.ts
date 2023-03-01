import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../modele/album';
import { SpotifyService } from '../services/spotify.service';
import { StockageService } from '../services/stockage.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  artistName : string | null = null;
  artistId : string="";

  constructor(public route : ActivatedRoute, public spotify : SpotifyService, public stockage : StockageService) { }

  ngOnInit(): void 
  {
    this.spotify.connect();
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.getAlbum();
  }

  async getAlbum() : Promise<void>
  {
    for(let artist of this.stockage.artists)
    {
      if(artist.name == this.artistName)
      {
        this.artistId = artist.id;
      }
    }

    if(this.artistId != null)
    {
      this.stockage.albums = await this.spotify.searchAlbum(this.artistId);
    }
    console.log(this.stockage.albums);
  }

  async getSongs() : Promise<void>
  {

  }

}

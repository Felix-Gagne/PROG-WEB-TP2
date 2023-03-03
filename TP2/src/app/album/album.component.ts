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
  artistId : string | null = null;

  constructor(public route : ActivatedRoute, public spotify : SpotifyService, public stockage : StockageService) { }

  ngOnInit(): void 
  {
    this.spotify.connect();
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.artistId = this.route.snapshot.paramMap.get("artistId");
    this.getAlbum();
  }

  async getAlbum() : Promise<void>
  {
    if(this.artistId != null)
    {
      this.stockage.albums = await this.spotify.searchAlbum(this.artistId);
    }
    console.log(this.stockage.albums);
  }

}

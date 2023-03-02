import { BandsintownService } from './../services/bandsintown.service';
import { StockageService } from './../services/stockage.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from './../modele/artist';
import { ActivatedRoute, ROUTER_CONFIGURATION } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Concert } from '../modele/concert';
import { Markers } from '../modele/markers';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {

  artistName : string | null = null;
  center : google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom : number = 5;
  courantMarker ?: Markers;
  markerPositions : google.maps.LatLngLiteral[] = [];

  constructor(public route : ActivatedRoute, public http : HttpClient, public stockage : StockageService, public bandsintown : BandsintownService) { }

  ngOnInit(): void 
  {
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.getConcert();
    this.createMarker();
    console.log(this.getConcert());
  }

  async getConcert()
  {
    if(this.artistName != null)
    {
     this.stockage.concerts = await this.bandsintown.getConcert(this.artistName);
    }
  }

  async createMarker()
  {
    for(let i = 0; i <= this.stockage.concerts.length; i++)
    {
      if(this.stockage.concerts[i] != undefined)
      {
        this.markerPositions.push({lat : parseFloat(this.stockage.concerts[i].lat), lng : parseFloat(this.stockage.concerts[i].lon)});
      }
    }
    console.log(this.markerPositions);
  }
}

import { BandsintownService } from './../services/bandsintown.service';
import { StockageService } from './../services/stockage.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Artist } from './../modele/artist';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Concert } from '../modele/concert';

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.css']
})
export class ConcertComponent implements OnInit {

  artistName : string | null = null;

  constructor(public route : ActivatedRoute, public http : HttpClient, public stockage : StockageService, public bandsintown : BandsintownService) { }

  ngOnInit(): void 
  {
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.getConcert();
    console.log(this.getConcert());
  }

  async getConcert()
  {
    if(this.artistName != null)
    {
     this.stockage.concerts = await this.bandsintown.getConcert(this.artistName);
    }
  }
}

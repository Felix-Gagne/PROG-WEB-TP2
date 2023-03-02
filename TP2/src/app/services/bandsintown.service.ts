import { Concert } from './../modele/concert';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BandsintownService {

constructor(public http : HttpClient) { }

async getConcert(artistName : string) : Promise<Concert[]>
  {
    let x = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName +"/events?app_id=2b32475766802ac01eefda45e9e42ea0&date=upcoming"));
    console.log(x);

    let listeConcert : Concert[] = [];

    for(let i = 0; i < x.length; i++)
    {
      listeConcert.push(new Concert(x[i].venue.latitude, x[i].venue.longitude, x[i].venue.city,
        x[i].venue.country, x[i].starts_at));
    }

    console.log(listeConcert);
    return listeConcert;
  }

}

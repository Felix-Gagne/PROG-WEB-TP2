import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../modele/artist';

const CLIENT_ID : string = "c6e073efd132425295db9c310c59bbdc";
const CLIENT_SECRET : string = "9616583191c14a0c868e9c1a9e0c1d02";

@Injectable({
    providedIn: 'root',
   })

export class SpotifyService 
{
    spotifyToken : string | null = null;

  constructor(public http : HttpClient) { }

  async connect(): Promise<void> {
      let body = new HttpParams().set('grant_type', 'client_credentials');
      let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        })
      };
      let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions));
      console.log(x);
      this.spotifyToken = x.access_token;
  }

  async searchArtist(artist : string): Promise<any> {
    
    const httpOptions = {
         headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + this.spotifyToken
            })
        };
        
        
        console.log(artist);
        let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + 
        artist, httpOptions));
        console.log(x);
        return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[2].url);
  }
}

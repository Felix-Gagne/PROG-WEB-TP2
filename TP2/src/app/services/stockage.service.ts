import { Concert } from './../modele/concert';
import { Injectable } from '@angular/core';
import { Artist } from '../modele/artist';
import { Album } from '../modele/album';
import { Song } from '../modele/song';
import { Markers } from '../modele/markers';

@Injectable({
  providedIn: 'root'
})
export class StockageService 
{
  artists : Artist[]=[];
  albums : Album[] = [];
  songs : Song[] = [];
  concerts : Concert[] = [];
  listMarkers : Markers[] = [];
}

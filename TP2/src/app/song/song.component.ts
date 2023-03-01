import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  albumName : string | null = null;

  constructor(public route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.albumName = this.route.snapshot.paramMap.get("albumName");
  }

}

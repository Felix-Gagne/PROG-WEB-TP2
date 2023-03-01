import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  artistName : string | null = null;

  constructor(public route : ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.artistName = this.route.snapshot.paramMap.get("artistName");
  }

}

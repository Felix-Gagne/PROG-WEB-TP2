import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'TP2';

  language : string = "fr";

  constructor(public translator : TranslateService){
    translator.setDefaultLang(this.language);
  }

  changeLanguage(lang : string):void
  {
    this.language = lang;
    this.translator.use(this.language);
  }
}

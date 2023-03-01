import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'trust'
})
export class TrustPipe implements PipeTransform 
{

  constructor(public sanitizer : DomSanitizer){}
  
  transform(value: any, args?: any): any
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}

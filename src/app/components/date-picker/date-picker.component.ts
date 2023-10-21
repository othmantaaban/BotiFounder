import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {

  constructor() { }

  public items=['26 - 07','27 - 07','28 - 07','29 - 07','30 - 07']
  public selectedIndex=0

  rightDate(){
   if(this.selectedIndex!=this.items.length-1){
    this.selectedIndex+=1
   }
  }

  leftDate(){
    if(this.selectedIndex!=0){
      this.selectedIndex-=1
     }
  }

  ngOnInit() {}

}

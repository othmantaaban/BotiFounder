import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-recouvrements',
  templateUrl: './listing-recouvrements.component.html',
  styleUrls: ['./listing-recouvrements.component.scss'],
})
export class ListingRecouvrementsComponent implements OnInit {


  @Input() items=[];
  @Input() tabs=["Eléve", "Action", "Date Action"];
  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

  getObjKeys(item) : any[] {
    return Object.getOwnPropertyNames(item)
  }

  checkTypeOf(item) {
    let check = item.replaceAll(" ", "")
    return !Number.isNaN(+check) ? true: false
    
    // return typeof +item == "Number" ? true: false;
  }

}

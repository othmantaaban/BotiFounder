import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-admin',
  templateUrl: './listing-admin.component.html',
  styleUrls: ['./listing-admin.component.scss'],
})
export class ListingAdminComponent implements OnInit {

  constructor() { }

  // @ts-ignore
  @Input() Title:string;
  @Input() items=[];

  ngOnInit() {}

}

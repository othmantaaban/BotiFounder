import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public selectedIndex=0


  private subject = new Subject<any>();

  sendClickEvent(data: any = null){
    this.subject.next(data);
  }

  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

 

  constructor() {
    
   }

  ngOnInit() {

  }
}

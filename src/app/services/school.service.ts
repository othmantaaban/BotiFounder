import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
​
@Injectable({
  providedIn: 'root'
})
export class SchoolService {
​
  public currentSchool = null;
​
  constructor(
    public storage: Storage
  ) {
    if(!this.currentSchool){
      this.getschool();
    }
  }
​
  public setschool(school){
    this.currentSchool = school;
  }
  public async getschool(){
    await this.storage.create();
    const val = await this.storage.get('founder_school');
    if(val){
      this.currentSchool = JSON.parse(val);
    }else{
      this.currentSchool = null;
    }
    return this.currentSchool;
  }
}
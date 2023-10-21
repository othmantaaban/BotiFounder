import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from '../../models/school';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public school: School;
  public user: any;
  public token: any;

  constructor(
    public api: ApiService,
    public router: Router,
    public navController: NavController,
    private storage: Storage,
    private toastController: ToastController,
    private http : HttpClient
  ) {
   }

  async isLoggedIn(): Promise<boolean> {
    if (this.user && this.token) {
      return await this.checkUser(this.user,this.token);
    } else {
      await this.storage.create();
      const userId = await this.storage.get('boti_user_id');
      const userToken = await  this.storage.get('boti_res_token');
      if (userId && userToken) {
        this.user = userId;
        this.token = userToken;
      } else {
        this.storage.remove('boti_user_id');
        this.storage.remove('boti_res_token');
        this.user = null;
        this.token = null;
      }

      // console.log(this.user);

      return await this.checkUser(this.user,this.token);
    }

  }

  async checkUser(user,token): Promise<boolean> {
    return new Promise(resolve=>{
      if (user&&token) {
        this.api.get({
          user: user,
          token: token
        }, 'checkUser')
        .subscribe(async(res)=>{
          // @ts-ignore
            if(res && res.valid){
              resolve(true);
            }else{
              await this.removeSession();
              resolve(false);
            }
        });
      }else{
        resolve(false);
      }
    });
  }


  checkValidity(validity: string): boolean {
    if (validity) {
      // console.log('validity : ', validity);
      return +new Date(validity) > +new Date();
    }

    return false;
  }

  async setLoggedIn(res) {
    console.log(res);
    this.user = res.userId;
    await this.storage.create()
    await this.storage.set('boti_user_id', res.userId);
    await this.storage.set('boti_res_token', res.keyToken);
      
    // this._splash = this.store.load_splash();
    // this.store.save(this.user);
    // this._current.next(this.user);
    // this._loggedInChange.next(!!this.user);

    return true;
  }

  login(accountInfo): Promise<boolean> {

    return new Promise(resolve => {
      this.api.post({
        login: accountInfo.login,
        password: accountInfo.password
      }, 'login')
      .subscribe(async (res: any)=>{
        if (!res.error) {
          console.log(res);
          resolve(await this.setLoggedIn(res));
        } else {
          resolve(false);
        }
      });

    })
  }

  async removeSession(): Promise<void>{
    await this.storage.create();
    await this.storage.remove('boti_user_id');
    await this.storage.remove('boti_res_token');
    this.school = null;
    this.user = null;
    this.token = null;
   
  }

  async logout(): Promise<void>{

    await this.removeSession();
   
    this.navController.navigateRoot(['/']);
  }
}

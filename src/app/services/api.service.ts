import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public static alias = 'p/demo';

  constructor(
    private http: HttpClient
  ) { }
}

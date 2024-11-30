import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviorement } from '../config.enviorement';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }


  login(data:any){
    const endpoint = `${enviorement.api}/auth/login`;
    return this.http.post<any>(endpoint,data);
  }
}

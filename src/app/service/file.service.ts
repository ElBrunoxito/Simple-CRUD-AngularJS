import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviorement } from '../config.enviorement';
import { Files } from '../models/File';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http:HttpClient) { }


  getAll(){
    const endpoint = `${enviorement.api}/files/getAll`;
    return this.http.get<any>(endpoint);
  }

  addFile(data:Files){
    const endpoint = `${enviorement.api}/files/addFile`;
    return this.http.post<Files>(endpoint,data);
  }

  updateFile(data:Files){
    const endpoint = `${enviorement.api}/files/updateFile`;
    return this.http.put<Files>(endpoint,data);
  }

  deleteFile(id:number){
    const endpoint = `${enviorement.api}/files/deleteFile/${id}`;
    return this.http.delete<Files>(endpoint);
    
  }


}

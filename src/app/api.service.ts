import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api: HttpClient) { }

  CreateUser(body:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/ json'
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/user/create", body, httpOptions)
  }


  ReadAllUser(){
    return this.api.get("http://127.0.0.1:5000/api/user/readall")
  }


  ReadSingleUser(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/user/readsingle", body, httpOptions)
  }

  UpdateUser(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/user/update", body, httpOptions)
  }


  DeleteUser(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/user/delete", body, httpOptions)
  }

}

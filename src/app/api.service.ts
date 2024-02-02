import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ngOnInit(value: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';


  constructor(private api: HttpClient) {}


   // Api Categories

   ReadAllCategories(): Observable<any>{
    return this.api.get<any[]>("http://127.0.0.1:5000/api/categories/readall")
  }

  // Api user

  CreateUser(body:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/user/create", body, httpOptions)
  }


  LoginUser(body:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post('http://127.0.0.1:5000/api/user/login', body, httpOptions);
    // return this.api.post('mysql+pymysql://root:@localhost/tt_officiel', body, httpOptions)
  }


  ReadAllUser(): Observable<any>{
    return this.api.get<any>("http://127.0.0.1:5000/api/user/readall")
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



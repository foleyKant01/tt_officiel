import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ngOnInit(value: any) {
    // throw new Error('Method not implemented.');
  }

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) {}


  // Api user

  SaveLocation(position:{ latitude: number; longitude: number }): Observable<any>{
    return this.api.post("http://127.0.0.1:5000/api/user/localisation", position)
  }


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
  }


  ReadAllUser(): Observable<any>{
    return this.api.get<any>("http://127.0.0.1:5000/api/user/readall")
  }


  ReadSingleUser(u_uid:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.get("http://127.0.0.1:5000/api/user/readsingle/${u_uid}", httpOptions);
  }

  UpdateUser(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.patch("http://127.0.0.1:5000/api/user/update", body, httpOptions)
  }


  DeleteUser(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/user/delete", body, httpOptions)
  }


   // Api Teller

   CreateTeller(body:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/teller/create", body, httpOptions)
  }


  LoginTeller(body:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post('http://127.0.0.1:5000/api/teller/login', body, httpOptions);
  }


   // Api Categories

   ReadAllCategories(): Observable<any>{
    return this.api.get<any[]>("http://127.0.0.1:5000/api/categories/readall")
  }


  ReadSingleCategories(u_uid:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.get("http://127.0.0.1:5000/api/categories/readsingle/${ca_uid}", httpOptions);
  }


  CreateCategories(body:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/categories/create", body, httpOptions)
  }



  DeleteCategories(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/categories/delete", body, httpOptions)
  }


  UpdateCategories(body:any){

    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };

    return this.api.patch("http://127.0.0.1:5000/api/categories/update", body, httpOptions)
  }


    // Api Business

    CreateBusiness(body:any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.api.post("http://127.0.0.1:5000/api/business/create", body, httpOptions)
    }


    ReadAllBusiness(): Observable<any>{
      return this.api.get<any[]>("http://127.0.0.1:5000/api/business/readall")
    }
    // Api Advertisement

    ReadAllAdvertisement(): Observable<any>{
      return this.api.get<any[]>("http://127.0.0.1:5000/api/advertisement/readall")
    }



    CreateAdvertisement(body:any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.api.post("http://127.0.0.1:5000/api/advertisement/create", body, httpOptions)
    }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }

  //Business
  CreateBusiness(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/business/createbusiness", body, httpOptions)
  }


  ReadAllBusiness(): Observable<any> {
    return this.api.get<any[]>("http://127.0.0.1:5000/api/business/readallbusiness")
  }

  // Categories
  ReadAllCategories(): Observable<any> {
    return this.api.get<any[]>("http://127.0.0.1:5000/api/categorie/readallcategorie")
  }

}



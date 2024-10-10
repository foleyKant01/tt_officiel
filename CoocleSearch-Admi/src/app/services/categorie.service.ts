import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }


  CreateCategories(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/categorie/createcategorie", body, httpOptions)
  }


  ReadAllCategories(): Observable<any> {
    return this.api.get<any[]>("http://127.0.0.1:5000/api/categorie/readallcategorie")
  }


  ReadSingleCategories(body: any) {
    return this.api.post("http://127.0.0.1:5000/api/categorie/readsinglecategorie",body);
  }


  DeleteCategories(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/categorie/deletecategorie",body, httpOptions);
  }


  UpdateCategories(body: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/categorie/updatecategorie", body, httpOptions)
  }
}



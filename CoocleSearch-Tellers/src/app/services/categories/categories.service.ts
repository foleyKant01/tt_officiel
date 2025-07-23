import { Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }

  api_url = environment.apiUrl

  CreateCategories(body: any) {
    return this.http.post(this.api_url+"/api/categorie/createcategorie", body);
  }

  ReadAllCategories(): Observable<any>{
    return this.api.get<any>(this.api_url+"/api/categorie/readallcategorie")
  }

  DeleteCategories(body: any) {
    return this.http.post(this.api_url+"/api/categorie/deletecategorie", body);
  }
}

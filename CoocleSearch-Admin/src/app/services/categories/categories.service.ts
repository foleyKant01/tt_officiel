import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }

  api_url = environment.apiUrl

  LoginAdmin(body: any) {
    return this.http.post(this.api_url+"/api/admin/login", body);
  }}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  LoginUser(body: any) {
    return this.http.post(this.api_url+"/api/user/login", body);
  }
}

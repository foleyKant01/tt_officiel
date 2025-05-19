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

  CreateUser(body: any) {
    return this.http.post(this.api_url+"/api/user/create", body);
  }

  LoginUser(body: any) {
    return this.http.post(this.api_url+"/api/user/login", body);
  }

  ForgotPassword(body: any) {
    return this.http.post(this.api_url+"/api/user/forgot_password", body);
  }

  SaveNewPassword(body: any) {
    return this.http.post(this.api_url+"/api/user/save_new_password", body);
  }
}

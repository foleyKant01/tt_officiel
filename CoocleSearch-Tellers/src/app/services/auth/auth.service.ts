import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  LoginTeller(body: any) {
    return this.http.post(this.api_url+"/api/teller/login", body);
  }

  CreateTeller(body: any) {
    return this.http.post(this.api_url+"/api/teller/create", body);
  }

  ForgotPassword(body: any) {
    return this.http.post(this.api_url+"/api/teller/forgot_password", body);
  }

  SaveNewPassword(body: any) {
    return this.http.post(this.api_url+"/api/teller/save_new_password", body);
  }
}

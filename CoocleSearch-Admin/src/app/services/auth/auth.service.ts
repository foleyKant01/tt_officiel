import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  login(body: any) {
    return this.http.post(this.api_url+"/api/users/loginuser", body);
  }
}

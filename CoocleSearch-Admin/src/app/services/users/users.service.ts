import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  CreateUser(body: any) {
    return this.http.post(this.api_url+"/api/user/create", body);
  }

  ReadAllUser(): Observable<any>{
    return this.http.get<any>(this.api_url+"/api/user/readall")
  }

  // GetSingleDriverOrSupervisor(body: any) {
  //   return this.http.post(this.api_url+"/api/users/getsingledriverorsupervisor", body);
  // }

  // DeleteUser(body: any) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       Authorization: ''
  //     }),
  //     body: JSON.stringify(body)
  //   };
  //   return this.http.delete(this.api_url+"/api/users/deleteuser", httpOptions);
  // }

  // UpdateUser(body: any) {
  //   return this.http.patch(this.api_url+"/api/users/updateuser", body);
  // }
}

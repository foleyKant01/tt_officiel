import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TellersService {

  constructor( private http: HttpClient ) { }
  api_url = environment.apiUrl

  CreateTeller(body: any) {
    return this.http.post(this.api_url+"/api/teller/create", body);
  }

  ReadAllTeller(): Observable<any>{
    return this.http.get<any>(this.api_url+"/api/teller/readall")
  }
}

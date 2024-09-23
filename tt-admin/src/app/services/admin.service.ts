import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }


  SaveLocation(position: { latitude: number; longitude: number }): Observable<any> {
    return this.api.post("http://127.0.0.1:5000/api/user/localisation", position)
  }


  ReadAllUser(): Observable<any> {
    return this.api.get<any>("http://127.0.0.1:5000/api/user/readall")
  }


  ReadSingleUser(u_uid: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.api.get("http://127.0.0.1:5000/api/user/readsingle/${u_uid}", httpOptions);
  }


  DeleteUser(body: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.api.post("http://127.0.0.1:5000/api/user/delete", body, httpOptions)
  }


  // Api Teller

  CreateTeller(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.api.post("http://127.0.0.1:5000/api/teller/create", body, httpOptions)
  }

}



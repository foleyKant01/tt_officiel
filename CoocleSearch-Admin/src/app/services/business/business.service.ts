import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  // private apiUrl = 'mysql+pymysql://root:@localhost/tt_officiel';

  constructor(private api: HttpClient, private http: HttpClient) { }

  api_url = environment.apiUrl

  CreateBusiness(body: any) {
    return this.http.post(this.api_url+"/api/business/createbusiness", body);
  }

  ReadAllBusiness(): Observable<any>{
    return this.api.get<any>(this.api_url+"/api/business/readallbusiness")
  }

  ReadAllBusinessByCategories(body: any) {
    return this.http.post(this.api_url+"/api/business/readsinglebusinessbycategories", body);
  }

  ReadSingleBusiness(body : any){
    return this.http.post(this.api_url+"/api/business/readsinglebusiness",body);
  }

  DeleteBusiness(body : any){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   })
    // };
    return this.http.post(this.api_url+"/api/business/deletebusiness", body)
  }

}

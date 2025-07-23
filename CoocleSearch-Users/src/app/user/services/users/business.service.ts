import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  SearchBusinessByCategorie(body: any) {
    return this.http.post(this.api_url+"/api/business/searchbusinessbycategorie", body);
  }

  ReadSingleBusiness(body: any) {
    return this.http.post(this.api_url+"/api/business/readsinglebusiness", body);
  }

  CreateStats(body: any) {
    return this.http.post(this.api_url+"/api/stats/create_stats", body);
  }
}

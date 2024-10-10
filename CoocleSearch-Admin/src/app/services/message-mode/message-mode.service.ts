import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageModeService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  SendMode(body: any) {
    return this.http.post(this.api_url+"/api/settings/send_mode", body);
  }

  UpdateSendMode(body: any) {
    return this.http.patch(this.api_url+"/api/settings/update_send_mode", body);
  }

  getSendMode(body: any) {
    return this.http.get(this.api_url+"/api/settings/getsinglesendmode", body);
  }
  

}

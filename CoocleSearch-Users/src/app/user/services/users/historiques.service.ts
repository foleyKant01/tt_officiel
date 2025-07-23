import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriquesService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  SaveHistorique(body: any) {
    return this.http.post(this.api_url + "/api/historiques/save_historique", body);
  }

  ReadAllHistoriqueByUser(body: any) {
    return this.http.post(this.api_url + "/api/historiques/read_all_historique_by_user", body);
  }

  DeleteHistoriques(body: any) {
    return this.http.post(this.api_url + "/api/historiques/delete_historiques", body);
  }
}

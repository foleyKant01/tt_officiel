import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl

  ReadAllFavorisByUser(body: any) {
    return this.http.post(this.api_url+"/api/favoris/read_all_favoris_by_user", body);
  }

  SaveFavoris(body: any) {
    return this.http.post(this.api_url+"/api/favoris/save_favoris", body);
  }

  DeleteFavoris(body: any) {
    return this.http.post(this.api_url+"/api/favoris/delete_favoris", body);
  }

  ReadAllHistoriqueByUser(body: any) {
    return this.http.post(this.api_url+"/api/historiques/read_all_historique_by_user", body);
  }
}

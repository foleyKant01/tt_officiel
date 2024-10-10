import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

   
  constructor(private http: HttpClient) { }

  api_url = environment.apiUrl



  GetAllAssignments(body: any) {
    return this.http.get(this.api_url+"/api/attendence/getallassignments", body);
  }


//   DeleteAssignments(body: any) {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type':  'application/json',
//         Authorization: ''
//       }),
//       body: JSON.stringify(body)
//     };
//     return this.http.delete(this.api_url+"/api/assignments/deleteassignments", httpOptions);
//   }

//  UpdateAssignments(body: any) {
//     return this.http.patch(this.api_url+"/api/assignments/updateassignments", body);
//   }
}

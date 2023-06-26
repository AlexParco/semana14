import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  url = 'http://localhost:4000/';

  constructor(private http: HttpClient) {

  }
  getPdf(): Observable<any> {
    return this.http.get(this.url + 'reportpdf/vuelos', { responseType: 'blob' })
  }

  getVuelos(): Observable<any> {
    return this.http.get(this.url + "vuelos");
  }

}

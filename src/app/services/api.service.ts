import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://prog2005.it.scu.edu.au/ArtGalley';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(BASE_URL + '/');
  }

  getByName(name: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${name}`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post(BASE_URL + '/', item);
  }

  updateItem(name: string, item: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${name}`, item);
  }

  deleteItem(name: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${name}`);
  }
}

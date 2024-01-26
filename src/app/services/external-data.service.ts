import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalDataService {
  private readonly http = inject(HttpClient);

  getData(name: string) {
    return this.http.get(`https://jsonplaceholder.typicode.com/${name}`);

  }
}

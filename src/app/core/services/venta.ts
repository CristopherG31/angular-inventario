import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  crearVenta(data: any) {

    return this.http.post(
      `${this.apiUrl}/ventas`,
      data
    );
  }

  getVentas() {

    return this.http.get(
      `${this.apiUrl}/ventas`
    );
  }
}
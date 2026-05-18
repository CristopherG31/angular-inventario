import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =====================
  // PRODUCTOS
  // =====================
  getProductos() {
    return this.http.get(`${this.API}/productos`);
  }

  getProducto(id: number) {
    return this.http.get(`${this.API}/productos/${id}`);
  }

  // =====================
  // CATEGORIAS
  // =====================
  getCategorias() {
    return this.http.get(`${this.API}/categorias`);
  }

  // =====================
  // VENTAS
  // =====================
  getVentas() {
    return this.http.get(`${this.API}/ventas`);
  }

  // =====================
  // DASHBOARD
  // =====================
  getDashboard() {
    return this.http.get(`${this.API}/dashboard`);
  }

  // =====================
  // MOVIMIENTOS
  // =====================
  getMovimientos() {
    return this.http.get(`${this.API}/movimientos`);
  }
}
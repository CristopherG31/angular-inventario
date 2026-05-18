import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  // ⚠️ DEBE SER TU URL DE RAILWAY CON /api
  private apiUrl = environment.apiUrl;

  // =====================
  // GET PRODUCTOS
  // =====================
  getProductos() {
    return this.http.get<any[]>(
      `${this.apiUrl}/productos`
    );
  }

  // =====================
  // CREATE
  // =====================
  crearProducto(data: any) {
    return this.http.post(
      `${this.apiUrl}/productos`,
      data
    );
  }

  // =====================
  // UPDATE
  // =====================
  actualizarProducto(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/productos/${id}`,
      data
    );
  }

  // =====================
  // DELETE
  // =====================
  eliminarProducto(id: number) {
    return this.http.delete(
      `${this.apiUrl}/productos/${id}`
    );
  }
  
}
console.log('🚀 NUEVO BUILD API:', environment.apiUrl);
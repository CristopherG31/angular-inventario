import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  // 👉 IMPORTANTE:
  // aquí YA incluye /api
  private apiUrl = environment.apiUrl;

  // =====================
  // OBTENER PRODUCTOS
  // =====================
  getProductos() {
    return this.http.get<any[]>(
      `${this.apiUrl}/productos`
    );
  }

  // =====================
  // CREAR PRODUCTO
  // =====================
  crearProducto(data: any) {
    return this.http.post(
      `${this.apiUrl}/productos`,
      data
    );
  }

  // =====================
  // ACTUALIZAR PRODUCTO
  // =====================
  actualizarProducto(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/productos/${id}`,
      data
    );
  }

  // =====================
  // ELIMINAR PRODUCTO
  // =====================
  eliminarProducto(id: number) {
    return this.http.delete(
      `${this.apiUrl}/productos/${id}`
    );
  }
  
}
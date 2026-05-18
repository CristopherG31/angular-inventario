import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Obtener productos
  getProductos() {

    return this.http.get(
      `${this.apiUrl}/productos`
    );
  }

  // Crear producto
  crearProducto(data: any) {

    return this.http.post(
      `${this.apiUrl}/productos`,
      data
    );
  }

  //eliminar producto
  eliminarProducto(id: number) {

  return this.http.delete(
    `${this.apiUrl}/productos/${id}`
  );
}

//EDITAR PRODUCTO
actualizarProducto(
  id: number,
  data: any
) {

  return this.http.put(
    `${this.apiUrl}/productos/${id}`,
    data
  );
}
}
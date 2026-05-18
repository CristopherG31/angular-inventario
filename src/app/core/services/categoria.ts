import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Obtener
  getCategorias() {

    return this.http.get(
      `${this.apiUrl}/categorias`
    );
  }

  // Crear
  crearCategoria(
    data: any
  ) {

    return this.http.post(
      `${this.apiUrl}/categorias`,
      data
    );
  }

  // Actualizar
  actualizarCategoria(
    id: number,
    data: any
  ) {

    return this.http.put(
      `${this.apiUrl}/categorias/${id}`,
      data
    );
  }

  // Eliminar
  eliminarCategoria(
    id: number
  ) {

    return this.http.delete(
      `${this.apiUrl}/categorias/${id}`
    );
  }
}
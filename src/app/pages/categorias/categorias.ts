import {
  Component,
  inject,
  OnInit, ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoriaService }
  from '../../core/services/categoria';

@Component({
  selector: 'app-categorias',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss'
})
export class Categorias
  implements OnInit {

  private categoriaService =
    inject(CategoriaService);
    private cdr =
  inject(ChangeDetectorRef);

  categorias: any[] = [];

  modoEdicion = false;
  categoriaId:
    number | null = null;

  nuevaCategoria = {
    nombre: '',
    descripcion: '',
    estado: true
  };

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {

    this.categoriaService
      .getCategorias()
      .subscribe({

        next: (
          response: any
        ) => {

          this.categorias =
            response;
              // refrescar vista
  this.cdr.detectChanges();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  guardarCategoria() {

    if (
      this.modoEdicion
    ) {

      this.actualizarCategoria();

    } else {

      this.crearCategoria();
    }
  }

  crearCategoria() {

    this.categoriaService
      .crearCategoria(
        this.nuevaCategoria
      )
      .subscribe({

        next: () => {

          alert(
            'Categoría creada 😎'
          );

          this.cargarCategorias();
          this.limpiarFormulario();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  editarCategoria(
    categoria: any
  ) {

    this.modoEdicion =
      true;

    this.categoriaId =
      categoria.id;

    this.nuevaCategoria = {

      nombre:
        categoria.nombre,

      descripcion:
        categoria.descripcion,

      estado:
        categoria.estado
    };
  }

  actualizarCategoria() {

    this.categoriaService
      .actualizarCategoria(
        this.categoriaId!,
        this.nuevaCategoria
      )
      .subscribe({

        next: () => {

          alert(
            'Categoría actualizada 😎'
          );

          this.cargarCategorias();

          this.modoEdicion =
            false;

          this.categoriaId =
            null;

          this.limpiarFormulario();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  eliminarCategoria(
    id: number
  ) {

    const confirmar =
      confirm(
        '¿Eliminar categoría?'
      );

    if (
      !confirmar
    ) return;

    this.categoriaService
      .eliminarCategoria(id)
      .subscribe({

        next: () => {

          alert(
            'Categoría eliminada 😎'
          );

          this.cargarCategorias();
        },

        error: (
          error: any
        ) => {

          console.error(
            error
          );
        }
      });
  }

  limpiarFormulario() {

    this.nuevaCategoria = {
      nombre: '',
      descripcion: '',
      estado: true
    };
  }


}
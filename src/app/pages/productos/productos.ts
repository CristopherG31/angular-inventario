import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../core/services/producto';
import { CategoriaService } from '../../core/services/categoria';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent implements OnInit {

  private productoService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);
  private categoriaService = inject(CategoriaService);

  productos: any[] = [];
  categorias: any[] = [];

  modoEdicion = false;
  productoId: number | null = null;

  nuevoProducto = {
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria_id: 1,
    precio_compra: null,
    precio_venta: null,
    stock: null,
    stock_minimo: null,
    estado: true
  };

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  // ======================
  // GET
  // ======================
  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (res: any) => {
        console.log('✅ PRODUCTOS API:', res);
        this.productos = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ ERROR GET:', err);
      }
    });
  }
cargarCategorias() {

  this.categoriaService
    .getCategorias()
    .subscribe({

      next: (res: any) => {
        this.categorias = res;
      },

      error: (err) => {
        console.error(err);
      }
    });
}
  // ======================
  // GUARDAR
  // ======================
  guardarProducto() {
    if (this.modoEdicion) {
      this.actualizarProducto();
    } else {
      this.crearProducto();
    }
  }

  // ======================
  // CREATE
  // ======================
  crearProducto() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        alert('Producto creado 😎');
        this.cargarProductos();
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('❌ ERROR CREATE:', err);
      }
    });
  }

  // ======================
  // EDIT
  // ======================
  editarProducto(producto: any) {
    this.modoEdicion = true;
    this.productoId = producto.id;

    this.nuevoProducto = {
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria_id: producto.categoria_id,
      precio_compra: producto.precio_compra,
      precio_venta: producto.precio_venta,
      stock: producto.stock,
      stock_minimo: producto.stock_minimo,
      estado: producto.estado
    };
  }

  // ======================
  // UPDATE
  // ======================
  actualizarProducto() {
    if (!this.productoId) return;

    this.productoService
      .actualizarProducto(this.productoId, this.nuevoProducto)
      .subscribe({
        next: () => {
          alert('Producto actualizado 😎');
          this.cargarProductos();
          this.modoEdicion = false;
          this.productoId = null;
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('❌ ERROR UPDATE:', err);
        }
      });
  }

  // ======================
  // DELETE
  // ======================
  eliminarProducto(id: number) {
    if (!confirm('¿Eliminar producto?')) return;

    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado 😎');
        this.cargarProductos();
      },
      error: (err) => {
        console.error('❌ ERROR DELETE:', err);
      }
    });
  }

  // ======================
  // RESET FORM
  // ======================
  limpiarFormulario() {
    this.nuevoProducto = {
      codigo: '',
      nombre: '',
      descripcion: '',
      categoria_id: 1,
      precio_compra: null,
      precio_venta: null,
      stock: null,
      stock_minimo: null,
      estado: true
    };
  }
}
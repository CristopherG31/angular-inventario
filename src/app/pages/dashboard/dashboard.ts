import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);

  data: any = {
    total_productos: 0,
    ventas_hoy: 0,
    ingresos_hoy: 0,
    stock_bajo: 0
  };

  ngOnInit(): void {

    // 🚀 iniciar auto refresh
    this.dashboardService.iniciarAutoRefresh(5);

    // 📡 escuchar cambios
    this.dashboardService.dashboard$
      .subscribe(data => {
        this.data = data;
         // forzar actualización de la vista
        this.cdr.detectChanges();
      });
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // 📡 estado global del dashboard
  private dashboardSubject = new BehaviorSubject<any>({
    total_productos: 0,
    ventas_hoy: 0,
    ingresos_hoy: 0,
    stock_bajo: 0
  });

  dashboard$ = this.dashboardSubject.asObservable();

  // 🔥 obtener datos API
  getResumen() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  // 🚀 refresco automático (REAL TIME SIMPLE)
  iniciarAutoRefresh(segundos: number = 10) {

    interval(segundos * 1000)
      .pipe(
        switchMap(() => this.getResumen())
      )
      .subscribe((data: any) => {
        this.dashboardSubject.next(data);
      });
  }

  // 🔁 refresco manual
  refrescar() {
    this.getResumen().subscribe((data: any) => {
      this.dashboardSubject.next(data);
    });
  }
}
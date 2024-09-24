import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { DailyLoss } from '../../interfaces/dailyLosses';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-grandes-perdidas',
  standalone: true,
  imports: [SearchBarComponent, SidebarComponent, CommonModule, FormsModule, BaseChartDirective, NgxSpinnerModule,
    MatTableModule, MatSort, MatSortModule, MatPaginator, MatPaginatorModule, MatCardModule],
  templateUrl: './grandes-perdidas.component.html',
  styleUrls: ['./grandes-perdidas.component.css']
})
export class GrandesPerdidasComponent {

  public dailyLosses: DailyLoss[] = [
    { lossDate: new Date("2024-09-02T00:00:00"), dailyLosses: 158 },
    { lossDate: new Date("2024-09-05T00:00:00"), dailyLosses: 9 },
    { lossDate: new Date("2024-09-09T00:00:00"), dailyLosses: 241 },
    { lossDate: new Date("2024-09-11T00:00:00"), dailyLosses: 8 },
    { lossDate: new Date("2024-09-12T00:00:00"), dailyLosses: 13 },
    { lossDate: new Date("2024-09-16T00:00:00"), dailyLosses: 6 },
    { lossDate: new Date("2024-09-18T00:00:00"), dailyLosses: 12 },
    { lossDate: new Date("2024-09-19T00:00:00"), dailyLosses: 41 },
    { lossDate: new Date("2024-09-21T00:00:00"), dailyLosses: 18 },
    { lossDate: new Date("2024-09-22T00:00:00"), dailyLosses: 14 },
    { lossDate: new Date("2024-09-23T00:00:00"), dailyLosses: 17 },
    { lossDate: new Date("2024-09-24T00:00:00"), dailyLosses: 487 },
    { lossDate: new Date("2024-09-26T00:00:00"), dailyLosses: 92 },
    { lossDate: new Date("2024-09-28T00:00:00"), dailyLosses: 93 },
    { lossDate: new Date("2024-09-30T00:00:00"), dailyLosses: 42 }
  ];

  chartData = [
    {
      data: this.dailyLosses.map(entry => entry.dailyLosses / 60), // Convertir a minutos
      label: 'Pérdidas Diarias (minutos)',
      backgroundColor: 'rgba(128, 128, 128, 0.2)', // Fondo gris claro
      borderColor: 'rgba(128, 128, 128, 1)', // Línea gris oscuro
      borderWidth: 2
    }
  ];

  // Formatear las fechas para el eje X
  chartLabels = this.dailyLosses.map(entry => {
    const date = new Date(entry.lossDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Formato: DD/MM/YYYY
  });

  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pérdidas (minutos)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      }
    }
  };
}

import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LossesData } from '../../interfaces/losses-data';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartTypeRegistry, ChartData, ChartConfiguration, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { LossesResponse } from '../../interfaces/losses-response';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import * as XLSX from 'xlsx';
import { DailyLoss } from '../../interfaces/dailyLosses';



Chart.register(...registerables);

@Component({
  selector: 'app-downtime',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule, FormsModule, BaseChartDirective, NgxSpinnerModule,
    MatTableModule, MatSort, MatSortModule, MatPaginator, MatPaginatorModule, MatCardModule
  ],
  templateUrl: './downtime.component.html',
  styleUrls: ['./downtime.component.css']
})
export class DowntimeComponent {
  public strDateMax: string = '';
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lines: string[] = ['Línea 1', 'Línea 2', 'Línea 3'];
  shifts = ['Turno 1', 'Turno 2'];
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  public lossesResponse: { tableData: any[] } = { tableData: [] };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Series A' },
      { data: [], label: 'Series B' }
    ]
  };
  public barChartType: keyof ChartTypeRegistry = 'bar';
  dataSource: MatTableDataSource<LossesData> = new MatTableDataSource<any>;
  public displayedColumns: string[] = [
    'l_NAME',
    'shifT_NAME',
    'o_NM',
    's_TIM_S',
    'evenT_DATE',
    'typE_LOSSES'
  ];

  //Variables PIECHART
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Configuración de la gráfica de pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Item 1', 'Item 2', 'Item 3'];

  // Cambia a ChartData<'pie'> para asegurar la correcta asignación de tipos
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  public pieChartType: ChartType = 'pie';
  //Fin de variables pieChart

  //Variables Grafica de linea Perdida Diaria
  public dailyLosses: DailyLoss[] = [
    { lossDate: new Date("2024-09-02T00:00:00"), dailyLosses: 158 },
    { lossDate: new Date("2024-09-05T00:00:00"), dailyLosses: 9 },
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
  //Fin De Las Variables de Perdida Diaria



  constructor(
    private consultaService: ConsultaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getLineNames();
    this.setDateLimit();
    this.searchForm.statusChanges?.subscribe(() => {
      this.checkFormValidity(this.searchForm);
    });

  }

  checkFormValidity(form: NgForm): void {
    const formValue = form.value || {};
    const startDate: string = formValue.startDate || '';
    const endDate: string = formValue.endDate || '';

    this.dateError = !!(startDate && endDate && new Date(startDate) > new Date(endDate));
    const isValid = form.valid !== null ? form.valid : false;
    this.isFormValid = isValid && !this.dateError;
  }

  public setDateLimit(): void {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    const monthStr = month < 10 ? '0' + month : month.toString();
    const dayStr = day < 10 ? '0' + day : day.toString();

    this.strDateMax = `${year}-${monthStr}-${dayStr}`;
  }

  public getLineNames(): void {
    this.spinner.show();
    this.consultaService.getLinesName().subscribe(
      (data: any) => {
        this.spinner.hide();
        if (data.length === 0) {
          Swal.fire({
            title: "Lo sentimos",
            text: "Sin resultados en nombres de lineas",
            icon: "error"
          });
        } else {
          this.lines = [];
          data.forEach((element: any) => {
            this.lines.push(element.name);
          });
        }
      },
      (error) => {
        this.spinner.hide();
        Swal.fire({
          title: "Error en el servidor",
          text: "Error al obtener nombres de lineas",
          icon: "error"
        });
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isFormValid) {
      const startDate = this.searchForm.value.startDate;
      const endDate = this.searchForm.value.endDate;
      const line = this.searchForm.value.line;
      const shift = this.searchForm.value.shift;
      this.spinner.show();
      this.lossesResponse = { tableData: [] };
      this.dataSource = new MatTableDataSource<any>;
      this.consultaService.getLossesData(startDate, endDate, line, shift).subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data.tableData.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            this.lossesResponse = data;
            console.log('LossesResponse:', data)
            this.dataSource = new MatTableDataSource(this.lossesResponse.tableData);
            this.dataSource.paginator = this.paginator;
            this.updateChartData(data);
          }
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: "Error en el servidor",
            text: "Error al obtener respuesta perdidas del componente downtime",
            icon: "error"
          });
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }

  private updateChartData(response: LossesResponse): void {
    const exampleLabels = response.lossesLabel;
    const exampleDataA = response.lossesLabelTime.map(value => value / 60); // Convertir de segundos a minutos
  
    this.barChartData = {
      labels: exampleLabels,
      datasets: [
        {
          data: exampleDataA,
          label: 'DownTime (Minutos)', // Cambia el label a "Minutos"
          backgroundColor: [
            '#e0e0e0', // Gris claro 1
            '#c0c0c0', // Gris claro 2
            '#a0a0a0', // Gris medio claro
            '#808080', // Gris medio
            '#606060', // Gris oscuro 1
            '#404040', // Gris oscuro 2
            '#202020'  // Gris muy oscuro
          ],
          borderColor: '#333', // Borde gris oscuro para todas las barras
          borderWidth: 1
        }
      ]
    };
    
    this.updatePieChartData(response);
    this.updateDailyLineChartData(response);
  }
  

  // NUEVO: Función para actualizar el gráfico de pie
  private updatePieChartData(response: LossesResponse): void {
    const pieLabels = response.lossesLabel;
    const pieData = response.lossesOccurrences.map(item => item.occurrences);

    this.pieChartData = {
      labels: pieLabels,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            '#D3D3D3',
            '#C0C0C0',
            '#A9A9A9',
            '#808080',
            '#696969',
            '#505050',
            '#383838',
            '#202020',
            '#101010'
          ],
          hoverBackgroundColor: [
            '#D3D3D3',
            '#C0C0C0',
            '#A9A9A9',
            '#808080',
            '#696969',
            '#505050',
            '#383838',
            '#202020',
            '#101010'
          ]
        }
      ]
      
    };

    // Asegúrate de asignar las opciones aquí
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Número De Incidencias',
          font: {
            size: 18
          }
        }
      }
    };
}


updateDailyLineChartData(response: LossesResponse) {
  //this.dailyLosses = newDailyLosses;

  this.chartData[0].data = response.dailyLosses.map(entry => entry.dailyLosses / 60); // Convertir a minutos

  // Actualizar las etiquetas del eje X
  this.chartLabels = response.dailyLosses.map(entry => {
    const date = new Date(entry.lossDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Formato: DD/MM/YYYY
  });
}

  public downloadChart(chartType: string): void {
    const canvas = document.querySelector(`canvas[data-chart-type="${chartType}"]`) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${chartType}-chart.png`;
      link.click();
    }
  }
  


  public createXlsFile(): void {
    // Obtén la fecha y hora actual del sistema
    const now = new Date();

    // Formatea la fecha y hora como 'YYYY-MM-DD HH:MM:SS'
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Agregar 1 porque los meses son 0-indexados
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Construye el nombre del archivo usando la fecha y hora
    const fileName = `Fallas Metal Line ${formattedDateTime}.xlsx`;

    // Crear la hoja de Excel desde los datos
    const ws = XLSX.utils.json_to_sheet(this.dataSource.data);

    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, fileName);
  }

}//Fin de la clase DownTime

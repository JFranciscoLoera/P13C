import { Component, ViewChild } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsultaService } from '../../services/consulta.service';
import Swal from 'sweetalert2';
import { OeeResults } from '../../interfaces/oeeResults';
import { TablaOeeResult } from '../../interfaces/tablaOeeResult';
import * as XLSX from 'xlsx';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-oee-jph',
  standalone: true,
  imports: [SearchBarComponent, SidebarComponent, CommonModule, FormsModule, BaseChartDirective, NgxSpinnerModule,
    MatTableModule, MatSort, MatSortModule, MatPaginator, MatPaginatorModule, MatCardModule],
  templateUrl: './oee-jph.component.html',
  styleUrl: './oee-jph.component.css'
})
export class OeeJphComponent {
  public strDateMax: string = '';
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lines: string[] = ['Línea 1', 'Línea 2', 'Línea 3'];
  shifts = ['Turno 1', 'Turno 2'];
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  //Fin de variables para el formulario
  public OeeResponseResult: OeeResults | undefined;
  //Variables tabla angular
  dataSource: MatTableDataSource<TablaOeeResult> = new MatTableDataSource<any>;

  public displayedColumns: string[] = [
    'SHIFT_CD',
    'LINE_NAME',
    'STATION_NAME',
    'HOUR_JPH',
    'COUNT_ST',
    'AVG_TC',
    'MODEL',
    'DATE_ST',
    'UPDATETIME'
  ];
  //Fin de variables tabla angular.

  //Variables barchar
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
  //Fin de variables Barchar

  //Variables para PieChart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Item 1', 'Item 2', 'Item 3'];
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
  //Fin de las variables para PieChart

  constructor(
    private consultaService: ConsultaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getLineNames();
    //this.setDateLimit();



    // Datos de prueba para la gráfica
    this.barChartData = {
      labels: ['Modelo A', 'Modelo B', 'Modelo C', 'Modelo D'], // Etiquetas de ejemplo
      datasets: [
        {
          data: [30, 50, 70, 40], // Datos de ejemplo
          label: 'DownTime (Minutos)',
          backgroundColor: [
            '#e0e0e0',
            '#c0c0c0',
            '#a0a0a0',
            '#808080',
          ],
          borderColor: '#333',
          borderWidth: 1
        }
      ]
    };

    this.barChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };



    this.searchForm.statusChanges?.subscribe(() => {
      this.checkFormValidity(this.searchForm);
    });

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

  checkFormValidity(form: NgForm): void {
    const formValue = form.value || {};
    const startDate: string = formValue.startDate || '';
    const endDate: string = formValue.endDate || '';

    this.dateError = !!(startDate && endDate && new Date(startDate) > new Date(endDate));
    const isValid = form.valid !== null ? form.valid : false;
    this.isFormValid = isValid && !this.dateError;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.OeeResponseResult = undefined;
      const startDate = this.searchForm.value.startDate;
      const endDate = this.searchForm.value.endDate;
      const line = this.searchForm.value.line;
      const shift = this.searchForm.value.shift;
      this.spinner.show();
      this.dataSource = new MatTableDataSource<any>;

      this.consultaService.getJPHOEE(startDate, endDate, line, shift).subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data.tablaOeeResults.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            this.OeeResponseResult = data;
            this.dataSource = new MatTableDataSource(this.OeeResponseResult?.tablaOeeResults);
            this.dataSource.paginator = this.paginator;
            this.updateChartData(this.OeeResponseResult);
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
  }//Fin de funcion OnSubmitt



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
    const fileName = `JphOee ${formattedDateTime}.xlsx`;

    // Crear la hoja de Excel desde los datos
    const ws = XLSX.utils.json_to_sheet(this.dataSource.data);

    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardar el archivo de Excel
    XLSX.writeFile(wb, fileName);
  }



  public updateChartData(response: OeeResults | undefined): void {
    if (!response) {
      console.error("Response is undefined");
      return; // Salir si response es undefined
    }



    console.log('La respuesta en UpdateChartDadaEs:', response);

    const exampleLabels = response.oeeModelResults.map(item => item.model);
    const exampleDataA = response.oeeModelResults.map(item => item.total_Pieces);

    console.log('ExampleLabels:',exampleLabels);
    console.log('ExampleData:',exampleDataA);

    this.barChartData = {
      labels: exampleLabels,
      datasets: [
        {
          data: exampleDataA,
          label: 'Piezas Producidas Por Modelo',
          backgroundColor: [
            '#e0e0e0',
            '#c0c0c0',
            '#a0a0a0',
            '#808080',
            '#606060',
            '#404040',
            '#202020'
          ],
          borderColor: '#333',
          borderWidth: 1
        }
      ]
    };

    this.updatePieChartData(response);
    //this.updateDailyLineChartData(response);
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

   // NUEVO: Función para actualizar el gráfico de pie
   private updatePieChartData(response: OeeResults | undefined): void {

    if (!response) {
      console.error("Response is undefined");
      return; // Salir si response es undefined
    }

    const pieLabels = response.oeeStationResults.map(item => item.statioN_NAME);
    const pieData = response.oeeStationResults.map(item => item.total_Count);

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
          text: 'Piezas Producidas Por Estación',
          font: {
            size: 18
          }
        }
      }
    };
}

}//Fin de la clase

import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LossesData } from '../../interfaces/losses-data';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartTypeRegistry, ChartData } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { LossesResponse } from '../../interfaces/losses-response';

Chart.register(...registerables);

@Component({
  selector: 'app-downtime',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './downtime.component.html',
  styleUrls: ['./downtime.component.css']
})
export class DowntimeComponent {
  public strDateMax: string = '';
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  public lines: string[] = ['Línea 1', 'Línea 2', 'Línea 3'];
  shifts = ['Turno 1', 'Turno 2', 'Turno 3'];
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  public lossesResponse:LossesResponse | undefined;

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
    this.updateChartData(); // Inicializa el gráfico con datos de ejemplo
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
      this.consultaService.getLossesData(startDate, endDate, line, shift).subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            this.lossesResponse = data;
            console.log('LossesResponse:',data)
            this.updateChartData();
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

  private updateChartData(): void {
    const exampleLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const exampleDataA = [10, 20, 30, 40, 50, 60, 70];
    //const exampleDataB = [15, 25, 35, 45, 55, 65, 75];

    this.barChartData = {
      labels: exampleLabels,
      datasets: [
        { data: exampleDataA, label: 'Series A' },
      //  { data: exampleDataB, label: 'Series B' }
      ]
    };
  }

  public downloadChart(): void {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    }
  }
}

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




@Component({
  selector: 'app-downtime',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule, FormsModule,BaseChartDirective],
  templateUrl: './downtime.component.html',
  styleUrl: './downtime.component.css'
})





export class DowntimeComponent {

  public strDateMax: string = '';
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  public lines: string[]  = ['Línea 1', 'Línea 2', 'Línea 3']; // Lista de líneas
  shifts = ['Turno 1', 'Turno 2', 'Turno 3']; // Lista de turnos
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  public lossesData:LossesData[]=[];


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
    let month = currentDate.getMonth() + 1; // Los meses en JS son de 0-11
    let day = currentDate.getDate();

    // Formatear el mes y el día para asegurarse de que sean de dos dígitos
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
          this.lines= [];
          data.forEach((element: any) => {
            this.lines.push(element.name)
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
      const line =this.searchForm.value.line;
      const shift=this.searchForm.value.shift;
      this.spinner.show();
      this.consultaService.getLossesData(startDate, endDate,line,shift).subscribe(
        (data: any) => {
          this.spinner.hide();
          //this.dataSource=new MatTableDataSource<any>;
          if (data.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            console.log('El Data de Downtime es:',data)
            //this.dataSource = new MatTableDataSource(data);
            //this.dataSource.paginator = this.paginator;
            //this.blnShowTable = true;
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

}//Fin de la clase DownTimeComponet

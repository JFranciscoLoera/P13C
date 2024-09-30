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
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ConsultaService } from '../../services/consulta.service';

@Component({
  selector: 'app-grandes-perdidas',
  standalone: true,
  imports: [SearchBarComponent, SidebarComponent, CommonModule, FormsModule, BaseChartDirective, NgxSpinnerModule,
    MatTableModule, MatSort, MatSortModule, MatPaginator, MatPaginatorModule, MatCardModule],
  templateUrl: './grandes-perdidas.component.html',
  styleUrls: ['./grandes-perdidas.component.css']
})
export class GrandesPerdidasComponent {

  public strDateMax: string = '';
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lines: string[] = ['Línea 1', 'Línea 2', 'Línea 3'];
  shifts = ['Turno 1', 'Turno 2'];
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  //Fin de variables para el formulario

  constructor(
    private consultaService: ConsultaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    //this.getLineNames();
    //this.setDateLimit();
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
          if (data.tableData.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {

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



}//Fin De La Calse

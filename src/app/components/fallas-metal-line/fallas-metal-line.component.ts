import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { MetalLineFailureData } from '../../interfaces/metal-line-failiure-data';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fallas-metal-line',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule],
  templateUrl: './fallas-metal-line.component.html',
  styleUrls: ['./fallas-metal-line.component.css']
})
export class FallasMetalLineComponent implements OnInit {
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isFormValid: boolean = false;
  public dateError: boolean = false;
  public blnShowTable:boolean=false;

  public displayedColumns: string[] = ['id', 'shop_Name', 'failure_Date', 'failure_Shift', 'failure_No',
     'from_Time', 'to_Time', 'failure_Time', 'cause_No', 'comment_Data'];
  dataSource: MatTableDataSource<MetalLineFailureData>= new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  public strDateMax: string='';

  constructor(
    private consultaService: ConsultaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.setDateLimit();
    this.searchForm.statusChanges?.subscribe(() => {
      this.checkFormValidity(this.searchForm);
    });
  }

  public setDateLimit():void{
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Los meses en JS son de 0-11
    let day = currentDate.getDate();

    // Formatear el mes y el día para asegurarse de que sean de dos dígitos
    const monthStr = month < 10 ? '0' + month : month.toString();
    const dayStr = day < 10 ? '0' + day : day.toString();

    this.strDateMax = `${year}-${monthStr}-${dayStr}`;
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
      this.blnShowTable=false;
      this.spinner.show();
      this.consultaService.getMetalLineFailureData(startDate, endDate).subscribe(
        (data: MetalLineFailureData[]) => {
          this.spinner.hide();
          if (data.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.blnShowTable=true;
          }
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: "Error en el servidor",
            text: "Error al obtener respuesta Fallos Metal Line",
            icon: "error"
          });
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }
}

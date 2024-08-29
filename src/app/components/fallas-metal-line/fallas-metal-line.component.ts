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
import * as XLSX from 'xlsx';





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
  public blnShowTable: boolean = false;
  public displayedColumns: string[] = ['id', 'shop_Name', 'failure_Date', 'failure_Shift', 'failure_No',
    'from_Time', 'to_Time', 'failure_Time', 'cause_No', 'comment_Data'];
  dataSource: MatTableDataSource<MetalLineFailureData> = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  public strDateMax: string = '';




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

  checkFormValidity(form: NgForm): void {
    const formValue = form.value || {};
    const startDate: string = formValue.startDate || '';
    const endDate: string = formValue.endDate || '';

    this.dateError = !!(startDate && endDate && new Date(startDate) > new Date(endDate));
    const isValid = form.valid !== null ? form.valid : false;
    this.isFormValid = isValid && !this.dateError;
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

  onSubmit(): void {
    if (this.isFormValid) {
      const startDate = this.searchForm.value.startDate;
      const endDate = this.searchForm.value.endDate;
      this.blnShowTable = false;
      this.spinner.show();
      this.consultaService.getMetalLineFailureData(startDate, endDate).subscribe(
        (data: MetalLineFailureData[]) => {
          this.spinner.hide();
          this.dataSource=new MatTableDataSource<any>;
          if (data.length === 0) {
            Swal.fire({
              title: "Lo sentimos",
              text: "Sin resultados en el rango seleccionado",
              icon: "error"
            });
          } else {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.blnShowTable = true;
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


}//Fin de la Clase fallas-metal-line

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConsultaService } from '../../services/consulta.service';
import { MetalLineFailureData } from '../../interfaces/metal-line-failiure-data';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fallas-metal-line',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxSpinnerModule],
  templateUrl: './fallas-metal-line.component.html',
  styleUrls: ['./fallas-metal-line.component.css']
})
export class FallasMetalLineComponent {
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  public isFormValid: boolean = false;
  public dateError: boolean = false; // Nueva variable para el error de fecha
  public metalLineFailuresList: MetalLineFailureData[] = []; // Arreglo para almacenar los datos de fallas

  constructor(
    private consultaService: ConsultaService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en el estado del formulario
    this.searchForm.statusChanges?.subscribe(() => {
      this.checkFormValidity(this.searchForm);
    });
  }

  // Método para verificar la validez del formulario y la validación personalizada de fechas
  checkFormValidity(form: NgForm): void {
    const formValue = form.value || {}; // Asegura que form.value no sea null o undefined
    const startDate: string = formValue.startDate || ''; // Manejo de fecha de inicio
    const endDate: string = formValue.endDate || ''; // Manejo de fecha de fin

    // Validar que la fecha de inicio no sea mayor que la fecha de fin
    this.dateError = !!(startDate && endDate && new Date(startDate) > new Date(endDate));
    // Usar valores predeterminados para asegurar que isFormValid sea siempre booleano
    const isValid = form.valid !== null ? form.valid : false;
    this.isFormValid = isValid && !this.dateError;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.isFormValid) {
      const startDate = this.searchForm.value.startDate;
      const endDate = this.searchForm.value.endDate;

      console.log('Formulario enviado', { startDate, endDate });
      this.spinner.show();
      this.consultaService.getMetalLineFailureData(startDate, endDate).subscribe(
        (data: MetalLineFailureData[]) => {
          this.spinner.hide();
          this.metalLineFailuresList = data; // Asigna los datos al arreglo
          console.log('Datos recibidos:', this.metalLineFailuresList);
        },
        (error) => {
          this.spinner.hide();
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }
}

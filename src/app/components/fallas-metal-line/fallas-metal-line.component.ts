import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-fallas-metal-line',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fallas-metal-line.component.html',
  styleUrls: ['./fallas-metal-line.component.css']
})
export class FallasMetalLineComponent {
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  isFormValid: boolean = false;
  dateError: boolean = false; // Nueva variable para el error de fecha

  constructor() { }

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
      console.log('Formulario enviado');
      // Aquí manejas el envío del formulario
    }
  }
}

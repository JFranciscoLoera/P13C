import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchForm', { static: true }) searchForm!: NgForm;
  lines = ['Línea 1', 'Línea 2', 'Línea 3']; // Lista de líneas
  shifts = ['Turno 1', 'Turno 2', 'Turno 3']; // Lista de turnos
  isFormValid: boolean = false;
  dateError: boolean = false; // Nueva variable para el error de fecha
  @Output() searchParamsChanged = new EventEmitter<any>();

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
      const params = {
        startDate: this.searchForm.value.startDate,
        endDate: this.searchForm.value.endDate,
        line: this.searchForm.value.line,
        shift: this.searchForm.value.shift
      };
      this.searchParamsChanged.emit(params);
      console.log('Formulario enviado');
    }
  }
}

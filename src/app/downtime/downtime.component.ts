import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-downtime',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './downtime.component.html',
  styleUrl: './downtime.component.css'
})
export class DowntimeComponent {

}

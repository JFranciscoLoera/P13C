import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-downtime',
  standalone: true,
  imports: [SidebarComponent,SearchBarComponent],
  templateUrl: './downtime.component.html',
  styleUrl: './downtime.component.css'
})
export class DowntimeComponent {

}

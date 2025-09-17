import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Gantt from 'frappe-gantt';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frappeganttexample';

  @ViewChild('gantt', { static: true }) ganttElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  timeboxes = [
    {
      id: 'tbx-1',
      name: 'Timebox 1 Diseño',
      start: '2025-09-16',
      end: '2025-09-20',
      progress: 40,
      dependencies: '',
    },
    {
      id: 'tbx-2',
      name: 'Timebox 2 Desarrollo',
      start: '2025-09-21',
      end: '2025-09-28',
      progress: 20,
      dependencies: 'Timebox 2',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('frappe-gantt').then(({ default: Gantt }) => {
        new Gantt(this.ganttElement.nativeElement, this.timeboxes, {
          view_mode: 'Day', // opciones: 'Day', 'Week', 'Month'
          language: 'es',
        });
      });
    }
  }
}

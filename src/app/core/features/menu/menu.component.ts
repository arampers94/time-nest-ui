import { Component } from '@angular/core';
import { TeamSelectComponent } from '../../../shared/ui/team-select/team-select.component';

@Component({
  selector: 'app-menu',
  imports: [TeamSelectComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}

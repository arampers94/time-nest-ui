import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/features/menu/menu.component';
import { TeamsStore } from './store/teams.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Time Nest';
  public readonly teamsStore = inject(TeamsStore);

  public ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.teamsStore.getTeamsByUserId(1);
  }
}

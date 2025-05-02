import { Component, input } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { ListData } from '../../../core/interfaces';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-list',
  imports: [NzListModule, NzEmptyModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public listData = input<ListData[]>();
  public noContentText = input<string>('No data available');
}

import { Component, input } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { ListData } from '../../../core/interfaces';

@Component({
  selector: 'app-list',
  imports: [NzListModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  listData = input<ListData[]>();
}

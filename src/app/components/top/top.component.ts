import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent {
  @Input() pageName: string = '';
  @Input() goToPage: string = '';
}

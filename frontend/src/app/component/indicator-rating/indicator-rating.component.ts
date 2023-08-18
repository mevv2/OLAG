import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-rating-cell-renderer',
  template: `
    <span *ngFor="let star of stars" [class.filled]="star <= value">★</span>
  `,
  styles: [`
    span {
      font-size: 20px;
      cursor: pointer;
      color: white;
      text-shadow: -1px 0 #3f51b5, 0 1px #3f51b5, 1px 0 #3f51b5, 0 -1px #3f51b5; 
    }
    .filled {
      color: #3f51b5;
    }
  `]
})
export class RatingComponent implements ICellRendererAngularComp {
  private params: any;
  public value: number;
  public stars = [1, 2, 3, 4, 5, 6];

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value || 0;
  }

  refresh(params: any): boolean {
    return false;
  }
}


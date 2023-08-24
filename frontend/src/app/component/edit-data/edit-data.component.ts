import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { RatingComponent } from '../../component/indicator-rating/indicator-rating.component';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
  
  gridApi;
  columnApi;

  public gridOptions: any = {
    suppressRowClickSelection: true
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  
  
  rowData = [];
  
  columnDefs = [
    { headerName: 'Learning Event', field: 'LearningEvent', width: 150 , resizable: true, editable: true },
    { headerName: 'Learning Activity', field: 'LearningActivity', width: 150, resizable: true, editable: true },
    { headerName: 'Indicator', field: 'Indicator', width: 300, resizable: true, editable: true },
    { checkboxSelection: true, headerName: 'Verdict', width: 80 },
    { headerName: 'Rating', field: 'rating',cellRendererFramework: RatingComponent, width: 150 }
  ];

  rowSelection = 'multiple';
  
  getSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log('Selected data:', selectedData);
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getdata().subscribe((data: any) => {
      const cellData = [];
      data.forEach(item => {
        item.LearningActivities.forEach(activity => {
          activity.indicator.forEach(ind => {
            cellData.push({
              LearningEvent: item.LearningEvents,
              LearningActivity: activity.Name,
              Indicator: ind.indicatorName
            });
          });
        });
      });
      this.rowData = cellData;
    });      
  }
  
  onCellValueChanged(event) {
    if (event.newValue !== event.oldValue) {
      const changedData = {
        oldValue: event.oldValue,
        newValue: event.newValue,
      };
  
      this.dataService.saveChangedData(changedData).subscribe(response => {
        console.log('Daten erfolgreich gespeichert!', response);
      }, error => {
        console.error('Fehler beim Speichern der Daten:', error);
      });
    }
  }
  
}


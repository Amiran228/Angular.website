import { Component, OnInit } from '@angular/core';
import { DataService, Character } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lvl', 'power', 'abilities', 'actions'];
  dataSource: Character[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSource = this.dataService.getData();
  }


  deleteRow(element: Character): void {
    this.dataSource = this.dataSource.filter(character => character !== element);
  }
}

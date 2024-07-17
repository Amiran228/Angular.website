import { Component, OnInit } from '@angular/core';
import { DataService, Character } from '../data.service';
import { FormControl } from '@angular/forms';

interface Msort {
  value: string;
  viewValue: string;
}

export interface myModel {
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  sortDirection: string = 'up';
  ability = new FormControl('');
  searchTerm: string = '';
  newAbility: string = '';
  lvlfrom: number = 1;
  lvlto: number = 10;
  selectedAbilities: string[] = []; 
  sortByControl: FormControl = new FormControl('up');
  abilities: string[] = ['Суперсила', 'Умение летать', 'Телепатия', 'Суперскорость'];
  filteredAbilities = this.abilities
  character: Character = {
    name: '',
    lvl: 0,
    power: 0,
    abilities: []
  };
  

  Sort: Msort[] = [
    { value: 'up', viewValue: 'По возрастанию' },
    { value: 'down', viewValue: 'По убыванию' },
  ];
  sortDatalvl() {
    if (this.sortDirection === 'down') {
      this.dataSource.sort((a, b) => a.lvl - b.lvl);
    } else if (this.sortDirection === 'up') {
      this.dataSource.sort((a, b) => b.lvl - a.lvl);
    }
  }
  filterAbilities(event: any) {
    const searchText = event.target.value.toLowerCase();
    this.filteredAbilities = this.abilities.filter(ability => ability.toLowerCase().includes(searchText));
  }
  filterByName() {
    if (this.searchTerm.trim() !== '') {
      this.dataSource = this.dataSource.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.dataSource = this.dataService.getData();
    }
  }
  filterByAbility() {
    if (this.searchTerm.trim() !== '') {
      this.dataSource = this.dataSource.filter(character =>
        character.abilities.includes(this.searchTerm)
      );
    } else {
      this.dataSource = this.dataService.getData();
    }
  }
  
  filterByLevel() {
    const filteredByName = this.searchTerm.trim() !== '' ?
      this.dataSource.filter(character => character.name.toLowerCase().includes(this.searchTerm.toLowerCase())) :
      this.dataSource;
  
    this.dataSource = filteredByName.filter(character => 
      character.lvl >= this.lvlfrom && character.lvl <= this.lvlto
    );
  }
  dataSource: Character[] = [];

  constructor(private dataService: DataService) { }

  items: Array<myModel> = [{ title: 'Имя: ', description: '', }];
  

  addItem() {
    this.items.push({ title: 'Имя: ' + this.character.name, description: '' });
  }

  ngOnInit(): void {
    this.dataSource = this.dataService.getData();
  }
  


  addAbility() {
    if (this.newAbility.trim() !== '' && !this.abilities.includes(this.newAbility.trim())) {
      this.abilities.push(this.newAbility.trim());
      this.character.abilities = [...this.character.abilities, this.newAbility.trim()];
      this.newAbility = '';
    }
  }
  deleteRow(element: Character): void {
    this.dataSource = this.dataSource.filter(character => character !== element);
  }

  addCharacter(): void {
    if (this.character.name && this.character.lvl > 0 && this.character.power > 0 && this.character.lvl < 11 && this.character.power < 11 && this.character.abilities.length > 0) {
      const newCharacter: Character = {
        ...this.character,
        abilities: [...this.character.abilities]
      };
      this.dataService.addData(newCharacter);
      this.character = { name: '', lvl: 0, power: 0, abilities: [] };
    }
  }
}

import { Injectable } from '@angular/core';

export interface Character {
  name: string;
  lvl: number;
  power: number;
  abilities: string[];
}

const ELEMENT_DATA: Character[] = [
  {name: 'Человек-паук', lvl: 5, power: 5, abilities: ['Полет на паутине', 'Скорость']},
  {name: 'Железный человек', lvl: 10, power: 10, abilities: ['Возможность держать перчатку с камнями бесконечности', 'Деньги']},
  {name: 'Халк', lvl: 8, power: 9, abilities: ['Суперсила']},
];

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: Character[] = ELEMENT_DATA;

  getData(): Character[] {
    
    return this.data.filter(character => character.lvl % 2 == 0);
  }
  addData(character: Character): void {
    this.data.push(character);
  }
}

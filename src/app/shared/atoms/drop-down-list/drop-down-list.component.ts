import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryResponse } from '@model/category-response';

export interface Item {
  id: number;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit {
  @Input() listOfData: CategoryResponse[] = [{ id: 0, name: '', description: '' }, { id: 1, name: '', description: '' }];
  @Input() selectionLimit: number = 3;
  dropdownOpen = false;
  items: Item[] = [];
  @Output() ids: EventEmitter<number[]> = new EventEmitter<number[]>();
  selectedsIds: number[] = [];
  selectedItems: Item[] = [];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onItemSelect(item: Item) {
    if (item.selected) {
      this.selectedItems.push(item);
      this.selectedsIds.push(item.id);
      this.ids.emit(this.selectedsIds);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.name !== item.name);
      this.selectedsIds = this.selectedsIds.filter(i => i !== item.id);
      this.ids.emit(this.selectedsIds);
    }
  }

  canSelectMoreItems(): boolean {
    return this.selectedItems.length < this.selectionLimit;
  }

  handleSelection(item: Item): number {
    if (item.selected) {
      item.selected = false;
      this.onItemSelect(item);
      return 0;
    }
    if (!item.selected && this.canSelectMoreItems()) {
      item.selected = true;
      this.onItemSelect(item);
      return 1;
    }
    return -1;
  }

  ngOnInit(): void {
    this.items = this.listOfData.map(item => ({ id: item.id , name: item.name, selected: false }));
  }

}

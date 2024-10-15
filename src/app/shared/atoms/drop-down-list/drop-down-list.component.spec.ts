import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropDownListComponent , Item} from './drop-down-list.component';
import { CategoryResponse } from '@model/category-response';

  describe('DropDownListComponent', () => {
    let component: DropDownListComponent;
    let fixture: ComponentFixture<DropDownListComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [DropDownListComponent]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(DropDownListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize items from listOfData on ngOnInit', () => {
      const mockData: CategoryResponse[] = [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' }
      ];
      component.listOfData = mockData;
      component.ngOnInit();
      expect(component.items.length).toBe(2);
      expect(component.items[0].name).toBe('Category 1');
      expect(component.items[1].name).toBe('Category 2');
    });

    it('should toggle dropdownOpen when toggleDropdown is called', () => {
      component.dropdownOpen = false;
      component.toggleDropdown();
      expect(component.dropdownOpen).toBeTruthy();
      component.toggleDropdown();
      expect(component.dropdownOpen).toBeFalsy();
    });

    it('should add item to selectedItems and selectedsIds when onItemSelect is called with selected item', () => {
      const item: Item = { id: 1, name: 'Item 1', selected: true };
      component.onItemSelect(item);
      expect(component.selectedItems).toContain(item);
      expect(component.selectedsIds).toContain(item.id);
    });

    it('should remove item from selectedItems and selectedsIds when onItemSelect is called with unselected item', () => {
      const item: Item = { id: 1, name: 'Item 1', selected: true };
      component.selectedItems.push(item);
      component.selectedsIds.push(item.id);
      item.selected = false;
      component.onItemSelect(item);
      expect(component.selectedItems).not.toContain(item);
      expect(component.selectedsIds).not.toContain(item.id);
    });

    it('should return true from canSelectMoreItems if selectedItems length is less than selectionLimit', () => {
      component.selectionLimit = 3;
      component.selectedItems = [{ id: 1, name: 'Item 1', selected: true }];
      expect(component.canSelectMoreItems()).toBeTruthy();
    });

    it('should return false from canSelectMoreItems if selectedItems length is equal to selectionLimit', () => {
      component.selectionLimit = 1;
      component.selectedItems = [{ id: 1, name: 'Item 1', selected: true }];
      expect(component.canSelectMoreItems()).toBeFalsy();
    });

    it('should handle selection correctly when handleSelection is called', () => {
      const item: Item = { id: 1, name: 'Item 1', selected: false };
      const result = component.handleSelection(item);
      expect(result).toBe(1);
      expect(item.selected).toBeTruthy();
      expect(component.selectedItems).toContain(item);
      expect(component.selectedsIds).toContain(item.id);

      const result2 = component.handleSelection(item);
      expect(result2).toBe(0);
      expect(item.selected).toBeFalsy();
      expect(component.selectedItems).not.toContain(item);
      expect(component.selectedsIds).not.toContain(item.id);
    });

    it('should not add item to selectedItems and selectedsIds when handleSelection is called with unselected item and canSelectMoreItems returns false', () => {
      component.selectionLimit = 1;
      const item: Item = { id: 1, name: 'Item 1', selected: false };
      const result = component.handleSelection(item);
      expect(result).toBe(1);
      expect(item.selected).toBeTruthy();
      expect(component.selectedItems).toContain(item);
      expect(component.selectedsIds).toContain(item.id);

      const item2: Item = { id: 2, name: 'Item 2', selected: false };
      const result2 = component.handleSelection(item2);
      expect(result2).toBe(-1);
      expect(item2.selected).toBeFalsy();
      expect(component.selectedItems).not.toContain(item2);
      expect(component.selectedsIds).not.toContain(item2.id);
    });
  });



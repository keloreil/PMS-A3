import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage {
  searchName = '';
  item: any = null;

  constructor(private api: ApiService) {}

  searchItem() {
    if (!this.searchName.trim()) {
      alert('Please enter the name to search');
      return;
    }

    this.api.getByName(this.searchName).subscribe({
      next: (data) => {
        if (!data || Object.keys(data).length === 0) {
          alert('Item not found');
          this.item = null;
        } else {
          console.log('Search result:', data);
          this.item = data[0];
        }
      },
      error: (err) => {
        console.error('Search error:', err);
        alert('An error occurred while searching, please try again later');
        this.item = null;
      },
    });
  }

  updateItem() {
    this.api.updateItem(this.searchName, this.item).subscribe({
      next: () => alert('Update successful!'),
      error: () => alert('Update failed!'),
    });
  }

  deleteItem() {
    if (this.searchName.toLowerCase() === 'laptop') {
      alert('Cannot delete the record named "Laptop"');
      return;
    }

    this.api.deleteItem(this.searchName).subscribe({
      next: () => {
        alert('Deletion successful!');
        this.item = null;
      },
      error: () =>
        alert('Deletion failed, please check if the name is correct'),
    });
  }

  showHelp() {
    alert('Enter a name to search, then you can update or delete the item.');
  }
}

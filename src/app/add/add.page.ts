import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  item = {
    item_id: null,
    item_name: '',
    category: '',
    quantity: null,
    price: null,
    supplier_name: '',
    stock_status: '',
    featured_item: 0,
    special_note: '',
  };

  featuredItems: any[] = [];

  constructor(private api: ApiService) {}

  ionViewWillEnter() {
    this.loadFeatured();
  }
  getStockColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'stock-green';
      case 'low stock':
        return 'stock-yellow';
      case 'out of stock':
        return 'stock-red';
      default:
        return '';
    }
  }
  loadFeatured() {
    this.api.getAll().subscribe((data) => {
      this.featuredItems = data.filter((item: any) => item.featured_item === 1);
    });
  }

  addItem() {
    if (!this.item.item_name || !this.item.item_id || !this.item.category) {
      alert('Please fill in all required fields.');
      return;
    }

    this.api.addItem(this.item).subscribe({
      next: () => {
        alert('Item added successfully!');
        this.item = {
          item_id: null,
          item_name: '',
          category: '',
          quantity: null,
          price: null,
          supplier_name: '',
          stock_status: '',
          featured_item: 0,
          special_note: '',
        };
        this.loadFeatured();
      },
      error: () => alert('Failed to add item. Please check the data format.'),
    });
  }

  showHelp() {
    alert('Enter the name, ID, and quantity, then click "Add Item".');
  }
}

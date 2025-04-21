import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common'; // 导入 CommonModule
import { FormsModule } from '@angular/forms'; // 导入 FormsModule
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule], // 添加 HttpClientModule
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  items: any[] = [];
  searchName = '';

  constructor(private apiService: ApiService) {}

  ionViewWillEnter() {
    this.loadAll();
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
  loadAll() {
    this.apiService.getAll().subscribe((data) => (this.items = data));
  }

  search() {
    if (this.searchName.trim()) {
      this.apiService.getByName(this.searchName.trim()).subscribe((data) => {
        this.items = data;
      });
    } else {
      this.loadAll();
    }
  }

  showHelp() {
    alert('Search or view all inventory records on this page.');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Supplier } from '../supplier.dto';
import { SupplierService } from '../supplier.service';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-suppliers-list',
  imports: [MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './suppliers-list.component.html',
  styles: ``
})
export class SuppliersListComponent implements OnInit {
  suppliers!: Supplier[];
  constructor(private supplierService: SupplierService) { }
  async ngOnInit() {
    this.suppliers = await this.supplierService.getAll();
  }

}

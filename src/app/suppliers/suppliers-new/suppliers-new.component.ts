import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormComponent } from '../form/form.component';
import { Supplier } from '../supplier.dto';
import { SupplierService } from '../supplier.service';
import { NewSupplier } from '../NewSupplier.dto';
@Component({
  selector: 'app-suppliers-new',
  imports: [MatCardModule, FormComponent],
  templateUrl: './suppliers-new.component.html',
  styles: ``
})
export class SuppliersNewComponent {
  constructor(private supplierService: SupplierService) { }
  async saveSupplier(supplier: Supplier) {
    const newSupplier: NewSupplier = { name: supplier.name, description: supplier.description };
    const doc = await this.supplierService.add(newSupplier);
    alert('Salvo' + doc.id);
  }
}

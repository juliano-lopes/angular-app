import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from './supplier.dto';
import { NewSupplier } from './NewSupplier.dto';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {
  delete(supplier: Supplier) {
    const docRef = doc(this.firestore, "suppliers", supplier && supplier.id ? supplier.id : '');
    return deleteDoc(docRef);
  }
  update(supplier: Supplier) {
    const docRef = doc(this.firestore, "suppliers", supplier.id ? supplier.id : '');
    return updateDoc(docRef, { name: supplier.name, description: supplier.description });
  }
  constructor(private firestore: Firestore) { }
  add(newSupplier: NewSupplier) {
    console.log("adicionando", newSupplier);
    const suppliersRef = collection(this.firestore, 'suppliers');
    return addDoc(suppliersRef, newSupplier);

  }
async getAll() {
  const querySnapshot = await getDocs(collection(this.firestore, "suppliers"));
  const suppliers: Supplier[] = [];
  querySnapshot.forEach((doc) => {
  const supplierData: NewSupplier = doc.data() as NewSupplier;  
const supplier: Supplier = {
id: doc.id, ...supplierData
};
suppliers.push(supplier);
  });
  return suppliers;
}
}


import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesItem } from './category.dto';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  delete(category: CategoriesItem) {
    const docRef = doc(this.firestore, "categories", category && category.id ? category.id : '');
    return deleteDoc(docRef);
  }
  update(category: CategoriesItem) {
    const docRef = doc(this.firestore, "categories", category.id ? category.id : '');
    return updateDoc(docRef, { name: category.name, description: category.description });
  }
  constructor(private firestore: Firestore) { }
  add(newCategory: CategoriesItem) {
    const categoriesRef = collection(this.firestore, 'categories');
    return addDoc(categoriesRef, newCategory);
  }

  getAll(): Observable<CategoriesItem[]> {
    const categoriesCollection = collection(this.firestore, 'categories');

    return from(getDocs(categoriesCollection)).pipe(
      map((querySnapshot) => {
        const categories: CategoriesItem[] = [];
        querySnapshot.forEach((doc) => {
          const categoryData = doc.data();
          categories.push({
            id: doc.id,
            name: categoryData['name'],
            description: categoryData['description']
          });
        });
        console.log("retornando categorias", categories);
        return categories;
      })
    );
  }
}


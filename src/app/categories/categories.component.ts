import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesItem } from './category.dto';
import { lastValueFrom } from 'rxjs';
import { CategoryService } from './category.service';
import { CategoriesDataSource } from './categories-datasource';
import { CategoryFormComponent } from './form/form.component';
import { LoadingBarComponent } from "../loading-bar.component";
import { AuthGuard } from '../services/AuthGuard.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatButtonModule, CategoryFormComponent, MatIconModule, LoadingBarComponent, CommonModule]
})
export class CategoriesComponent implements AfterViewInit {
  showLoading: boolean = false;
  category!: CategoriesItem;
  showForm: boolean = false;
  dataSource!: CategoriesDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  constructor(private categoryService: CategoryService, protected auth: AuthGuard) {
    this.getCategories().then((categories) => {
      this.dataSource = new CategoriesDataSource(categories);
    });

  }

  //dataSource = new CategoriesDataSource(this.EXAMPLE_DATA);
  //dataSource = new MatTableDataSource<Category>(); 

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'action'];

  ngAfterViewInit(): void {
    this.loadCategories();
  }
  async getCategories(): Promise<CategoriesItem[]> {
    const categories = await lastValueFrom(this.categoryService.getAll());
    console.log("retornando", categories);
    return categories;
  }
  async loadCategories() {
    this.showLoading = true;

    const categories = await this.getCategories();
    this.dataSource = new CategoriesDataSource(categories);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.showLoading = false;

  }


  onNewCategoryClick() {
    this.category = { id: '', name: '', description: '' };
    this.showForm = !this.showForm;
  }
  saveCategory(category: CategoriesItem) {
    this.showLoading = true;

    if (category.id) {
      this.categoryService.update(category).then(() => {
        this.loadCategories();
        alert('atualizada, ' + JSON.stringify(category));
        this.showLoading = false;

      }).catch((error) => {
        this.showLoading = false;

        alert('Erro ao salvar categoria, ' + error);

      });

    } else {
      this.categoryService.add(category).then(() => {
        this.loadCategories();
        this.showLoading = false;
        alert('salva, ' + JSON.stringify(category));

      }).catch((error) => {
        this.showLoading = false;

        alert('Erro ao salvar categoria, ' + error);
      });
    }

  }
  onEditCategoryClick(category: CategoriesItem) {
    this.category = category;
    console.log("editar", this.category);

    this.showForm = true;

  }
  onDeleteCategoryClick(category: CategoriesItem) {
    console.log("excluir", this.category);
    this.showLoading = true;

    if (window.confirm("Deseja realmente excluir a categoria " + category.name + "?")) {
      this.categoryService.delete(category).then(() => {
        this.loadCategories();
        this.showLoading = false;

        alert("Categoria " + category.name + " excluída com sucesso.");

      }).catch((error) => {
        this.showLoading = false;
        alert("Não foi possível excluir a categoria " + category.name);
      });
    }
  }


}

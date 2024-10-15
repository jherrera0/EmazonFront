import { BrandService } from '@service/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '@service/article.service';
import { ToastService } from '@service/toast.service';
import { CategoryService } from '@service/category.service';
import { ArticleRequest } from '@model/article-request.model';
import { BrandResponse, PaginationBrand } from '@model/brand-response.model';
import { CategoryResponse, PaginationCategory } from '@model/category-response';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public createArticleForm: FormGroup;
  public brands: PaginationBrand<BrandResponse[]> = {
    items: [],
    pageSize: 0,
    totalPages: 0,
    currentPage: 0
  };
  public categories: PaginationCategory<CategoryResponse[]> = {
    items: [],
    pageSize: 0,
    totalPages: 0,
    currentPage: 0
  };
  brandSelected: number = 0;
  categoriesSelected: number[] = [];

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  constructor(private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService,
    private readonly toastService: ToastService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
  ) {
    this.createArticleForm = this.formBuilder.group({
      articleName:[
        '',
        [
          Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)
        ],
      ],
      articleDescription:[
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[^@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`¡¿!]+$/)
        ],
      ],
      articlePrice:[
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ]
      ],
      articleStock:[
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^\d+$/)
        ]
      ],
    });
  }

  createArticle(){
    let article: ArticleRequest ={
      name: this.createArticleForm.value.articleName,
      description: this.createArticleForm.value.articleDescription,
      price: this.createArticleForm.value.articlePrice,
      brandId: this.brandSelected,
      categoriesId: this.categoriesSelected,
      stock: this.createArticleForm.value.articleStock
    }
     this.articleService.saveArticle(article).subscribe({
      next: () => { this.toastService.showToast('Article saved successfully', 'success'); },
      error: () => { this.toastService.showToast(this.articleService.getErrorMessage(), 'error'); },
    });
  }

  getBrands(page:number = 0, size:number = 1000, sortDirection:string = 'asc'){
    this.brandService.getBrands(page, size, sortDirection).subscribe((data) => {
      this.brands = data;
    });
  }

  getCategories(){
    this.categoryService.getCategories(0, 1000, 'asc').subscribe(data => {
      this.categories = data;}
    )};

  get articleNameError(): string {
    const control = this.createArticleForm.get('articleName');
    if(control?.hasError('required') || control?.hasError('minlength') || control?.hasError('pattern')){
      return 'Valid article name is required';
    }
    return '';
  }

  get articleDescriptionError(): string {
    const control = this.createArticleForm.get('articleDescription');
    if(control?.hasError('required') || control?.hasError('minlength') || control?.hasError('pattern')){
      return 'Valid article description is required';
    }
    return '';
  }

  get articlePriceError(): string {
    const control = this.createArticleForm.get('articlePrice');
    if(control?.hasError('required') || control?.hasError('min')|| control?.hasError('pattern')){
      return 'Valid article price is required';
    }
    return '';
  }

  get articleStockError(): string {
    const control = this.createArticleForm.get('articleStock');
    if(control?.hasError('required') || control?.hasError('min')|| control?.hasError('pattern')){
      return 'Valid article stock is required';
    }
    return '';
  }

  onBrandIdCaptured(ids: number[]){
      this.brandSelected = ids[0];
  }
  onCategoriesIdCaptured(ids: number[]){
    this.categoriesSelected = ids;
  }
  isButtonDisabled(): boolean {
    return !this.brandSelected || this.categoriesSelected.length === 0 || this.createArticleForm.invalid;
  }
}

export class PageCustom<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  items: Array<T>;

  constructor(currentPage: number, pageSize: number, totalPages: number, items: Array<T>) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.items = items;
  }

  static empty<T>(): PageCustom<T> {
    return new PageCustom(0, 0, 0, []);
  }
}



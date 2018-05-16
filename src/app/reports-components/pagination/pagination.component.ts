import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  pages : number = 4;
  pageSize : number = 5;
  currentIndex : number = 1;
  pagesIndex : Array<number>;
  pageStart : number = 1;
  currentPageNumber:number;

  tableStartIndex:number;
  tableEndIndex:number;

  @Input() arrayLen;
  @Output() arrayIndex=[];
  @Output() arrayValues = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.currentIndex = 1;
    this.pages = this.findPages(this.arrayLen);
    this.pagesIndex =  this.fillArray();
   /*  console.log(this.pagesIndex); */
    this.findTableIndex(this.currentIndex);
  }

  findPages(num){
    let pages = Math.ceil(num/this.pageSize);
    return pages;
  }

  fillArray(): any{
    var obj = new Array();  
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
      obj.push(index);
    }
    return obj;   
  }

  setPage(index){
    this.currentIndex= index;
    this.findTableIndex(this.currentIndex);
  }

  prevPage(){
    if(this.currentIndex>1){
      this.currentIndex= this.currentIndex-1;
    }
    this.findTableIndex(this.currentIndex);
  }

  nextPage(){
    if(this.currentIndex<this.pagesIndex.length){
      this.currentIndex= this.currentIndex+1;
    }
    this.findTableIndex(this.currentIndex);
  }

  findTableIndex(index){
    this.tableStartIndex = (index-1)*this.pageSize;
    this.tableEndIndex = index*this.pageSize;
    this.arrayIndex = [];
    this.arrayIndex.push(this.tableStartIndex);
    this.arrayIndex.push(this.tableEndIndex);
    this.arrayValues.emit(this.arrayIndex);
  }

}

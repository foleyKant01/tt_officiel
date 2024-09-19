import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-readall-business',
  templateUrl: './readall-business.component.html',
  styleUrls: ['./readall-business.component.scss']
})
export class ReadallBusinessComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    $('.table').DataTable();
  }

}

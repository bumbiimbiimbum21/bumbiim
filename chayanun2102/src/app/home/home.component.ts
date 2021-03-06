import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import { Router } from '@angular/router';
import{AlertService} from '../../app/shared/services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  item = [];
  errMsg ="";
  constructor(private productSV:ProductService,
              private route:Router,
              private alertSV:AlertService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData(){
    this.productSV.getProduct()
    .subscribe(
      data => this.item = data,
      error => this.errMsg = error
      );
  }
  gotoCreateProduct(){
    this.route.navigate(['/','createproduct']);
  }
  gotoDeleteData(){
    this.route.navigate(['/','deletedata']);
  }

  onDeleteData(personID) {
    const result = confirm('ยืนยันการลบ?');
  if (result) {
    const data = {
      personID: personID
    };
    this.productSV
    .deleteProduct(data)
    .then(() => {
      this.alertSV.notify('ลบข้อมูลเรียบร้อยแล้ว','info');
      this.fetchData();
    }).catch(err => this.errMsg = err);
  }
  /*gotoUpdateProduct(){
    this.route.navigate(['/','updateproduct']);
  }
  }*/
}
}

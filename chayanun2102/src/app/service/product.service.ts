import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = "http://chapayom.codehansa.com/crud_person.php?"

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<Product[]>(this.url+"cmd=select")
  }

  createProduct(data){
    let promise = new Promise((resolve,reject) =>{
      let apiURL = this.url + "cmd=insert";
      this.http.post(apiURL,data)
      .toPromise()
      .then(
        res => {//success
          console.log(res);
          resolve(data);
          }
      );
    });
    return promise;
  }
  deleteProduct(data) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.url + 'cmd=delete', data)
      .toPromise().then(
        res => {
          console.log(res);
          resolve(data);
        }
      );
    });
    return promise;
  }
  updateProduct(data){
    let promise = new Promise((resolve,reject) =>{
      let apiURL = this.url + "cmd=update";
      this.http.post(apiURL,data)
      .toPromise()
      .then(
        res => {//success
          console.log(res);
          resolve(data);
          }
      );
    });
    return promise;
  }
  getOnePerson(personID) {
    return this.http.get<Product[]>(this.url + 'cmd=select&personID=' + personID);
  }
}
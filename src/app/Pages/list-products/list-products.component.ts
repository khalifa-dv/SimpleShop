import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/Product';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  productsList:Product[]=[]


  constructor(private _productservice:ProductsServiceService) { }

  ngOnInit(): void {
    this._productservice.getProducts().subscribe((data)=>this.productsList=data)
  }
  addToCart(product:Product){
    this._productservice.addToCart(product).subscribe(()=>{},()=>alert('Product already exist'))
  }
  counterLike(product:Product){
    product.like++;
    console.log(product)
    this._productservice.updateProduct(product).subscribe(()=>alert('Product Update successffuly'))
  }
  removeProduct(product:Product){
    this._productservice.deleteProduct(product).subscribe( ()=>  {

      this._productservice.getProducts().subscribe((data)=>this.productsList=data)
      setTimeout(()=> alert('Product Deleted successffuly') ,300)

    })
  }
}

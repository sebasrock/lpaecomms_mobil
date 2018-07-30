import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.provider';

@IonicPage({
    segment: 'stock-my-suffix-detail/:id',
    defaultHistory: ['EntityPage', 'stock-my-suffixPage']
})
@Component({
    selector: 'page-stock-my-suffix-detail',
    templateUrl: 'stock-my-suffix-detail.html'
})
export class StockMySuffixDetailPage {
    stock: StockMySuffix;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private stockService: StockMySuffixService, private toastCtrl: ToastController) {
        this.stock = new StockMySuffix();
        this.stock.id = params.get('id');
    }

    ionViewDidLoad() {
        this.stockService.find(this.stock.id).subscribe(data => this.stock = data);
    }

    open(item: StockMySuffix) {
        let modal = this.modalCtrl.create('StockMySuffixDialogPage', {item: item});
        modal.onDidDismiss(stock => {
            if (stock) {
                this.stockService.update(stock).subscribe(data => {
                    this.stock = data;
                    let toast = this.toastCtrl.create(
                        {message: 'StockMySuffix updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}

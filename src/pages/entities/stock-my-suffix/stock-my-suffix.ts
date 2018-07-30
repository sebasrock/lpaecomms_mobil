import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-stock-my-suffix',
    templateUrl: 'stock-my-suffix.html'
})
export class StockMySuffixPage {
    stocks: StockMySuffix[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private stockService: StockMySuffixService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.stocks = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.stockService.query().subscribe(
            (response) => {
                this.stocks = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: StockMySuffix) {
        return item.id;
    }

    open(slidingItem: any, item: StockMySuffix) {
        let modal = this.modalCtrl.create('StockMySuffixDialogPage', {item: item});
        modal.onDidDismiss(stock => {
            if (stock) {
                if (stock.id) {
                    this.stockService.update(stock).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'StockMySuffix updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.stockService.create(stock).subscribe(data => {
                        this.stocks.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'StockMySuffix added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(stock) {
        this.stockService.delete(stock.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'StockMySuffix deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(stock: StockMySuffix) {
        this.navCtrl.push('StockMySuffixDetailPage', {id: stock.id});
    }
}

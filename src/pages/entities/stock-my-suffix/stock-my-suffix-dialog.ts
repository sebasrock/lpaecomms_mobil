import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { StockMySuffix } from './stock-my-suffix.model';
import { StockMySuffixService } from './stock-my-suffix.provider';

@IonicPage()
@Component({
    selector: 'page-stock-my-suffix-dialog',
    templateUrl: 'stock-my-suffix-dialog.html'
})
export class StockMySuffixDialogPage {

    stock: StockMySuffix;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private stockService: StockMySuffixService) {
        this.stock = params.get('item');
        if (this.stock && this.stock.id) {
            this.stockService.find(this.stock.id).subscribe(data => {
                this.stock = data;
            });
        } else {
            this.stock = new StockMySuffix();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.stock.id : null],
            stockID: [params.get('item') ? this.stock.stockID : '',  Validators.required],
            stockName: [params.get('item') ? this.stock.stockName : '',  Validators.required],
            stockDesc: [params.get('item') ? this.stock.stockDesc : '',  Validators.required],
            stockOnHand: [params.get('item') ? this.stock.stockOnHand : '',  Validators.required],
            stockPrice: [params.get('item') ? this.stock.stockPrice : '',  Validators.required],
            stockStatus: [params.get('item') ? this.stock.stockStatus : 'false',  Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the stock-my-suffix, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

}

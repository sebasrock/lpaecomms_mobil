import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { InvoiceItemsMySuffix } from './invoice-items-my-suffix.model';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';
import { StockMySuffix, StockMySuffixService } from '../stock-my-suffix';
import { InvoicesMySuffix, InvoicesMySuffixService } from '../invoices-my-suffix';


@IonicPage()
@Component({
    selector: 'page-invoice-items-my-suffix-dialog',
    templateUrl: 'invoice-items-my-suffix-dialog.html'
})
export class InvoiceItemsMySuffixDialogPage {

    invoiceItems: InvoiceItemsMySuffix;
    stocks: StockMySuffix[];
    invoices: InvoicesMySuffix[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private stockService: StockMySuffixService,
                private invoicesService: InvoicesMySuffixService,
                private invoiceItemsService: InvoiceItemsMySuffixService) {
        this.invoiceItems = params.get('item');
        if (this.invoiceItems && this.invoiceItems.id) {
            this.invoiceItemsService.find(this.invoiceItems.id).subscribe(data => {
                this.invoiceItems = data;
            });
        } else {
            this.invoiceItems = new InvoiceItemsMySuffix();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.invoiceItems.id : null],
            invitemNo: [params.get('item') ? this.invoiceItems.invitemNo : '',  Validators.required],
            invitemQty: [params.get('item') ? this.invoiceItems.invitemQty : '',  Validators.required],
            stock: [params.get('item') ? this.invoiceItems.stockId : '',],
            invoices: [params.get('item') ? this.invoiceItems.invoicesId : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.stockService.query()
            .subscribe(data => { this.stocks = data; }, (error) => this.onError(error));
        this.invoicesService.query()
            .subscribe(data => { this.invoices = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the invoice-items-my-suffix, so return it
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

    compareStock(first: StockMySuffix, second: StockMySuffix): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackStockById(index: number, item: StockMySuffix) {
        return item.id;
    }
    compareInvoices(first: InvoicesMySuffix, second: InvoicesMySuffix): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackInvoicesById(index: number, item: InvoicesMySuffix) {
        return item.id;
    }
}

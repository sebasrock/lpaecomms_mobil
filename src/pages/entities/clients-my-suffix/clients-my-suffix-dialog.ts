import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { ClientsMySuffix } from './clients-my-suffix.model';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@IonicPage()
@Component({
    selector: 'page-clients-my-suffix-dialog',
    templateUrl: 'clients-my-suffix-dialog.html'
})
export class ClientsMySuffixDialogPage {

    clients: ClientsMySuffix;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private clientsService: ClientsMySuffixService) {
        this.clients = params.get('item');
        if (this.clients && this.clients.id) {
            this.clientsService.find(this.clients.id).subscribe(data => {
                this.clients = data;
            });
        } else {
            this.clients = new ClientsMySuffix();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.clients.id : null],
            clientID: [params.get('item') ? this.clients.clientID : '',  Validators.required],
            clientFirstName: [params.get('item') ? this.clients.clientFirstName : '',  Validators.required],
            clientLastName: [params.get('item') ? this.clients.clientLastName : '',  Validators.required],
            clientAddress: [params.get('item') ? this.clients.clientAddress : '',  Validators.required],
            clientPhone: [params.get('item') ? this.clients.clientPhone : '',  Validators.required],
            clientStatus: [params.get('item') ? this.clients.clientStatus : 'false', ],
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
     * The user is done and wants to create the clients-my-suffix, so return it
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

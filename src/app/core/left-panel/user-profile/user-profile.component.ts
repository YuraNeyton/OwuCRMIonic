import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    user = {name: '', surname: ''};
    userSymbols = '';

    constructor(
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.loadUser();
        this.auth.updateProfile.subscribe(()=>{
            this.loadUser();
        })
    }

    loadUser() {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
            for (const p of Object.getOwnPropertyNames(this.user)) {
                this.userSymbols += this.user[p].substring(0, 1).toLocaleUpperCase();
                this.user[p] = this.user[p].charAt(0).toUpperCase() + this.user[p].slice(1);

            }
        }
    }

}

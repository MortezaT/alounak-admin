import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreValidators } from 'app/core/lib';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'admin-phone-input',
    template: `
    <form class="form" [formGroup]="form" (submit)="onSubmit($event)" dir="rtl">
      <mat-form-field class="form-field" [hideRequiredMarker]="false">
        <input matInput formControlName="phone" placeholder="شماره تلفن" type="tel" (keydown.esc)="phone.reset();" required/>
        <button matSuffix mat-icon-button [disabled]="form.invalid">
          <mat-icon class="mat-icon-rtl-mirror">{{icon}}</mat-icon>
        </button>
      </mat-form-field>
    </form>
    `,
    styles: [
        '.form { display: flex; flex-flow: column nowrap; justify-content: center; } ',
        '::ng-deep input.mat-input-element{ text-align: center; }'
    ],
})
export class PhoneInputComponent implements OnInit {
    private phoneSubject = new BehaviorSubject<string>('');
    @Input('phone') set phoneValue(value: string) { this.phoneSubject.next(value); }
    @Input() icon = 'send';
    @Output() valid = new EventEmitter<boolean>();
    @Output() change = new EventEmitter<any>();

    form: FormGroup;
    phone: FormControl;

    constructor() { }

    ngOnInit() {

        const phone = this.phone = new FormControl('', [Validators.required, CoreValidators.phone()]);
        this.form = new FormGroup({ phone });
        phone.valueChanges
            .pipe(filter(_ => phone.invalid))
            .subscribe(_ => this.valid.emit(phone.valid));
        this.phoneSubject
            .pipe(filter(value => !!value))
            .subscribe(value => phone.setValue(value));
    }

    onSubmit(event: Event) {

        event.preventDefault();
        event.stopPropagation();

        this.change.next(this.form.value);
        this.valid.next(true);

        return false;
    }
}

import { AbstractControl, ValidationErrors } from "@angular/forms";
import * as moment from 'jalali-moment';
import { RegexPattern } from "./regex-pattern";

interface ValidatorFn {
    (ctrl: AbstractControl): ValidationErrors | null;
}

export const CoreValidators = {
    phone: function (pattern: RegExp | string = RegexPattern.mobileNumber): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            return ctrl.value.match(pattern) ? null : { phone: true }
        }
    },
    equalTo: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            return (ctrl.value !== otherControl.value) ? { equal: true } : null;
        };
    },

    greaterThan: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            if (!otherControl.value) {
                return null;
            }
            return (ctrl.value > otherControl.value) ? null : { greaterThan: true };
        };
    },

    lessThan: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            if (!otherControl.value) {
                return null;
            }
            return (ctrl.value < otherControl.value) ? null : { lessThan: true };
        };
    },
}

export const JalaliValidators = {

    pattern: function (pattern: string | RegExp = RegexPattern.JalaliDate): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            return (ctrl.value.toString().match(pattern)) ? null : { pattern: { requiredPattern: pattern.toString(), actualValue: ctrl.value } };
        };
    },

    equalTo: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            const _this = jalaliStrToDate(ctrl.value);
            const _that = jalaliStrToDate(otherControl.value);
            return (+_this === +_that) ? null : { equal: true };
        };
    },

    greaterThan: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            if (!otherControl.value) {
                return null;
            }
            const _this = jalaliStrToDate(ctrl.value);
            const _that = jalaliStrToDate(otherControl.value);
            return (+_this > +_that) ? null : { greaterThan: true };
        };
    },

    lessThan: function (otherControl: AbstractControl): ValidatorFn {

        return (ctrl: AbstractControl): ValidationErrors | null => {

            if (!otherControl.value) {
                return null;
            }
            const _this = jalaliStrToDate(ctrl.value);
            const _that = jalaliStrToDate(otherControl.value);
            return (+_this < +_that) ? null : { lessThan: true };
        };
    },
}

function jalaliStrToDate(date: string): Date {

    return moment.from(date, 'fa').toDate();
}

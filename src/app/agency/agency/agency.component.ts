import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlounakPage, CoreValidators } from 'app/core/lib';
import { PageHelperService } from 'app/core/providers';
import { UrlService } from 'app/shared/providers';
import { bind } from 'helpful-decorators';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Agency, AgencyService } from '../providers';


@Component({
    selector: 'admin-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.scss']
})
export class AgencyComponent extends AlounakPage {
    logo: string;
    editing$ = new BehaviorSubject(false);
    fileChange$ = new Subject<any>();
    form = this.__fb.group({
        username: ['', [Validators.required, CoreValidators.phone]],
        password: ['', [Validators.required]],
        name: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, CoreValidators.phone]],
        email: ['', [Validators.email]],
        description: ['', [Validators.required]],
        urlAddressPart: ['', [Validators.required]],
        address: ['', [Validators.required]],
        originalPhotoUrl: ['', [Validators.required]],
        thumbnailPhotoUrl: ['', [Validators.required]],
    });
    username$ = this.__route
        .params.pipe(
            filter(p => p.username),
            map(p => p.username),
            tap(username => this.editing$.next(!!username)),
    );

    constructor(private __route: ActivatedRoute, private __fb: FormBuilder
        , helper: PageHelperService, private __srv: AgencyService, private __url: UrlService) {

        super(helper, '');
    }

    ngOnInit() {

        super.ngOnInit();
        this._track();
    }


    clear(control: string): void {

        this.form.controls[control].reset();
    }

    submit() {

        console.warn('TODO: implement update/insert sequence');
    }

    private _track(): void {

        this.username$.subscribe(this._get);

        this.editing$.subscribe(editing => editing ? this._editMode(<any>{}) : this._newMode())

        this.fileChange$
            .subscribe((fd: FormData) => {

                this.__srv.upload(fd)
                    .subscribe(res => {

                        const { thumbnailPhotoUrl, photoUrl: originalPhotoUrl } = res;
                        this.__setLogo(thumbnailPhotoUrl);
                        this.form.patchValue({ thumbnailPhotoUrl, originalPhotoUrl });
                    })
            });
    }

    private _newMode(): void {

        this.form.reset();
        this.form.controls.username.enable();
        this.form.controls.password.enable();
        this.setTitle('ثبت آژانس املاک');
        this.__setLogo();
    }

    private _editMode({ name, thumbnailPhotoUrl }: Agency): void {

        this.form.controls.username.disable();
        this.form.controls.password.disable();
        this.setTitle(`ویرایش اطلاعات املاک ${name || ''}`.trim());
        this.__setLogo(thumbnailPhotoUrl);
    }

    private __setLogo(urlPart?: string) {

        this.logo = this.__url.agencyImage(urlPart)
    }

    @bind
    private _get(username: string): void {

        this.__srv.get(username)
            .pipe(filter(res => !!res))
            .subscribe(item => {

                this._editMode(item);
                this.form.patchValue(item);
            });
    }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Region, RegionService } from 'app/shared/providers';
import * as fuzzy from 'fuzzy';
import { bind } from "helpful-decorators";
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

enum PlatformType { web, mobile }
const PlatformDesc = {
    [PlatformType.web]: 'وب',
    [PlatformType.mobile]: 'موبایل',
}
enum RegionLevel { level2 = 2, level3 = 3 }
const regionLevelDesc = {
    [RegionLevel.level2]: 'سطح ۲',
    [RegionLevel.level3]: 'سطح ۳',
}
@Component({
    selector: 'admin-region-information',
    templateUrl: './region-information.component.html',
    styleUrls: ['./region-information.component.scss']
})
export class RegionInformationComponent implements OnInit {
    form: FormGroup;
    regionControl: FormControl;
    platformControl: FormControl;
    levelControl: FormControl;

    platformOptions = Object.keys(PlatformDesc).map(k => ({ title: (<any>PlatformDesc)[k], value: k }));
    levelOptions = Object.keys(regionLevelDesc).map(k => ({ title: (<any>regionLevelDesc)[k], value: k }));
    regions$ = new BehaviorSubject<Region[]>([]);
    regions: Region[] = [];

    constructor(private __srv: RegionService) { }

    ngOnInit() {

        this._createForm();
        this.levelControl.valueChanges.subscribe(this._onLevelChange);

        this.levelControl.setValue('' + RegionLevel.level2);

        this.regionControl.valueChanges
            // .pipe(debounce(_ => timer(300)), )
            .pipe(filter(v => v && this._isString(v)))
            .subscribe(this._search);
    }

    onSubmit(event: Event) {

        console.log(`TODO: Implement region select action for\n\n`, this.form.value.region);

    }

    displayFn(region?: Region) {

        return region ? region.title : undefined
    }

    private _createForm() {

        const platformType = this.platformControl = new FormControl('' + PlatformType.web);
        const regionLevel = this.levelControl = new FormControl('');
        const region = this.regionControl = this.regionControl = new FormControl('', [Validators.required, this._canContinue])

        this.form = new FormGroup({ platformType, regionLevel, region });
    }

    @bind
    private _search(phrase: string) {

        const regions = !phrase
            ? this.regions
            : fuzzy
                .filter(phrase, this.regions, { extract: (r: Region) => r.title })
                .map(res => res.original);

        this.regions$.next(regions);
    }

    @bind
    private _onLevelChange(level: number) {

        this.regions$.next([]);
        this.regionControl.reset();
        this.__srv.search('', level)
            .subscribe(res => this.regions$.next(this.regions = res));
    }

    @bind
    private _canContinue(ctrl: AbstractControl): { [key: string]: any } | null {

        return !this._isString(ctrl.value) ? null : { notSelected: true };
    }

    private _isString(v: any) {
        return v === '' + v;
    }
}

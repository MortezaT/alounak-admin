import { Component, Input, OnInit, Output } from '@angular/core';
import { ApplicationVariables } from 'app/app.variables';
import { Subject } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { bind } from 'helpful-decorators';

@Component({
    selector: 'alounak-photo-select',
    templateUrl: './photo-select.component.html',
    styleUrls: ['./photo-select.component.scss']
})
export class PhotoSelectComponent implements OnInit {
    fileChange$ = new Subject<FileList | null>();
    fileLoad$ = new Subject<any>()

    @Input() title = 'انتخاب عکس'
    @Input() url: string;
    @Input() maxSize: number = ApplicationVariables.uploaderFileMaxSize;
    @Output() onChange = this.fileChange$
        .pipe(
            filter(fileList => <any>(fileList && fileList.length)),
            map(fileList => (<FileList>fileList)[0]),
            // map(this.__fileReaderFor),
            // flatMap(_ => this.fileLoad$),
            map(this.__toFormData)
        );

    constructor() { }
    ngOnInit() { }

    @bind
    private __fileReaderFor(blob: File): void {

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => this.fileLoad$.next(reader.result);
    }

    @bind
    private __toFormData(file: File): FormData {

        const fd = new FormData();
        fd.append('file', file);
        return fd;
    }
}

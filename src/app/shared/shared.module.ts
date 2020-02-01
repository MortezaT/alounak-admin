import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'app/core';
import { AdminSidenavComponent, PhoneInputComponent, PhotoSelectComponent } from './components';
import { RegionService, UrlService } from './providers';

const ngModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
];

const matModules = [
    // LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
];

const appModules = [
    CoreModule
]

const exports = [
    AdminSidenavComponent,
    PhoneInputComponent,
    PhotoSelectComponent,
];

const declarations = [
    ...exports
];

@NgModule({
    imports: [
        ...ngModules,
        ...matModules,
        ...appModules,
    ],
    declarations,
    exports,
})
export class SharedModule {

    public static forRoot(): ModuleWithProviders {

        return {
            ngModule: SharedModule,
            providers: [
                RegionService,
                UrlService,
            ]
        }
    }
}

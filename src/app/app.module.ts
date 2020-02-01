import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TokenInterceptor } from 'app-core/interceptors';

import { CoreModule, CoreConfigurations } from 'app-core';
import { ApplicationVariables } from 'app/app.variables';
import { AuthRoutePaths } from 'app/core/providers';
import { SharedModule } from 'app/shared/shared.module';
import { environment } from '../environments/environment';
import { paths, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const coreConfig = <CoreConfigurations>{
    routePath: {
        loginPath: paths.login
    },
    authConfig: {
        tokenWhitelistPaths: [
            environment.urls.api
        ],
        tokenExclude: []
    }
}

const moduleComponents = [
    LoginComponent
];

const ngModules = [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
];

const materialModules = [
    LayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
];

const appModules = [
    AppRoutingModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(coreConfig),
];

@NgModule({
    declarations: [
        AppComponent,
        ...moduleComponents,
    ],
    imports: [
        ...ngModules,
        ...materialModules,
        ...appModules,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.serviceWorker }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InjectionToken, NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';

import { PageComponent } from './components';
import { PageHelperService, ServiceHelperService, AuthRoutePathsService, AuthRoutePaths } from './providers';
import { AuthenticationConfig, AuthenticationConfigService } from 'app/core/interceptors';

export interface CoreConfigurations {
    routePath: AuthRoutePaths,
    authConfig: AuthenticationConfig
}
@NgModule({
    imports: [
        CommonModule,
        MatDividerModule,
    ],
    declarations: [
        PageComponent,
        // AuthGuard,
    ],
    exports: [
        PageComponent,
        // AuthGuard,
    ],
})
export class CoreModule {

    public static forRoot(config: CoreConfigurations): ModuleWithProviders {

        return {
            ngModule: CoreModule,
            providers: [
                PageHelperService,
                ServiceHelperService,
                {
                    provide: AuthRoutePathsService,
                    useValue: config.routePath,
                },
                {
                    provide: AuthenticationConfigService,
                    useValue: config.authConfig,
                },
            ],
        }
    }
}

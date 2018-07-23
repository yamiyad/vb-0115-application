import { NgModule } from '@angular/core';

import { Vb0115ApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Vb0115ApplicationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Vb0115ApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Vb0115ApplicationSharedCommonModule {}

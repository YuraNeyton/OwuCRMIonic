import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatusColorPipe} from './status-color.pipe';
import {StatusNamePipe} from './status-name.pipe';


@NgModule({
    declarations: [StatusColorPipe, StatusNamePipe],
    imports: [
        CommonModule
    ], exports: [StatusColorPipe, StatusNamePipe]
})
export class PipeModule {
}

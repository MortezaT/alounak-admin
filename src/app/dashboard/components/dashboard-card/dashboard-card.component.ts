import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'admin-dashboard-card',
    templateUrl: './dashboard-card.component.html',
    styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
    @Input() title: string;
    @Output() close = new EventEmitter<void>();

    constructor() { }
    ngOnInit() { }
}

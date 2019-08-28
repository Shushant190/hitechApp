import { NgModule } from '@angular/core';
import { ExpensePopoverComponent } from './expense-popover/expense-popover';

import { CategoryActionPophoverComponent } from './category-action-pophover/category-action-pophover';
import { OrderStatusPophoverComponent } from './order-status-pophover/order-status-pophover';
import { DistributorDetailPophoverComponent } from './distributor-detail-pophover/distributor-detail-pophover';
import { LeadpopoverComponent } from './leadpopover/leadpopover';
import { TravelpopoverComponent } from './travelpopover/travelpopover';
@NgModule({
	declarations: [ExpensePopoverComponent,
    CategoryActionPophoverComponent,
    OrderStatusPophoverComponent,
    DistributorDetailPophoverComponent,
    LeadpopoverComponent,
    TravelpopoverComponent
    ],
	imports: [],
	exports: [ExpensePopoverComponent,
    CategoryActionPophoverComponent,
    OrderStatusPophoverComponent,
    DistributorDetailPophoverComponent,
    LeadpopoverComponent,
    TravelpopoverComponent
    ]
})
export class ComponentsModule {}

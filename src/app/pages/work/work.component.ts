import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorksItems} from "../../../types/works-items";
import {WorksItemsService} from "../../shared/services/works-items.service";
import {WorkCardComponent} from "../../shared/components/work-card/work-card.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    WorkCardComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkComponent {
  work: WorksItems | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private worksItemService: WorksItemsService,
              private route: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.worksItemService.getWork(Number(param['id']))
        .subscribe(data => {
          if (data) {
            this.work = data as WorksItems;
          } else {
            this.route.navigate(['/']);
          }
        });
    })
  }
}

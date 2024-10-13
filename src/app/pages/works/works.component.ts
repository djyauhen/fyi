import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WorksItems} from "../../../types/works-items";
import {Subscription} from "rxjs";
import {MenuItemsService} from "../../shared/services/menu-items.service";
import {SkillsItemsService} from "../../shared/services/skills-items.service";
import {WorksItemsService} from "../../shared/services/works-items.service";
import {RouterLink} from "@angular/router";
import {WorkCardComponent} from "../../shared/components/work-card/work-card.component";

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    WorkCardComponent
  ],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss'
})
export class WorksComponent {
  worksItems: WorksItems[] = [];
  subscriptions: Subscription[] = [];

  constructor(private menuService: MenuItemsService,
              private skillsService: SkillsItemsService,
              private worksService: WorksItemsService) {
  }

  ngOnInit() {
    this.subscription = this.worksService.getAllWorksItems()
      .subscribe({
        next: data => {
          this.worksItems = data;
        }
      });


  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.worksItems = [];
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

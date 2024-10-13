import {Component} from '@angular/core';
import {MenuItems} from "../../../types/menu-items";
import {MenuItemsService} from "../../shared/services/menu-items.service";
import {SkillsItemsService} from "../../shared/services/skills-items.service";
import {WorksItemsService} from "../../shared/services/works-items.service";
import {SocialItemsService} from "../../shared/services/social-items.service";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe, NgForOf} from "@angular/common";
import {SocialItems} from "../../../types/social-items";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  menuItems: MenuItems[] = [];
  socialsItems: SocialItems[] = [];

  year: number;

  constructor(private menuService: MenuItemsService,
              private socialService: SocialItemsService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
    this.socialsItems = this.socialService.getSocialItems();
  }


  scrollTo(target: string) {
    document.getElementById(target)?.scrollIntoView({behavior: "smooth"});
  }

}

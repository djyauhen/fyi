import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MenuItems} from "../../../types/menu-items";
import {MenuItemsService} from "../../shared/services/menu-items.service";
import {MatDialog, MatDialogContainer} from "@angular/material/dialog";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {BurgerComponent} from "../burger/burger.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    MatMenu,
    MatMenuTrigger,
    MatDialogContainer
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems: MenuItems[] = [];

  constructor(private menuService: MenuItemsService,
              public dialog: MatDialog,
              private route: Router) {
  }
  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }



  openMenu() {
    let dialogOpen = this.dialog.open(BurgerComponent, {
      height: '400px',
      width: '600px',
    });
    dialogOpen.afterClosed().subscribe(result => {
      if (result) this.route.navigate([result.href], {
        fragment: result.fragment
      })
    });
  }
  scrollTo(target: string) {
    document.getElementById(target)?.scrollIntoView({behavior: "smooth", block: "start"});
  }
}

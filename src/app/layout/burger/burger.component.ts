import { Component } from '@angular/core';
import {MatDialogClose, MatDialogContainer, MatDialogRef} from "@angular/material/dialog";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MenuItems} from "../../../types/menu-items";
import {MenuItemsService} from "../../shared/services/menu-items.service";

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [
    MatDialogContainer,
    NgForOf,
    RouterLink,
    NgOptimizedImage,
    MatDialogClose
  ],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss'
})
export class BurgerComponent {
  menuItems: MenuItems[] = [];

  constructor(private menuService: MenuItemsService, public dialogRef: MatDialogRef<BurgerComponent>, private router: Router) {
  }


  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }
  closePopup(){
    this.dialogRef.close();
  }
}

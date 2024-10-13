import {Injectable} from '@angular/core';
import {MenuItems} from "../../../types/menu-items";

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  menuItems: MenuItems[] = [
    {
      title: "Философия",
      surname: 'Философия и ценности',
      href: '',
      fragment: "philosophy"
    },
    {
      title: "Навыки",
      surname: 'Мои навыки',
      href: '',
      fragment: "skills"
    },
    {
      title: "Работы",
      surname: 'Мои работы',
      href: "works",
      fragment: ''
    },
    {
      title: "Блог",
      surname: 'Блог в Instagram',
      href: '',
      fragment: "instagram"
    },
    {
      title: "GitHub",
      surname: 'Репозиторий GitHub',
      href: '',
      fragment: "github"
    },
    {
      title: "Контакты",
      surname: 'Свяжись со мной',
      href: '',
      fragment: "order"
    }
  ]

  constructor() {
  }

  getMenuItems(): MenuItems[] {
    return this.menuItems;
  }
}

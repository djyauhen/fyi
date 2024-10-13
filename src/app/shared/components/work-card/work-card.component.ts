import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {WorksItems} from "../../../../types/works-items";

@Component({
  selector: 'work-card',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './work-card.component.html',
  styleUrl: './work-card.component.scss'
})
export class WorkCardComponent {
  @Input() work!: WorksItems
}

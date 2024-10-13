import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MenuItems} from "../../../types/menu-items";
import {SkillsItems} from "../../../types/skills-items";
import {WorksItems} from "../../../types/works-items";
import {Subscription} from "rxjs";
import {MenuItemsService} from "../../shared/services/menu-items.service";
import {SkillsItemsService} from "../../shared/services/skills-items.service";
import {WorksItemsService} from "../../shared/services/works-items.service";
import {SocialItemsService} from "../../shared/services/social-items.service";
import {ResponseType} from "../../../types/response-type";
import {environment} from "../../../enviroments/environment.developer";
import {MatMenuModule} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LoaderService} from "../../shared/services/loader.service";
import {WorkCardComponent} from "../../shared/components/work-card/work-card.component";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderComponent,
    MatMenuModule,
    MatButtonModule,
    MatDialogContent,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    RouterLink,
    WorkCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuItems: MenuItems[] = [];
  skillsItems: SkillsItems[] = [];
  worksItems: WorksItems[] = [];
  subscriptions: Subscription[] = [];
  detailWork: WorksItems | null = null;
  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: [''],
    message: ['', Validators.required],
    agree: [false, Validators.required]
  });
  popupMessage: boolean = false;


  @ViewChild('popup') popup!: TemplateRef<ElementRef>;
  @ViewChild('aboutProject') aboutProject!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;


  constructor(private menuService: MenuItemsService,
              private skillsService: SkillsItemsService,
              private worksService: WorksItemsService,
              private socialService: SocialItemsService,
              private fb: FormBuilder,
              private http: HttpClient,
              private dialog: MatDialog,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
    this.skillsItems = this.skillsService.getSkillsItems();
    this.subscription = this.worksService.getVisibleWorksItems()
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

  sendMessage() {
    if (this.form.valid) {
      this.loaderService.show();

      let res = this.http.post<ResponseType>(environment.api, {
          name: this.form.getRawValue().name,
          phone: this.form.getRawValue().phone,
          email: this.form.getRawValue().email,
          message: this.form.getRawValue().message,
        },
        {
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      )
      res.subscribe({
        next: answer => {
          this.clearForm();
          this.loaderService.hide();
          this.popupMessage = true;
          this.openPopup(this.popup);
        },
        error: err => {
          this.clearForm();
          this.loaderService.hide();
          this.popupMessage = false;
          this.openPopup(this.popup);
        }
      })
    }
  }


  clearForm() {
    this.form.reset();
  }

  closePopup() {
    this.dialogRef?.close();
    this.detailWork = null;
  }

  openPopup(target: TemplateRef<ElementRef>) {
    this.dialogRef = this.dialog.open(target);
    this.dialogRef.backdropClick();
  }

}

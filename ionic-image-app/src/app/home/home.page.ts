import { Component } from "@angular/core";
import { ActionSheetController, Platform } from "@ionic/angular";
import { ApiImage, ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  images: ApiImage[] = [];

  constructor(
    private api: ApiService,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadImages();
  }

  loadImages() {
    this.api.getImages().subscribe((images) => {
      console.log('images: ', images)
      this.images = images;
    });
  }

  deleteImage(image: ApiImage, index) {
    this.api.deleteImage(image._id).subscribe(() => {
      this.images.splice(index, 1);
    })
  }
}

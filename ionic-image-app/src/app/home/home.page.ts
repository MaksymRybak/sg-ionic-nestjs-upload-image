import { Component, ElementRef, ViewChild } from "@angular/core";
import { CameraSource, Plugins } from "@capacitor/core";
import { ActionSheetController, Platform } from "@ionic/angular";
import { ApiImage, ApiService } from "../services/api.service";

const { Camera } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  images: ApiImage[] = [];

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  constructor(
    private api: ApiService,
    private plt: Platform,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadImages();
  }

  loadImages() {
    this.api.getImages().subscribe((images) => {
      console.log("images: ", images);
      this.images = images;
    });
  }

  deleteImage(image: ApiImage, index) {
    this.api.deleteImage(image._id).subscribe(() => {
      this.images.splice(index, 1);
    });
  }

  async selectImageSource() {
    const buttons = [
      {
        text: "Take Photo",
        icon: "camera",
        handler: () => {
          this.addImage(CameraSource.Camera);
        },
      },
      {
        text: "Choose from Photos library",
        icon: "image",
        handler: () => {
          this.addImage(CameraSource.Photos);
        },
      },
    ];

    if (!this.plt.is("hybrid")) {
      buttons.push({
        text: "Choose a file",
        icon: "attach",
        handler: () => {
          this.fileInput.nativeElement.click();
        },
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    })
    await actionSheet.present();
  }

  uploadFile(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    // NOTA: check if we can get file using directly event param (two tranformation done is due to secutiry reason??)

    console.log('file: ', file);

    this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
      console.log('after upload: ', newImage);
      this.images.push(newImage);
    })
  }

  addImage(source: CameraSource) {}
}

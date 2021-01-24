import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface ApiImage {
  _id: string;
  name: string;
  createdAt: Date;
  url: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  url = "http://localhost:3000";
  // url = 'http://de7abc5ab184.ngrok.io';

  constructor(private http: HttpClient) {}

  // NOTA: it's different how we upload image from the web and from device!!

  uploadImage(blobData, name, extension) {
    const formData = new FormData();
    formData.append('file', blobData, `myimage.${extension}`);
    formData.append('name', name);
    return this.http.post(`${this.url}/image`, formData);
  }

  uploadImageFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    return this.http.post(`${this.url}/image`, formData);
  }

  getImages() {
    return this.http.get<ApiImage[]>(`${this.url}/image`);
  }

  deleteImage(id) {
    return this.http.delete(`${this.url}/image/${id}`);
  }


}

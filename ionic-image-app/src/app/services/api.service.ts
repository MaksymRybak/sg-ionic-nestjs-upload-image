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
  // http://de7abc5ab184.ngrok.io/image/

  constructor(private http: HttpClient) {}

  // NOTA: it's different how we upload image from the web and from device!!

  uploadImage() {}

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

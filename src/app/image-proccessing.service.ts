import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.module';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProccessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product: Product): Product {
    const productImages: any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];
  
    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];
  
      if (!this.isValidBase64(imageFileData.picByte)) {
        console.error('Invalid Base64 format:', imageFileData.picByte);
        continue;
      }
  
      const imageBlob = this.dataURLtoBlob(imageFileData.picByte, imageFileData.type);
  
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });
  
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
  
      productImagesToFileHandle.push(finalFileHandle);
    }
  
    product.productImages = productImagesToFileHandle;
    return product;
  }
  public dataURLtoBlob(picBytes: string, imageType: string): Blob {
    try {
      const byteString = window.atob(picBytes);

      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([int8Array], { type: imageType });
      return blob;
    } catch (error) {
      console.error('Error decoding Base64:', error);
      // Handle the error or return a default value.
      return null;
    }
  }

  private isValidBase64(value: string): boolean {
    try {
      window.atob(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}

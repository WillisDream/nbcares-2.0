import { ModalController } from '@ionic/angular';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signatureAdded: boolean = false;
  signature;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  constructor(
    private elementRef: ElementRef,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    //  canvas.height = window.innerHeight - 140;
    if (window.innerHeight > window.innerWidth)
      canvas.height = canvas.width / 2;
    else canvas.height = window.innerHeight - 140;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  close() {
    this.modalController.dismiss({
      signatureAdded: this.signatureAdded,
      signature: this.signature,
    });
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save(): void {
    const img = this.signaturePad.toDataURL();
    this.signatureAdded = true;
    this.signature = img;
    this.close();
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }
}

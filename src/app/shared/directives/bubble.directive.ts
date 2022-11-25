import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBubble]'
})
export class BubbleDirective implements OnInit {

  private _defaultConfig: any = {
    height: '2.5em',
    width: '2.5em',
    lineHeight: '2.5em', // Equivalent line-height en CSS
    backgroundColor: 'rgba(189, 58, 58, 0.651)',
    borderRadius: '50%',
    border: 'solid 2px',
    fontWeight: 'bold',
    verticalAlign: 'middle',
    textAlign: 'center',
    display: 'inline-block'
  }

  private _config: any = {};

  @Input() public set config(inputConfig: any) {
    // Boucler sur les propriétés de l'attribut defaultConfig de la directive
    for (const property in this._defaultConfig) {
      if (inputConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      } else {
        this._config[property] = this._defaultConfig[property];
      }
    }

    // Boucler sur l'objet passé en paramètre pour ajouter les autres éventuelles propriétés
    for (const property in inputConfig) {
      if (!this._defaultConfig.hasOwnProperty(property)) {
        this._config[property] = inputConfig[property];
      }
    }
  }



  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    for (const property in this._config) {
      this.renderer.setStyle(nativeElement, property, this._config[property]);
    }
  }

  // @HostListener('click') public onClick() {
  //   const nativeElement: HTMLElement = this.elementRef.nativeElement;
  //   this.renderer.addClass(nativeElement, 'zoom-in');
  //   setTimeout(
  //     () => {
  //       this.renderer.removeClass(nativeElement, 'zoom-in')<
  //     },
  //     1000
  //   );
  // }
}

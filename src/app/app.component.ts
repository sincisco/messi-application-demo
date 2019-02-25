import {AfterViewInit, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './animations';
import {messiApplicationBuilder} from '@zijin/messi/application/builder';
import {APP_STATUS, MESSI_EVENT} from '@zijin/messi/model/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements AfterViewInit {

  constructor(private _router: Router) {

  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngAfterViewInit() {
    window.addEventListener(MESSI_EVENT.ROUTING_NAVIGATE,
      (event: CustomEvent) => {
        if (event.detail && event.detail.url) {
          this._router.navigateByUrl(event.detail.url);
        }
      });
    const application=messiApplicationBuilder('app1');
    application.updateStatus(APP_STATUS.LOADED);
    application.getToken();
    // messiApplicationBuilder('app1').updateStatus(APP_STATUS.LOADED).then((param) => {
    //   console.log(param);
    // });
  }
}

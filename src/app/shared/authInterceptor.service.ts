import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(req, next) {
    const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      headers: req.headers.set("Authtorization", "token " + auth.token), // auto add - , wtf
    });
    return next.handle(authRequest);
  }
}

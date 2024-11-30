import { HttpInterceptorFn } from '@angular/common/http';
import { enviorement } from '../config.enviorement';
import { inject } from '@angular/core';
import { StorageService } from '../service/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedEndpoints = enviorement.allowed;


  const isAllowedEndpoint = allowedEndpoints.some(url => req.url.includes(url));

  if (isAllowedEndpoint) {
    return next(req);
  }

  const storageService = inject(StorageService)

  const authToken = storageService.getToken();
  
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(clonedRequest);
};

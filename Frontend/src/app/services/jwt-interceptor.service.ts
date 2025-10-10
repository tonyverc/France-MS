// src/app/services/jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandler } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};

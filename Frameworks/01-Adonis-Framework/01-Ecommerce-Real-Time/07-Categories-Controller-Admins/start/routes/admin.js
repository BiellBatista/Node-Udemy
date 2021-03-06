'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  /**
   * Categories resource routes
   * o método apiOnly() remove as rotas que não são do padrão REST/API
   */
  Route.resource('categories', 'CategoryController').apiOnly();
  Route.resource('products', 'ProductController').apiOnly();
  Route.resource('coupons', 'CouponController').apiOnly();
  Route.resource('images', 'ImageController').apiOnly();
  Route.resource('orders', 'OrderController').apiOnly();
  Route.resource('users', 'UserController').apiOnly();
})
  .prefix('v1/admin')
  .namespace('Admin');

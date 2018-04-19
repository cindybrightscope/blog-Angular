import * as angular from 'angular';
import {appComponent} from './app.component';
import * as uiRouter from 'angular-ui-router';

const appModule = angular.module('tutorial.app', [uiRouter])
  .component('appComponent', appComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('postDetail', {
            url: '/post/:pk',
            templateUrl : 'app/post.template.html'
        });
        $urlRouterProvider.otherwise('/');
    })
  .name;

export { appModule };

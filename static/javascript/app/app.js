var Quill = angular.module('Quill', ['ngResource', 'infinite-scroll'])

Quill.run(['$rootScope', '$http', function($rootScope, $http) {
  $http.defaults.headers.common.Accept = 'application/json'

  $rootScope.title       = config.title
  $rootScope.description = config.description
  $rootScope.theme       = config.theme
  $rootScope.author      = config.author
}])

Quill.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
      controller: 'HomeCtrl'
    , templateUrl: 'static/javascript/app/templates/home.html'
  })
  .when('/:year', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/javascript/app/templates/archive.html'
  })
  .when('/:year/:month', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/javascript/app/templates/archive.html'
  })
  .when('/:year/:month/:day', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/javascript/app/templates/archive.html'
  })
  .when('/:year/:month/:day/:title', {
      controller: 'ArticleCtrl'
    , templateUrl: 'static/javascript/app/templates/article.html'
  })
  .otherwise({
    templateUrl: 'static/javascript/app/templates/404.html'
  })
}])
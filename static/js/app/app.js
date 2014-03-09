var Quill = angular.module('Quill', ['ngResource'])

Quill.run(['$rootScope', '$http', function($rootScope, $http) {
  $http.defaults.headers.common.Accept = 'application/json'

  $rootScope.title       = config.title
  $rootScope.description = config.description
  $rootScope.theme       = config.theme
  $rootScope.author      = config.author
}])

Quill.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true)
  $locationProvider.hashPrefix = '!'

  $routeProvider.when('/', {
      controller: 'HomeCtrl'
    , templateUrl: 'static/js/app/templates/home.html'
  })
  .when('/404', {
      controller: 'ErrorCtrl'
    , templateUrl: 'static/js/app/templates/404.html'
  })
  .when('/500', {
      controller: 'ErrorCtrl'
    , templateUrl: 'static/js/app/templates/500.html'
  })
  .when('/:year', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/js/app/templates/archive.html'
  })
  .when('/:year/:month', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/js/app/templates/archive.html'
  })
  .when('/:year/:month/:day', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/js/app/templates/archive.html'
  })
  .when('/:year/:month/:day/:title', {
      controller: 'ArticleCtrl'
    , templateUrl: 'static/js/app/templates/article.html'
  })
  .otherwise({
    redirectTo: '404'
  })
}])

Quill.config(['$httpProvider', function($httpProvider) {
  var interceptor = ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
    $rootScope.loading = true
    function success(response) {
      return response
    }

    function error(response) {
      if(_.contains([404, 500], response.status)) {
        $location.path(String(response.status))
      }

      return $q.reject(response)
    }

    return function(promise) {
      return promise.then(success, error)
    }
  }]

  $httpProvider.responseInterceptors.push(interceptor)
}])
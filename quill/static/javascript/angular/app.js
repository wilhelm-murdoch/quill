angular.module('Quill', ['ngResource'])

  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path('/404').replace()
    })
  }])

  .controller('QuillCtrl', ['$http', function($http) {
    $http.defaults.headers.common.Accept = 'application/json'
  }])

  .controller('QuillIndexCtrl', ['$scope', 'ArticlesLoader', function($scope, ArticlesLoader) {
    $scope.articles = null
    $scope.moment = moment
    ArticlesLoader.query({ limit: 5 }, function(articles) {
      $scope.articles = articles
    })
  }])

  .controller('QuillArchiveCtrl', ['$scope', '$route', '$location', 'ArticlesLoader', function($scope, $route, $location, ArticlesLoader) {
    $scope.articles = null
    $scope.moment = moment
    ArticlesLoader.query({
        year:  $route.current.params.year
      , month: $route.current.params.month
      , day:   $route.current.params.day
    }
    , function(articles) {
      $scope.articles = articles
    }
    , function(response) {
      if(_.contains([404, 500], response.status)) {
        $location.path('/' + response.status).replace()
      }
    })
  }])

  .controller('QuillArticleCtrl', ['$scope', '$route', '$location', 'ArticlesLoader', function($scope, $route, $location, ArticlesLoader) {
    $scope.articles = null
    $scope.moment = moment
    ArticlesLoader.get({
        year:  $route.current.params.year
      , month: $route.current.params.month
      , day:   $route.current.params.day
      , title: $route.current.params.title
    }
    , function(article) {
      $scope.article = article
    }
    , function(response) {
      if(_.contains([404, 500], response.status)) {
        $location.path('/' + response.status).replace()
      }
    })
  }])

  .config(['$routeProvider', function($routeProvider) {
    var archiveConfig = {
        controller: 'QuillArchiveCtrl'
      , templateUrl: 'static/javascript/angular/views/archive.html'
    }

    $routeProvider.when('/', {
        controller: 'QuillIndexCtrl'
      , templateUrl: 'static/javascript/angular/views/home.html'
    })
    .when('/404', {
      templateUrl: 'static/javascript/angular/views/404.html'
    })
    .when('/500', {
      templateUrl: 'static/javascript/angular/views/500.html'
    })
    .when('/:year', archiveConfig)
    .when('/:year/:month', archiveConfig)
    .when('/:year/:month/:day', archiveConfig)
    .when('/:year/:month/:day/:title', {
        controller: 'QuillArticleCtrl'
      , templateUrl: 'static/javascript/angular/views/article.html'
    })
    .otherwise({
      redirectTo: '/404'
    })
  }])

  .factory('ArticlesLoader', ['$resource', function($resource) {
    return $resource('/inkwell/:year/:month/:day/:title', {
        year:   '@year'
      , month:  '@month'
      , day:    '@day'
      , title:  '@title'
    })
  }])

  .directive('time', function() {
    return {
      restrict: 'E',
      templateUrl: 'static/javascript/angular/views/partials/time.html'
    }
  })

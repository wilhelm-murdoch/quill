angular.module('Quill', ['ngResource', 'infinite-scroll'])

  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
      $location.path('/404').replace()
    })
  }])

  .controller('QuillCtrl', ['$http', function($http) {
    $http.defaults.headers.common.Accept = 'application/json'
  }])

  .controller('QuillHomeCtrl', ['$scope', 'ArticlesLoader', function($scope, ArticlesLoader) {
    var perpage = 5

    $scope.articles = []
    $scope.moment   = moment
    $scope.limit    = perpage
    $scope.offset   = 0
    $scope.done     = false
    $scope.loading  = false

    $scope.nextPage = function() {
      if(!$scope.done) {
        $scope.loading = true
        ArticlesLoader.query({
          limit:  $scope.limit,
          offset: $scope.offset
        }, function(articles) {
          if(articles.length) {
            _.each(articles, function(article) {
              $scope.articles.push(article)
            })

            $scope.offset += perpage
            $scope.limit  += perpage
            $scope.loading = false
          } else {
            $scope.done = true
            $scope.loading = false
          }
        })
      }
    }
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
      , templateUrl: 'static/javascript/app/templates/archive.html'
    }

    $routeProvider.when('/', {
        controller: 'QuillHomeCtrl'
      , templateUrl: 'static/javascript/app/templates/home.html'
    })
    .when('/404', {
      templateUrl: 'static/javascript/app/templates/404.html'
    })
    .when('/500', {
      templateUrl: 'static/javascript/app/templates/500.html'
    })
    .when('/:year', archiveConfig)
    .when('/:year/:month', archiveConfig)
    .when('/:year/:month/:day', archiveConfig)
    .when('/:year/:month/:day/:title', {
        controller: 'QuillArticleCtrl'
      , templateUrl: 'static/javascript/app/templates/article.html'
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
      templateUrl: 'static/javascript/app/templates/partials/time.html'
    }
  })

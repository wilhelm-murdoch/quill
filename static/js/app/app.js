var Quill = angular.module('Quill', ['ngResource', 'ngRoute', 'ngSanitize'])

Quill.run(['$rootScope', '$http', function($rootScope, $http) {
  $http.defaults.headers.common.Accept = 'application/json'

  $rootScope.config = config
}])

Quill.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true)
  $locationProvider.hashPrefix = '!'

  $routeProvider.when('/', {
      controller: 'HomeCtrl'
    , templateUrl: 'static/js/app/templates/home.html'
  })
  .when('/:year/:month?/:day?', {
      controller: 'ArchiveCtrl'
    , templateUrl: 'static/js/app/templates/archive.html'
  })
  .when('/:year/:month/:day/:title', {
      controller: 'ArticleCtrl'
    , templateUrl: 'static/js/app/templates/article.html'
  })
  .otherwise({
    redirectTo: '/'
  })
}])

Quill.controller('HomeCtrl', [
    '$scope'
  , 'ArticlePager'
  , function($scope, ArticlePager) {
  $scope.moment   = moment
  $scope.articles = []

  var pager = new ArticlePager

  $scope.next = function() {
    pager.next(function(articles){
      _.each(articles, function(e) {
        $scope.articles.push(e)
      })
    })
  }()
}])

Quill.controller('ArchiveCtrl', [
    '$scope'
  , '$route'
  , 'ArticlePager'
  , function($scope, $route, ArticlePager) {
  $scope.moment   = moment
  $scope.articles = []

  var pager = new ArticlePager({
      year:  $route.current.params.year
    , month: $route.current.params.month
    , day:   $route.current.params.day
  })

  $scope.next = function() {
    pager.next(function(articles){
      _.each(articles, function(article) {
        $scope.articles.push(article)
      })
    })
  }()
}])

Quill.controller('ArticleCtrl', [
    '$scope'
  , '$route'
  , '$document'
  , 'ArticlesLoader'
  , function($scope, $route, $document, ArticlesLoader) {
  $scope.article = null
  $scope.moment = moment

  ArticlesLoader.get({
      year:  $route.current.params.year
    , month: $route.current.params.month
    , day:   $route.current.params.day
    , title: $route.current.params.title
  }
  , function(article) {
    $scope.article = article
  })
}])

Quill.factory('ArticlesLoader', ['$resource', function($resource) {
  return $resource('/inkwell/:year/:month/:day/:title', {
      year:  '@year'
    , month: '@month'
    , day:   '@day'
    , title: '@title'
  })
}])

Quill.factory('ArticlePager', ['ArticlesLoader', function(ArticlesLoader) {
  var perpage = parseInt(config.per_page)

  return function(query) {
    var limit  = perpage
    var offset = 0
    var isDone = false
    var query  = query || {}

    this.next = function(success, failure) {
      if(!isDone) {
        ArticlesLoader.query(_.extend({
            limit:  limit
          , offset: offset
        }, query),
        function(result) {
          if(!_.isEmpty(result)) {
            offset += perpage
            limit  += perpage
          } else {
            isDone = true
          }

          success(result)
        }
        , function(error) {
          if(failure) {
            failure(error)
          }
        })
      }
    }
  }
}])

Quill.directive('time', function() {
  return {
      restrict: 'E'
    , templateUrl: 'static/js/app/templates/partials/time.html'
  }
})

Quill.filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  }
})
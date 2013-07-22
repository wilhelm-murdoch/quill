angular.module('Quill', ['ngResource', 'ngDisqus', 'infinite-scroll'])

  .run(['$rootScope', function($rootScope) {
    $rootScope.title = config.title
    $rootScope.description = config.description
    $rootScope.theme = config.theme
    $rootScope.author = config.author
  }])

  .controller('QuillCtrl', ['$http', function($http) {
    $http.defaults.headers.common.Accept = 'application/json'
  }])

  .controller('HomeCtrl',
    ['$scope', 'ArticlesLoader', function($scope, ArticlesLoader) {
    var perpage = parseInt(config.per_page)

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

  .controller('ArchiveCtrl',
    ['$rootScope', '$scope', '$route', '$location', 'ArticlesLoader',
    function($rootScope, $scope, $route, $location, ArticlesLoader) {
    $scope.articles = null
    $scope.moment = moment

    var year  = $route.current.params.year
    var month = $route.current.params.month
    var day   = $route.current.params.day
    var page_title = config.title + ' - Archives - '

    if(year && month && day) {
      $rootScope.page_title = page_title + moment(year + '/' + month + '/' + day).format('MMMM Do, YYYY')
    } else if(year && month) {
      $rootScope.page_title = page_title + moment(year + '/' + month + '/1').format('MMMM, YYYY')
    } else if(year) {
      $rootScope.page_title = page_title + year
    }

    ArticlesLoader.query({
        year:  year
      , month: month
      , day:   day
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

  .controller('ArticleCtrl',
    ['$rootScope', '$scope', '$route', '$location', '$window',
      'ArticlesLoader',
    function($rootScope, $scope, $route, $location, $window, ArticlesLoader) {
    $scope.article = null
    $scope.moment = moment

    $window.disqus_shortname = config.disqus

    ArticlesLoader.get({
        year:  $route.current.params.year
      , month: $route.current.params.month
      , day:   $route.current.params.day
      , title: $route.current.params.title
    }
    , function(article) {
      $scope.article = article
      $rootScope.page_title = config.title + ' - ' + $scope.article.title
    }
    , function(response) {
      if(_.contains([404, 500], response.status)) {
        $location.path('/' + response.status).replace()
      }
    })
  }])

  .config(['$routeProvider', function($routeProvider) {
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
        restrict: 'E'
      , templateUrl: 'static/javascript/app/templates/partials/time.html'
    }
  })

  .directive('article', ['$timeout', function($timeout) {
    return {
        restrict: 'E'
      , link: function($scope, element, attrs) {
        $timeout(function() {
          Rainbow.color()
        }, 200)
      }
    }
  }])
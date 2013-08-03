Quill.controller('HomeCtrl', ['$scope', 'ArticlePager',
  function($scope, ArticlePager) {
  $scope.moment    = moment
  $scope.articles  = []
  $scope.isLoading = false

  var pager = new ArticlePager

  $scope.next = function() {
    $scope.isLoading = true
    pager.next(function(articles){
      _.each(articles, function(e) {
        $scope.articles.push(e)
      })
      $scope.isLoading = false
    })
  }
}])

Quill.controller('ArchiveCtrl', ['$scope', '$route', 'ArticlePager',
  function($scope, $route, ArticlePager) {
  $scope.moment    = moment
  $scope.articles  = []
  $scope.isLoading = false

  var pager = new ArticlePager({
      year:  $route.current.params.year
    , month: $route.current.params.month
    , day:   $route.current.params.day
  })

  $scope.next = function() {
    $scope.isLoading = true
    pager.next(function(articles){
      _.each(articles, function(e) {
        $scope.articles.push(e)
      })
      $scope.isLoading = false
    })
  }
}])

Quill.controller('ArticleCtrl', ['$scope', '$route', 'ArticlesLoader',
  function($scope, $route, ArticlesLoader) {
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
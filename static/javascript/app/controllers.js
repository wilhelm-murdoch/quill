Quill.controller('HomeCtrl', ['$scope', 'ArticlePager', 'TitleService',
  function($scope, ArticlePager, TitleService) {
  $scope.moment    = moment
  $scope.articles  = []
  $scope.isLoading = false

  TitleService.set(['Home'])

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

Quill.controller('ArchiveCtrl', ['$scope', '$route', 'ArticlePager', 'TitleService',
  function($scope, $route, ArticlePager, TitleService) {
  $scope.moment    = moment
  $scope.articles  = []
  $scope.isLoading = false

  var year  = $route.current.params.year  || null
  var month = $route.current.params.month || null
  var day   = $route.current.params.day   || null

  var titleComponents = ['Archives']

  if(year && month && day) {
    titleComponents.push(
      moment(year + month + day, 'YYYYMMDD').format('MMMM Do, YYYY')
    )
  } else if(year && month) {
    titleComponents.push(
      moment(year + month + '01', 'YYYYMMDD').format('MMMM, YYYY')
    )
  } else {
    titleComponents.push(year)
  }

  TitleService.set(titleComponents)

  var pager = new ArticlePager({
      year:  year
    , month: month
    , day:   day
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

Quill.controller('ArticleCtrl', ['$scope', '$route', 'ArticlesLoader', 'TitleService',
  function($scope, $route, ArticlesLoader, TitleService) {
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

    TitleService.set([article.title])
  })
}])

Quill.controller('ErrorCtrl', ['$scope', 'TitleService',
  function($scope, TitleService) {
  TitleService.set(['Error'])
}])
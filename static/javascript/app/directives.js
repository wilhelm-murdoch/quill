Quill.directive('time', function() {
  return {
      restrict: 'E'
    , templateUrl: 'static/javascript/app/templates/partials/time.html'
  }
})

Quill.directive('siteHeader', function() {
  return {
      restrict: 'E'
    , replace: true
    , templateUrl: 'static/javascript/app/templates/partials/header.html'
  }
})

Quill.directive('siteFooter', function() {
  return {
      restrict: 'E'
    , replace: true
    , templateUrl: 'static/javascript/app/templates/partials/footer.html'
  }
})

Quill.directive('article', ['$timeout', function($timeout) {
  return {
      restrict: 'E'
    , link: function($scope, element, attrs) {
      $timeout(function() {
        Rainbow.color()
      }, 200)
    }
  }
}])
Quill.directive('time', function() {
  return {
      restrict: 'E'
    , templateUrl: 'static/javascript/app/templates/partials/time.html'
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
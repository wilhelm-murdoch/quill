Quill.directive('time', function() {
  return {
      restrict: 'E'
    , templateUrl: 'static/js/app/templates/partials/time.html'
  }
})

Quill.directive('postContent', ['$sce', function($sce) {
	return {
		restrict: 'EA',
		link: function(scope, element, attrs) {
			console.log(element.html())
		}
	}
}])
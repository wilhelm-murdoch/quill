angular.module('Quill', [])

  .controller('QuillCtrl', ['$rootScope', 'Inkwell', '$http', function($rootScope, Inkwell, $http) {
    $http.defaults.headers.common.Accept = 'application/json'
  }])

  .controller('QuillIndexCtrl', ['$scope', 'Inkwell', function($scope, Inkwell) {
    $scope.articles = Inkwell.get().success(function(resource) {
      $scope.articles = resource
    })
  }])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'QuillIndexCtrl'
      , templateUrl: 'static/javascript/angular/views/home.html'
    }).otherwise({
      redirectTo: '/'
    })
  }])

  .factory('Inkwell', ['$http', function($http) {
    return {
      get: function(year, month, day, title) {
        var url = '/inkwell'
        if(year) {
          url += '/' + year
        } else if(year && month) {
          url += '/' + year + '/' + month
        } else if(year && month && day) {
          url += '/' + year + '/' + month + '/' + day
        } else if(year && month && day && title) {
          url += '/' + year + '/' + month + '/' + day + '/' + title
        }

        return $http.get(url)
      }
    }
  }])
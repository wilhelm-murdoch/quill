Quill.service('TitleService', ['$rootScope', '$document',
  function($rootScope, $document) {
  var title = ''

  var compile = function(components) {
    components.unshift($rootScope.title)
    return _.compact(components).join(' ⋅ ')
  }

  return {
      set: function(components) {
        title = compile(components)
        return $document.prop('title', title)
      }
    , get: function() {
      return $document.prop('title')
    }
  }
}])

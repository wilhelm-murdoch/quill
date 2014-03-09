Quill.factory('ArticlesLoader', ['$resource', function($resource) {
  return $resource('/inkwell/:year/:month/:day/:title', {
      year:   '@year'
    , month:  '@month'
    , day:    '@day'
    , title:  '@title'
  })
}])

Quill.factory('ArticlePager', ['ArticlesLoader', function(ArticlesLoader) {
  var perpage   = parseInt(config.per_page)

  return function(query) {
    var limit     = perpage
    var offset    = 0
    var isDone    = false
    var query     = query || {}

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
app.factory('FetchFileFactory', function($http) {
  var _factory = {};
  
  _factory.fetchFile = function(file) {
    return $http.get('/api/resource?resource=' + encodeURIComponent(file));
  };
  
  return _factory;
});

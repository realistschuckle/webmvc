if(typeof borax === 'undefined') {
  borax = {};
}
if(!('subentities' in borax)) {
  borax['subentities'] = {};
}

(function() {
  var loaded = {};

  borax.subentities = {
    getFromUrn: function(urn, callback) {
      if(urn in loaded) {
        var response = loaded[urn];
        callback(response.err, response.resource);
        return;
      }

      var uris = borax.mediatypes.urn2urls(urn)
        , semaphore = 0
        , parts = []
        , erred = false
        , entityPartsLoaded = function() {
            var response = loaded[urn] = borax.mediatypes.multipartRelated(urn, parts);
            callback(response.err, response.resource);
          }
        ;

      if(!uris || uris.length == 0) {
        callback({
          renderTo: function(elem) {
            var msg = 'Cannot load the subentity named ' + urn + ' due to no known transition.';
            $(elem).html(msg);
          }
        });
        return;
      }

      _.each(uris, function(uri) {
        semaphore += 1;
        $.ajax(uri, {
          complete: function(xhr) {
            semaphore -= 1;
            parts.push(xhr);
            if(semaphore === 0) {
              entityPartsLoaded();
            }
          }
        });
      });
    }
  };
})();

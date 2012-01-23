if(typeof borax === 'undefined') {
  borax = {};
}
if(!('navigate' in borax)) {
  borax['navigate'] = {};
}

(function() {
  borax.navigate = {
    toFragment: function(elem) {
      var fragment = location.hash.slice(1);
      borax.subentities.getFromUrn(fragment, function(err, subentity) {
        if(err) {
          err.renderTo(elem);
        } else {
          subentity.renderTo(elem);
        }
      });
    }
  }; 
})();

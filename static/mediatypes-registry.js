if(typeof borax === 'undefined') {
  var borax = {};
}
if(!('mediatypes' in borax)) {
  borax['mediatypes'] = {};
}

(function() {
  var knockoutMultipart = function(urn, parts, modelCustomizerCallback) {
    var response = {err: null, resource: null};
    if(_.any(parts, function(part) { return part.status >= 400;})) {
      response.err = {
        renderTo: function(elem) {
          var msg = 'Could not load subentity named by ' + urn;
          $(elem).html(msg);
        }
      }
    } else {
      var templateChooser = function(part) {
        return part.getResponseHeader('content-type') == 'text/vnd.knockout-template';
      };
      var dataChooser = function(part) {
        return part.getResponseHeader('content-type') == 'text/vnd.knockout-data';
      }
      response.resource = {
        renderTo: function(elem) {
          var template = _.find(parts, templateChooser).responseText;
          var data = JSON.parse(_.find(parts, dataChooser).responseText);
          if(modelCustomizerCallback) {
            modelCustomizerCallback(data);
          }
          $(elem).html(template);
          $("link", elem).each(function(i, link) {
            $(document.head).append(link);
          });
          parseLinks();
          ko.applyBindings(data);
        }
      }
    }
    return response;
  };


  var mediatypes = borax.mediatypes
    , rels = {}
    , mimes = {}
    , urn2vars = {
        'urn\\:borax\\:organizations': {
          'createVars': function() {return {'entity': 'organizations'};},
          'uri-templates': 'unloaded-subentities-uri-template',
          'multipart': knockoutMultipart,
        },
        'urn\\:borax\\:organization\\:\\d+': {
          'createVars': function(urn) {
            return {
              'entity': 'organization',
              'id': urn.slice(urn.lastIndexOf(':') + 1)
            };
          },
          'uri-templates': 'unloaded-subentity-uri-template',
          'multipart': function(urn, parts) {
            return knockoutMultipart(urn, parts, function(model) {
              model.parent = "#urn:borax:organizations";
            });
          }
        },
        'urn\\:borax\\:people': {
          'createVars': function() {return {'entity': 'people'};},
          'uri-templates': 'unloaded-subentities-uri-template',
          'multipart': function(urn, parts) {
            return knockoutMultipart(urn, parts, function(model) {
              _.each(model.all, function(actress) {
                if(actress.hot > 7) {
                  actress.hotness = "Va va va voom!";
                } else if(actress.hot < 3) {
                  actress.hotness = "NOT!";
                } else {
                  actress.hotness = "Meh";
                }
              });
            });
          }
        },
        'urn\\:borax\\:person\\:\\d+': {
          'createVars': function(urn) {
            return {
              'entity': 'people',
              'id': urn.slice(urn.lastIndexOf(':') + 1)
            };
          },
          'uri-templates': 'unloaded-subentity-uri-template',
          'multipart': function(urn, parts) {
            return knockoutMultipart(urn, parts, function(model) {
              model.parent = "#urn:borax:people";
            });
          }
        }
      }
    ;
  
  var urnKey = function(urn) {
    var urns = _.keys(urn2vars);
    var key = _.find(urns, function(_urn) {return urn.match(new RegExp('^' + _urn + '$'))});
    return key;
  }

  mediatypes.urn2urls = function(urn) {
    var key = urnKey(urn);
    var specs = urn2vars[key];

    if(!specs || !(specs['uri-templates'] in rels)) {
      return [];
    }

    var templates = rels[specs['uri-templates']];
    var urls = _.map(templates, function(t) {
      var vars = specs.createVars(urn);
      return borax.uri_template.parse(t).expand(vars);
    });
    return urls;
  };

  mediatypes.multipartRelated = function(urn, parts) {
    return urn2vars[urnKey(urn)].multipart(urn, parts);
  };

  var parseLinks = function() {
    _.each(document.head.childNodes, function(node) {
      if(node.tagName == 'LINK') {
        if(!(node.rel in rels)) {
          rels[node.rel] = [];
        }
        var href = unescape(node.href);
        if(rels[node.rel].indexOf(href) < 0) {
          rels[node.rel].push(href);
          mimes[href] = node.type;
        }
      }
    })
  };

  $(parseLinks);
})();

(function() {

  'use strict';
  var express = require('express');
  var router = express.Router();
  var fs = require('fs');
  var path = require('path');

  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });

  /* Serve the Tree */
  router.get('/api/tree', function(req, res) {
    var _p;
    if (req.query.id == 1) {
      _p = path.resolve(__dirname, '..', 'node_modules');
      processReq(_p, res);

    } else {
      if (req.query.id) {
        _p = req.query.id;
        processReq(_p, res);
      } else {
        res.json(['No valid data found']);
      }
    }
  });

  /* Serve a Resource */
  router.get('/api/resource', function(req, res) {
    res.send(fs.readFileSync(req.query.resource, 'UTF-8'));
  });

  function processReq(_p, res) {
    var resp = [];
    fs.readdir(_p, function(err, list) {
      for (var i = list.length - 1; i >= 0; i--) {
        resp.push(processNode(_p, list[i]));
      }
      res.json(resp);
    });
  }

  function processNode(_p, f) {
    var s = fs.statSync(path.join(_p, f));
    return {
      "id": path.join(_p, f),
      "text": f,
      "icon" : s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
      "state": {
        "opened": false,
        "disabled": false,
        "selected": false
      },
      "li_attr": {
        "base": path.join(_p, f),
        "isLeaf": !s.isDirectory()
      },
      "children": s.isDirectory()
    };
  }

  module.exports = router;

}());

var wfs = require('wfs_query');
var fs = require('fs');
var baseUrl = 'http://fbinter.stadt-berlin.de/fb/wfs';
var folderOptions = ['data', 'geometry'];
var wfsOptions = ['senstadt'];

var isUrl = function(string) {
  var pattern = new RegExp('^(https?:\/\/)');
  return pattern.test(string);
};

var getWFSInfo = function(wfsUrl) {
  return new Promise(function(resolve, reject) {
    try {
      wfs.getInfo(wfsUrl).then(function(result) {
        if(result) {
          result.url = wfsUrl;
          resolve(result);
        }
      }).catch(function(e) {
        console.log(e);
      });
    } catch(e) {
      console.log(e);
    }
  });
};

var tryOutOptionsForLayerName = function(layerName) {
  return new Promise(function(resolve, reject) {
    folderOptions.forEach(function(folder) {
      wfsOptions.forEach(function(wfsOption) {
        var wfsUrl = baseUrl+'/'+folder+'/'+wfsOption+'/'+layerName;
        getWFSInfo(wfsUrl).then(function(result) {
          resolve(result);
        }).catch(function(e) {
        });
      });
    });
  });
};
var getInfo = function(layerNameOrUrl) {
  return new Promise(function(resolve, reject) {
    if (isUrl(layerNameOrUrl)) {
      getWFSInfo(layerNameOrUrl).then(function(result) {
        resolve(result);
      }).catch(function(e) {
      });
    } else {
      tryOutOptionsForLayerName(layerNameOrUrl).then(function(result) {
        resolve(result);
      }).catch(function(e) {
      });
    }
  });
};

var downloadGeoJson = function(layerNameOrUrl, fileName) {
  getInfo(layerNameOrUrl).then(function(info) {
    typeName = info.layerName;
    var feature = wfs.getFeature(info.url, typeName, 'application/json');
    feature.then(function(geojson) {
      var output = layerNameOrUrl+'.geojson';
      if (isUrl(layerNameOrUrl) || fileName) {
        if (!fileName) {
          console.error('You need to provide a fileName if you use a url parameter');
          return;
        }
        output = fileName;
      }
      fs.writeFile(output, JSON.stringify(geojson), function(err) {
        if(err) {
          console.log('err', err);
        }
        console.log('success');
      });
    });
  });
};

module.exports = {
  downloadGeoJson: downloadGeoJson,
  getInfo: getInfo
};

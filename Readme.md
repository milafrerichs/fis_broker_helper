# FIS Broker Berlin Helper Tool

This tool helps you find data in the FIS Broker, get more information and download GeoJSON versions of the data.

## Installation

install the dependencies via `yarn install` or `npm install`

## Usage

require the package via `var fis = require('./index');`

There are thwo methods you can use for now:

1. `getInfo`
2. `downloadGeoJson`

### `getInfo`

It takes one parameter, which can either be an layerName e.g. `re_direktion` or the complete url: `http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_direktion`  
Either way, the tool will find the layer and prints out the short information for that layer.


### `downloadGeoJson`

You call `downloadGeoJson` with either one or two parameters. If you provide one parameter it should be the layerName `re_direktion` otherwise it will fail.
If you provide two parameters, the first can be either the layerName or the URL. The second parameter is the output filename.  

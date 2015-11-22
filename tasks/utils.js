'use strict';

// common functions

var fs = require('fs');
var path = require('path');
var moment = require('moment-timezone');

function listFilePaths(type) {
  var allFiles = fs.readdirSync('./data/' + type + '/v1');
  var jsonFilePaths = [];

  allFiles.forEach(function(file) {
    if (path.extname(file) === '.json') {
      jsonFilePaths.push('./data/' + type + '/v1/' + file);
    }
  })

  return jsonFilePaths;
}

function getCurrentDayData(data, type) {
  var today = moment(data.meta.generated_at);
  var compare = type === 'events' ? 0 : 1;
  var compareTime = type === 'events' ? 'start_time' : 'pushed_at';
  var answer = {};
  answer.meta = data.meta;
  answer[ type ] = [];

  data[ type ].forEach(function(element) {
    if (today.diff(moment(element[ compareTime ]), 'days') === compare) {
      answer[ type ].push(element);
    }
  })

  answer.meta['total_' + type] = answer[ type ].length;

  return answer;
}

function getWeekNumber(generatedDate) {
  return moment(generatedDate).isoWeek();
}

function publishData(name, data) {
  fs.writeFile('public/data/' + name + '.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log(err)
    }

    console.log('File public/data/' + name + '.json saved!');
  });
}

exports.listFilePaths = listFilePaths;
exports.getCurrentDayData = getCurrentDayData;
exports.publishData = publishData;
exports.getWeekNumber = getWeekNumber;

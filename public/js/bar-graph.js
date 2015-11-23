(function () {
  'use strict';

  function drawGraph(type, data, attr) {
    var max_n = 0;
    data.forEach(function(d) {
      max_n = Math.max(d.n, max_n);
    })

    var graph = d3.select('#' + type);

    var bars = graph.selectAll('.bar')
      .data(data)
      .enter()
      .append('div').classed('bar', true)

    bars
      .append('div')
      .classed('graph-label', true)
      .append('a')
      .attr('href', function(d) {
        return d.url;
      })
      .attr('target', '_blank')
      .text(function(d) {
        return d[ attr ]
      });

    bars
      .append('div')
      .classed('graph-bar', true)
      .style('width', function(d) {
        return (d.n/max_n * 70) + '%'
      })
      .text(function(d) {
        return d.n
      })
  }

  [
    'repos-per-programming',
    'events-per-group'
  ].forEach(function(type) {
    d3.json('public/data/' + type + '.json', function(error, data) {
      if (error) {
        console.log(error)
      }

      var attr = type === 'repos-per-programming' ? 'language': 'group';
      drawGraph(type, data, attr);
    });
  })
})();

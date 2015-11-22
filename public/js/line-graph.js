(function () {
  'use strict';

  function drawLine(name, data) {
    var m = [80, 80, 80, 80];
    var w = 1000 - m[1] - m[3];
    var h = 400 - m[0] - m[2];

    var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    var y = d3.scale.linear().domain([0, 50]).range([h, 0]);
    var line = d3.svg.line()
      .x(function(d,i) {
        return x(i);
      })
      .y(function(d) {
        return y(d);
      })

    var graph = d3.select('#' + name).append('svg:svg')
      .attr('width', w + m[1] + m[3])
      .attr('height', h + m[0] + m[2])
      .append('svg:g')
      .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');

    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

    graph.append('svg:g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis);

    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient('left');

    graph.append('svg:g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(-25,0)')
      .call(yAxisLeft);

    graph.append('svg:path').attr('d', line(data));
  }

  [
    'repos-per-week',
    'events-per-week'
  ].forEach(function(el) {
    d3.json('public/data/' + el + '.json', function(error, json) {
      if (error) {
        console.log(error)
      }

      drawLine(el, json[ el.slice(0, -9) ])
    });
  })
})();



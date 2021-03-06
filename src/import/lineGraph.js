/* eslint-env browser */
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-axis'),
  require('d3-shape'));
/**
 * Builds a Line Graph.
 * @constructor
 * @param {String} mode (init / refresh)
 * @exports lineGraph
 */

const lineGraph = function chart() {
  const svgContainer = d3.select(`#${this.chartData.selector}`);
  const cs = {
    pallette: {
      lineFill: '#ffcdcd',
      pointFill: '#005792',
      pointStroke: '#d1f4fa',
    },
    x: {
      domain: [],
      range: [],
      axisHeight: 20,
    },
    y: {
      axisWidth: 30,
      ticks: 5,
    },
  };

    /**
     * @method enter
     * @description Runs when a new element is added to the dataset
     */
  const enter = (points) => {
    svgContainer.append('path')
      .datum(this.ds)
      .attr('fill', 'none')
      .attr('stroke', cs.pallette.lineFill)
      .attr('stroke-width', 3)
      .attr('d', cs.lineFunction);

    points.enter()
      .append('circle')
      .attr('class', this.selector)
      .attr('r', 2)
      .on('mouseover', (d) => {
        this.addTooltip(d, window.event);
      })
      .on('mouseout', (d) => {
        this.removeTooltip(d);
      })
      .attr('cx', d => cs.x.scale(d.dim) + cs.y.axisWidth + 5)
      .attr('cy', d => cs.y.scale(d.metric));
    return points;
  };
    /**
     * @method transition
     * @description Runs when a value of an element in dataset is changed
     */
  const transition = (points) => {
    svgContainer.selectAll('path')
      .datum(this.ds)
      .transition()
      .attr('d', cs.lineFunction);

    points.transition()
      .attr('cx', d => cs.x.scale(d.dim) + cs.y.axisWidth + 5)
      .attr('cy', d => cs.y.scale(d.metric))
      .attr('cx', d => cs.x.scale(d.dim) + cs.y.axisWidth + 5)
      .attr('cy', d => cs.y.scale(d.metric));
    return points;
  };

    /**
     * @method exit
     * @param {Object} rect (svg element)
     * @description Runs when an element is removed from the dataset
     */
  const exit = (points) => {
    points.exit().remove();
    return points;
  };

    /**
     * @method buildScales
     * @description builds the scales for the x and y axis
     */
  const buildScales = () => {
    cs.y.scale = d3.scaleLinear()
      .domain([this.min, this.max])
      .range([this.height - cs.x.axisHeight, this.header]);
    cs.y.axis = d3.axisLeft().ticks(cs.y.ticks, 's').scale(cs.y.scale);
    this.ds.forEach(t => cs.x.domain.push(t.dim));
    this.ds.forEach((t, i) => cs.x.range.push(((this.width * i) - this.header) / this.ds.length));
    cs.x.scale = d3.scaleOrdinal().domain(cs.x.domain).range(cs.x.range);
  };
    /**
     * @method drawAxis
     * @description draws the x and y axis on the svg
     */
  const drawAxis = () => {
    cs.x.axis = d3.axisBottom().scale(cs.x.scale);
    cs.x.xOffset = cs.y.axisWidth + 5;
    cs.x.yOffset = this.height - cs.x.axisHeight;
    cs.y.xOffset = cs.y.axisWidth;
    cs.y.yOffset = 0;
  };
    /**
     *
     * Helper Functions
     */
  cs.lineFunction = d3.line()
    .x(d => cs.x.scale(d.dim) + cs.y.axisWidth + 5)
    .y(d => cs.y.scale(d.metric));

  const points = svgContainer.selectAll('circle').data(this.ds);

  buildScales(cs);
  drawAxis(cs);
  enter(points);
  transition(points);
  exit(points);

  svgContainer.append('g').append('g').attr('class', 'axis').attr('transform', `translate(${cs.x.xOffset}, ${cs.x.yOffset})`)
    .call(cs.x.axis);
  svgContainer.append('g').append('g').attr('class', 'axis').attr('transform', `translate(${cs.y.xOffset},${cs.y.yOffset})`)
    .call(cs.y.axis);
};

export default lineGraph;

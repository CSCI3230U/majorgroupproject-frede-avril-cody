const randyQuotes = ['This is a balanced tree, even Thanos would approve - Randy 2019', 'You get wood, you get weapons, you get bombs... are there bombs in Fortnite? I have only played twice, but anyways... - Randy 2019', 'People think of K-maps and they think of K-pop, which is not as trendy as it used to be but you know, it is still fun... - Randy 2020'];


var barData = [
     {"handle": "@randy", "tweets": 13},
     {"handle": "@mariana", "tweets": 3},
     {"handle": "@joe", "tweets": 10},
     {"handle": "@mihai", "tweets": 5},
     {"handle": "@ken", "tweets": 1},
];
var pieData = {};
var linearData = {};

const margin = 50;
const width = 800;
const height = 500;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

window.onload = function() {

     const colourScale = d3.scaleLinear()
                            .domain([0, getMostTweets(barData)])
                            .range(['#badcea', '#accaee']);

     // place bar chart in barChart div
     var barSvg = d3.select("#barChart")
                         .append("svg")
                              .attr("width", width)
                              .attr("height", height);

     const xScaleBar = d3.scaleBand()
                         .domain(barData.map((data) => data.handle))
                         .range([0, chartWidth])
                         .padding(0.3);
     
     const yScaleBar = d3.scaleLinear()
                         .domain([0,getMostTweets(barData)])
                         .range([chartHeight, 0]);

     // title
     barSvg.append('text')
          .attr('x', width / 2)
          .attr('y', margin)
          .attr('text-anchor', 'middle')
          .text('Users with most tweets');

     // create a group (g) for the bars
    let g = barSvg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

     // y-axis
     g.append('g')
          .call(d3.axisLeft(yScaleBar));

     // x-axis
     g.append('g')
          .attr('transform', `translate(0, ${chartHeight})`)
          .call(d3.axisBottom(xScaleBar));

     let rectangles = g.selectAll('rect')
          .data(barData)
          .enter()
               .append('rect')
                    .attr('x', (data) => xScaleBar(data.handle))
                    .attr('y', (data) => yScaleBar(data.tweets))
                    .attr('width', xScaleBar.bandwidth())
                    .attr('height', (data) => chartHeight - yScaleBar(data.tweets))
                    .attr('fill', (data) => colourScale(data.tweets))
                    .on('mouseenter', function(source, index) {
                         d3.select(this)
                              .transition()
                              .duration(200)
                              .attr('opacity', 0.5);
                    })
                    .on('mouseleave', function(source, index) {
                         d3.select(this)
                              .transition()
                              .duration(200)
                              .attr('opacity', 1.0);
                    });

     

};

function getMostTweets(data){
     let mostTweets = 0;
     data.forEach(element => {
          if (element.tweets > mostTweets) {
               mostTweets = element.tweets;
          }
     });

     return mostTweets+1;
}
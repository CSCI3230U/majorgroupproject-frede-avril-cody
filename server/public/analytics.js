const randyQuotes = ['This is a balanced tree, even Thanos would approve - Randy 2019', 'You get wood, you get weapons, you get bombs... are there bombs in Fortnite? I have only played twice, but anyways... - Randy 2019', 'People think of K-maps and they think of K-pop, which is not as trendy as it used to be but you know, it is still fun... - Randy 2020'];


var barData = [
     {"handle": "@randy", "tweets": 13},
     {"handle": "@mariana", "tweets": 3},
     {"handle": "@joe", "tweets": 10},
     {"handle": "@mihai", "tweets": 5},
     {"handle": "@ken", "tweets": 1},
];

var pieData = [
     {"handle": "@randy", "likes": 13},
     {"handle": "@mariana", "likes": 3},
     {"handle": "@joe", "likes": 10},
     {"handle": "@mihai", "likes": 5},
     {"handle": "@ken", "likes": 1},
];

const margin = 50;
const width = 800;
const height = 500;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

window.onload = function() {
     drawBarChart();
     drawPieChart();
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

function drawBarChart(){
     barData.sort((a, b) => (a.tweets > b.tweets) ? 1 : -1);

     let colourScale = d3.scaleLinear()
                            .domain([0, getMostTweets(barData)])
                            .range(['#DFF5FE', '#accaee']);

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
}

function drawPieChart(){

     // color change not currently working
     let colourScale = d3.scaleOrdinal()
                         .domain([0,getMostLikes(pieData)])
                         .range(["#BADEED", "#98D0E7", "#60B6D9", "#3E9AC0"]);

     // place bar chart in barChart div
     let pieSvg = d3.select("#pieChart")
                         .append("svg")
                              .attr("width", width)
                              .attr("height", height);
     
     // parse the data to get the angles
     let parsedData = d3.pie().sort(null).value(function(d) {return d.likes})(pieData);
     console.log(parsedData);

     // arc details
     let arcs = d3.arc()
                    .innerRadius(100)
                    .outerRadius(200)
                    .padAngle(0.1)
                    .padRadius(50);

     // pie pieces details
     let piePieces = pieSvg.append('g')
                              .attr("transform", "translate(400,250)")
                              .selectAll("path").data(parsedData);

     piePieces.enter()
               .append("path")
               .attr("d", arcs)
               .attr("fill", (data) => colourScale(data.likes));

     // 400 translation + 200 outer radius
     let center = 400 + 200;

     // append the handles to the data
     pieSvg.append('text')
               .data(parsedData)
               .enter()
               .text((data) => data.data.handle)
               .attr("x", (data) => getlabely(data.data));


}

function getlabely(data){
     return "translate(600)"
}

function getLikes(data){
     let likes = [];
     data.forEach(element => {
          likes.push(element.likes);
     });

     return likes;
}

function getMostLikes(data){
     let mostLikes = 0;
     data.forEach(element => {
          if (element.likes > mostLikes) {
               mostLikes = element.likes;
          }
     });

     return mostLikes+1;
}
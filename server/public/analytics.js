const randyQuotes = ['This is a balanced tree, even Thanos would approve - Randy 2019', 'You get wood, you get weapons, you get bombs... are there bombs in Fortnite? I have only played twice, but anyways... - Randy 2019', 'People think of K-maps and they think of K-pop, which is not as trendy as it used to be but you know, it is still fun... - Randy 2020'];

const margin = 50;
const width = 800;
const height = 500;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;

var barChartHtmlTable;
var pieChartHtmlTable;

window.onload = function() {
     fetch('http://localhost:4000/getMostTweeted')
            .then((response) => response.json())
            .then((json) => drawBarChart(json));

     fetch('http://localhost:4000/getMostLiked')
            .then((response) => response.json())
            .then((json) => drawPieChart(json)); 

     $('#barData').click(function() {
          let modal = document.getElementById('barChartModal');
          modal.appendChild(barChartHtmlTable);
          $('#barModal').toggleClass("is-active");

          $('.modal-close').click(function(){
               if ($('#barModal').hasClass("is-active")) {
                    $('#barModal').toggleClass("is-active");
               }
          });
     });

     $('#pieData').click(function() {
          let modal = document.getElementById('pieChartModal');
          modal.appendChild(pieChartHtmlTable);
          $('#pieModal').toggleClass("is-active");

          $('.modal-close').click(function(){
               if ($('#pieModal').hasClass("is-active")) {
                    $('#pieModal').toggleClass("is-active");
               }
          });
     });
};

function getMostTweets(data){
     let mostTweets = 0;
     data.forEach(element => {
          if (element["COUNT(message)"] > mostTweets) {
               mostTweets = element["COUNT(message)"];
          }
     });

     return mostTweets+1;
}

function drawBarChart(barData){
     
     barData.sort((a, b) => (a["COUNT(message)"] > b["COUNT(message)"]) ? 1 : -1);

     let colourScale = d3.scaleLinear()
                            .domain([0, getMostTweets(barData)])
                            .range(['#DFF5FE', '#accaee']);

     // place bar chart in barChart div
     var barSvg = d3.select("#barChart")
                         .append("svg")
                              .attr("width", width)
                              .attr("height", height);

     const xScaleBar = d3.scaleBand()
                         .domain(barData.map((data) => data.sender))
                         .range([0, chartWidth])
                         .padding(0.3);
     
     const yScaleBar = d3.scaleLinear()
                         .domain([0,getMostTweets(barData)])
                         .range([chartHeight, 0]);


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
                                   .attr('x', (data) => xScaleBar(data.sender))
                                   .attr('y', (data) => yScaleBar(data["COUNT(message)"]))
                                   .attr('width', xScaleBar.bandwidth())
                                   .attr('height', (data) => chartHeight - yScaleBar(data["COUNT(message)"]))
                                   .attr('fill', (data) => colourScale(data["COUNT(message)"]))

     barChartHtmlTable = createTable(barData, "Users", "Tweets", "COUNT(message)");
}


function drawPieChart(pieData){
     console.log(pieData);
     let colourScale = d3.scaleOrdinal(["#BADEED", "#98D0E7", "#60B6D9", "#519BBA", "#4F8298"]);

     // place bar chart in barChart div
     let pieSvg = d3.select("#pieChart")
                         .append("svg")
                              .attr("width", width)
                              .attr("height", height);
     
     // parse the data to get the angles
     let parsedData = d3.pie().sort(null)
                         .value(function(d) {return d["SUM(likes)"]})(pieData);
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
                              .selectAll('path')
                              .data(parsedData)
                              .enter()
                                   .append('path')
                                        .attr('d', arcs)
                                        .attr('fill', (data) => colourScale(data.data["SUM(likes)"]));
     // legend colors
     pieSvg.selectAll('rect')
               .data(parsedData)
               .enter()
                    .append('rect')
                         .attr('x', 50)
                         .attr('y', (data, i) => (i+1)*40)
                         .attr('width', 30)
                         .attr('height', 30)
                         .attr('fill', (data) => colourScale(data.data["SUM(likes)"]))

     // // legend text
     pieSvg.selectAll('text')
               .data(parsedData)
               .enter()
                    .append('text')
                         .attr('x', 90)
                         .attr('y', (data, i) => (i+1)*40 + 20)
                         .text(data => `${data.data.sender}`);
     
     pieChartHtmlTable = createTable(pieData, "Users", "Likes", "SUM(likes)");
}

function getLikes(data){
     let likes = [];
     data.forEach(element => {
          likes.push(element["SUM(likes)"]);
     });

     return likes;
}

function getMostLikes(data){
     let mostLikes = 0;
     data.forEach(element => {
          if (element.likes > mostLikes) {
               mostLikes = element["SUM(likes)"];
          }
     });

     return mostLikes+1;
}

function getLeastLikes(data){
     let leastLikes = getMostLikes(data);
     data.forEach(element => {
          if (element["SUM(likes)"] < leastLikes) {
               leastLikes = element["SUM(likes)"];
          }
     });

     return leastLikes;
}

function createTable(data, header1, header2, attribute){
     let table = document.createElement('table');
     let tr = document.createElement('tr');
     tr.className = "bold";
     let td1 = document.createElement('td');
     let text = document.createTextNode(header1);
     td1.appendChild(text);
     let td2 = document.createElement('td');
     text = document.createTextNode(header2);
     td2.appendChild(text);
     tr.appendChild(td1);
     tr.appendChild(td2);
     table.appendChild(tr);

     data.forEach(element => {
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          let text = document.createTextNode(element.sender);
          td1.appendChild(text);
          let td2 = document.createElement('td');
          text = document.createTextNode(element[`${attribute}`]);
          td2.appendChild(text);
          tr.appendChild(td1);
          tr.appendChild(td2);
          table.appendChild(tr);
     });

     return table
}
 //http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
    //https://d3-wiki.readthedocs.io/zh_CN/master/Stack-Layout/

const loadData = [
    {equipment: "Plug Loads", energy: 13.2, alt: 13.2, color: "#6600ff"},
    {equipment: "Lighting", energy: 8, alt: 4.5, color: "#aaff00"},
    {equipment: "Heating", energy: 3.8, alt: 7.3, color: "#ff5500"},
    {equipment: "Hot Water", energy: 2.4, alt: 2.4, color: "#990000"},
    {equipment: "Cooling", energy: 1.4, alt: 0, color: "#0099ff"},
    {equipment: "Pumps", energy:  0.4, alt: 1.7, color: "#b3b3cc"},
    {equipment: "Fans", energy: 2.1, alt: 0.2, color: "#595959"},
    {equipment: "Heat Rejection", energy: 0.5, alt: 1,  color: "#558000"}
];



var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 400 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
 
var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);
 
var y = d3.scale.linear()
        .rangeRound([height, 0]);
 
var color = d3.scale.category20();

//this shows the actualy text of the scale.
var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

//this shows the actualy text of the scale.
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
 
var svg = d3.select(".graph").append("svg")
        .attr("width", width + margin.left + margin.right+100 )
        .attr("height", height + margin.top + margin.bottom)
        //you don't really need this. this moves the graph to the middle...
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
//transforms loadData into data that we can read to make graph
const dataIntermediate = loadData.map(function(d) {
    return {equipment: d.equipment, value: [{x: 0, y: d.energy}], color: d.color}
})



var stack = d3.layout.stack()
    .values(function(d) { return d.value; });

 const dataStackLayout = stack(dataIntermediate);

 
x.domain(dataStackLayout[0].value.map(function (d) {
    return d.x;
}));

 //nice rounds numbers well. d3 function only
 //https://d3indepth.com/scales/
 //y0 within dataStackLayout is like "where you are starting on the y axis", y is then how much more you are going
y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1].value,
            function (d) { return d.y0 + d.y;})
    ])
  .nice();
 
var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        //you need the d for some reason, removing d result in one color, d will give you multiple colors. maybe d is number of elements on data
        .style("fill", function (d) {
            return d.color;
        });
 
layer.selectAll("rect")
        //for some reason, by the time you get here, the first time you run this, you get the dataStackLayout[0]
        .data(function (d) {
            return d.value;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) { // https://github.com/d3/d3-3.x-api-reference/blob/master/Stack-Layout.md
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());
 
svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(0)")
        .call(yAxis);



// Draw legend
var legend = svg.selectAll(".legend")
  .data(loadData)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d) {return d.color});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d) {
        return d.equipment
    }
  )
  .style('margin', '200px')


const columnTable = ['equipment','energy','alt'];
const columnLabel = ['Space Type', 'WSEC Standard Design \n DOAS with Fan Coil', 'Option 2 Design \n DOAS with Radiant'];
const unitLabel = ['Detailed Breakdown', 'kBtu/sf', 'kBtu/sf'];
  
 const table =  d3.select('.results-table')
  .append('table');
  
const thead = table.append('thead');
const units = table.append('thead');
const tbody = table.append('tbody');

thead.selectAll('th')
  .data(columnLabel)
  .enter()
  .append('th')
  .attr('class', 'header-table')
  .text(function(d){return d});
  
  
units.selectAll('th')
  .data(unitLabel)
  .enter()
  .append('th')
  .attr('class','units-table')
  .text(function(d){return d});


  
const row = tbody.selectAll('tr')
  .data(loadData)
  .enter()
  .append('tr');

const cell = row.selectAll('td')
  .data(function(row){
    return columnTable.map(function(column){
      return {column: column, value:row[column]}
    })
  })
  .enter()
  .append('td')
  .text(function(d){ return d.value;});

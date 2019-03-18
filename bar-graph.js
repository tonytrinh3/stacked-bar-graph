 //http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
    //https://d3-wiki.readthedocs.io/zh_CN/master/Stack-Layout/
/*
var data = [
    {month: 'Jan', A: 13.2, B: 8, C: 3.8, D: 2.4, E: 1.4, F: 0.4, G: 2.1, H: 0.5}
];
 
var xData = ["A", "B", "C", "D", "E", "F", "G", "H"];
*/

const loadData = [
    {equipment: "plug loads", energy: 13.2, color: "#6600ff"},
    {equipment: "lighting", energy: 8, color: "#aaff00"},
    {equipment: "heating", energy: 3.8, color: "#ff5500"},
    {equipment: "hot water", energy: 2.4, color: "#990000"},
    {equipment: "cooling", energy: 1.4, color: "#0099ff"},
    {equipment: "pumps", energy:  0.4, color: "#b3b3cc"},
    {equipment: "fans", energy: 2.1, color: "#595959"},
    {equipment: "heat rejection", energy: 0.5, color: "#558000"}
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
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //you don't really need this. this moves the graph to the middle...
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
/*       
var dataIntermediate = xData.map(function (c) {
    return data.map(function (d) {
        return {x: d.month, y: d[c]};
    });
});
*/

const dataIntermediate = loadData.map(function(d) { 
    return {equipment: d.equipment, value: [{x: 0, y: d.energy}], color: d.color}
})



var stack = d3.layout.stack()
    .values(function(d) { return d.value; });


 const dataStackLayout = stack(dataIntermediate);

//var dataStackLayout = d3.layout.stack()(dataIntermediate);
 
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
        .style("fill", function (d, i) {
            return color(i);
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


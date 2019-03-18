

//http://www.d3noob.org/2012/12/setting-up-margins-and-graph-area.html refer to this to explain. i think the margins are saved for you to write stuff on it
const margin = {top: 20, right: 20, bottom: 20, left: 20};
const padding = {top:60, right: 60, bottom: 60, left: 60};
const outerWidth = 960;
const outerHeight = 500;

const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;

const width = innerWidth  - padding.left - padding.right;
const height = innerHeight - padding.top - padding.bottom; 




//linear scale is like a mx+b = y line on the graph
const x = d3.scale.identity()
    .range([0, width]);

const y = d3.scale.identity()
    .range([0,height]);
//this shows the actualy text of the scale.
const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");


//svg is the whole graph including the arrows and such
let svg = d3.select('.graph')
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//g is the rect in the middle of the graph
const g = svg.append('g')
    .attr('transform','translate(' + padding.left + ',' + padding.top + ')');

//defs used to store graphical object that will be used at a later time
const defs = svg.append('defs');

//to create those arrows
defs.append('marker')
    .attr('id','trangle-start')
    .attr('viewBox','0 0 10 10')
    .attr('refX', 10)
    .attr('refY', 5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z'); //https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

defs.append('marker')
    .attr('id','triangle-end')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 10)
    .attr('refY', 5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z');



g.append('rect')
    .attr('class','inner')
    .attr('width', width)
    .attr('height', height);

//this shows the xAxis stuff, this puts markings on the bottom side

g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

//this show the yAxis stuff, this puts the markings on the right hand side
g.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + width + ')')
    .call(yAxis);

/*
//this will put the markings back at the top and left hand side
//https://stackoverflow.com/questions/10893004/d3-transform-scale-and-translate
g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(height)')
    .call(xAxis);

g.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(width)')
    .call(yAxis);
*/
    

svg.append('line')
    .attr('class', 'arrow')
    .attr('x2', padding.left)
    .attr('y2', padding.top)
    .attr('marker-end', 'url(#triangle-end');


//create that top vertical line
svg.append('line')
    .attr('class', 'arrow')
    .attr('x1', innerWidth / 2)
    .attr('x2', innerWidth / 2)
    .attr('y2', padding.top)
    .attr('marker-end', 'url(#triangle-end)');

//create that bottom vertical line
svg.append('line')
    .attr('class','arrow')
    .attr('x1', innerWidth / 2)
    .attr('x2', innerWidth / 2)
    .attr('y1', innerHeight - padding.bottom)
    .attr('y2', innerHeight)
    .attr('marker-start', 'url(#triangle-start)')


//create that left horizontal line
svg.append('line')
    .attr('class','arrow')
    .attr('x2', padding.left)
    .attr('y1', innerHeight / 2)
    .attr ('y2', innerHeight / 2)
    .attr( 'marker-end', 'url(#triangle-end)');

//create that right horizontal line
svg.append('line')
    .attr('class', 'arrow')
    .attr('x1', innerWidth)
    .attr('x2', innerWidth - padding.right)
    .attr('y1', innerHeight / 2)
    .attr('y2', innerHeight / 2 )
    .attr('marker-end','url(#triangle-end)');

svg.append('text')
    .text('origin')
    .attr('y',-8);

svg.append('circle')
    .attr('class', 'origin')
    .attr('r', 4.5)
    .attr('y',-8);

g.append('text')
    .text('translate(margin.left, margin.top)')
    .attr('y',-8);


const data = [70,120,60,150,200];
const barPadding = 50;
var svgWidth = 500;
var svgHeight = 300;
const barWidth = (svgWidth / data.length);

const bar = d3.select('.bar')
    .attr('width', svgWidth)
    .attr('height',svgHeight)


bar.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    //holy shit, you are shifting the baseline of what is consider "y" downward, it
    .attr('y', function(d) {
        return svgHeight-d
    })
    .attr('width',  barWidth-barPadding)
    .attr('height', function (d) { return d;})
    //this here is when the magic happens when making bar
    //i is the iteration count of data
    //i like this better
    //    .attr("transform", function (d, i) {
    //   var translate = [barWidth * i, 0];
    //   return "translate("+ translate +")";
    // });
    .attr('transform',function (d,i){
        //oh this translate moves the bars from left to right on the x axis and placing the bars
        const translate = [barWidth * i, 0]
        return 'translate( '+ translate +')'
    })

/*
g.append('svg')
    .attr('class','plug-loads')
    .append('rect')
    .attr('width',200)
    .attr('height',100)
    .attr('fill','green')
    .attr('y',30)
    .attr('x',500);
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

const widther = 250;
let sum = 0;
//sum of all loadData
for (i=0; i < loadData.length; i++ ) {

     sum = sum + loadData[i].energy

};

const heighter = sum;





const test= d3.select('.test')
    .attr('width', widther)
    .attr('height',heighter)


let dum = 0;
test
.selectAll('rect')
.data(loadData)
.enter()
.append('rect')
.attr('width', widther/2)
.attr('height', function(d) {return d.energy})
.attr('fill', function (d) { return d.color})
.attr('x',widther/2)
.attr('y', 
    0 );

/*
  svg.append("g")
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("fill", (d, i) => color(data.keys[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("x", (d, i) => x(data.names[i]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[0].energy)
.attr('fill', loadData[0].color)
.attr('y',height-loadData[0].energy)
.attr("x",0);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[1].energy)
.attr('fill', loadData[1].color)
.attr('y',height-loadData[1].energy-loadData[0].energy)
.attr("x",0);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[2].energy)
.attr('fill', loadData[2].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy)
.attr("x",0);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[3].energy)
.attr('fill', loadData[3].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy-loadData[3].energy)
.attr("x",0);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[4].energy)
.attr('fill', loadData[4].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy-loadData[3].energy-loadData[4].energy)
.attr("x", 0);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[5].energy)
.attr('fill', loadData[5].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy-loadData[3].energy-loadData[4].energy-loadData[5].energy);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[6].energy)
.attr('fill', loadData[6].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy-loadData[3].energy-loadData[4].energy-loadData[5].energy-loadData[6].energy);

test.append('rect')
.attr('width', width/2)
.attr('height',loadData[7].energy)
.attr('fill', loadData[7].color)
.attr('y',height-loadData[1].energy-loadData[0].energy-loadData[2].energy-loadData[3].energy-loadData[4].energy-loadData[5].energy-loadData[6].energy-loadData[7].energy);
*/
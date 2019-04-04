 //http://www.adeveloperdiary.com/d3-js/create-stacked-bar-chart-using-d3-js/
    //https://d3-wiki.readthedocs.io/zh_CN/master/Stack-Layout/

const loadData = [
  {design: 'Baseline', plugLoads:12.5, lighting: 5.8, heating: 8.1, hotWater: 0.8, cooling: 4.3, pumps: 0.6, fans: 4.4, heatRejection: 5, cooking: 1.2 },
  {design: 'Option 1', plugLoads:12.5, lighting: 3.8, heating: 4.1, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0, cooking: 1.2 },
  {design: "Option 2", plugLoads:12.5, lighting: 3.8, heating: 4, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0.0, cooking: 1.2 },
  {design: "Option 3", plugLoads:12.5, lighting: 3.8, heating: 4, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0, cooking: 1.2 }
  
];



//change this will change order?
const valueChoose = ['hotWater', 'heating','heatRejection', 'lighting','plugLoads','pumps','cooling' ,'fans','cooking'];


const legendLabel = [
  {label: 'Hot Water', color: '#E53935'},
  {label: 'Heating', color: '#FB8C00'},
  {label: 'Heat Rejection', color: '#FFB300'},
  {label: 'Lighting', color: '#FDD835'},
  {label: 'Plug Loads', color: '#7CB342'},
  {label: "Pumps", color: '#00897B'},
  {label: "Cooling", color: '#039BE5'},
  {label: 'Fans', color: '#3949AB'},
  {label: 'Cooking', color: '#8E24AA'}
];

const margin = {top: 20, right: 50, bottom: 30, left: 50},
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;


// $(window).on("scroll", function(){
//   if($(".graph").scrollTop() === 110){
//     $(window).off("scroll");
//     something();
//   }
// })
 
// const waypoint = new Waypoint({
//   element: document.getElementsByClassName('graph'),
//   handler: something()
// })


const svg = d3.select(".graph").append("svg")
  .attr("width", width + margin.left + margin.right + 100 )
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const stack = d3.stack()
  .keys(valueChoose)
  .order(d3.stackOrderNone)
  .offset(d3.stackOffsetNone);

const dataStackLayout = stack(loadData);


const y = d3.scaleLinear()
  .range([height, 0]);
 
y.domain([0,
  d3.max(dataStackLayout[dataStackLayout.length - 1],
    function (d) { return d[1];})
  ])
.nice();

const x = d3.scaleBand()
  .range([0, width])
  .padding(0.35);

x.domain(dataStackLayout[0].map(function (d) {
  return d.data.design;
}))


svg.append('g')
.attr("class", "axis")
.attr('transform', `translate(0, ${height})`)
.call(d3.axisBottom(x));

svg.append('g')
.call(d3.axisLeft(y));

  // svg.append("g")
  //     .attr("class", "axis")
  //     .call(d3.axisLeft(y).ticks(null, "s"))
  //   .append("text")
  //     .attr("x", 2)
  //     .attr("y", y(y.ticks().pop()) + 0.5)
  //     .attr("dy", "0.32em")
  //     .attr("fill", "#000")
  //     .attr("font-weight", "bold")
  //     .attr("text-anchor", "start");


// y axis label
svg.append('text')
  .attr('x', -height/2)
  .attr('y', -margin.right/2-5)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Energy Load (kBtu/SF)')
  .style('font-weight', 'bold')


//x axis label
// svg.append('text')
//   .attr('x', width / 2 + margin)
//   .attr('y', 40)
//   .attr('text-anchor', 'middle')
//   .text('Most loved programming languages in 2018')

const barRender = function(){

  const layer = svg.selectAll(".stack")
    .data(dataStackLayout)
    .enter().append("g")
    .attr("class", "stack")
    //you need the d for some reason, removing d result in one color, d will give you multiple colors. maybe d is number of elements on data
    .style("fill", function (d,i) {
        return legendLabel[i].color;
    });
    
  layer.selectAll("rect")
    //for some reason, by the time you get here, the first time you run this, you get the dataStackLayout[0]
    .data(function (d) {
        return d;
    })
    .enter().append("rect")
    .attr("x", function (d) {
        return x(d.data.design);
    })
    //this is needed here in order to get the bar going from bottom to top
    .attr('y', function(d){
      return height;
    })
    .attr("width", x.bandwidth())
    .transition()
    .duration(800)
    .ease(d3.easePolyOut)
    .attr("y", function (d) { // https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0
        return y(d[1]);
    })
    .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
    })
  
//tooltip implemented
layer.selectAll('rect')
  .on('mouseover', function(){
    tooltip.style('display',null);
  })
  .on('mouseout',function(){
    tooltip.style('display','none');
  })
  .on('mousemove', function(d){
    const xPosition = d3.mouse(this)[0]-15;
    const yPosition = d3.mouse(this)[1]-25;
    const number = d[1]-d[0];
    tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
    tooltip.select('text').text(`${number.toFixed(1)}`);
  })
 
}

// Draw legend
const legend = svg.selectAll(".legend")
  .data(legendLabel)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d,i) {return legendLabel[i].color});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d) {
        return d.label
    }
  )
  .style('margin', '200px')
  
  
// Prep the tooltip bits, initial display is hidden
const tooltip = svg.append('g')
  .attr('class', 'tooltip')
  .style('display','none');
  
tooltip.append('rect')
  .attr('width', 30)
  .attr('height',20)
  .attr('fill','white')
  .style('opacity',0.5);
  
tooltip.append('text')
  .attr('x', 15)
  .attr('dy','1.2em')
  .style('text-anchor','middle')
  .attr('font-size','12px')
  .attr('font-weight','bold');


//activates bar graph when it reaches to .graph div
//https://github.com/imakewebthings/waypoints/issues/158
//http://imakewebthings.com/waypoints/api/offset-option/#percentage
$('.graph').waypoint(function(){
  barRender();
}, {
  triggerOnce: true,
  offset: 'bottom-in-view'
})



//result table below graph
const columnLabel = ['Equipment','Baseline', 'Option 1','Option 2','Option 3'];
const unitLabel = ['Detailed Breakdown', 'kBtu/sf', 'kBtu/sf', 'kBtu/sf', 'kBtu/sf'];


const loadDataTable = [
    {equipment: "Plug Loads", baseLine: 12.5, option1: 12.5, option2: 12.5, option3: 12.5 },
    {equipment: "Lighting", baseLine: 5.8, option1: 3.8, option2: 3.8, option3: 3.8 },
    {equipment: "Heating", baseLine: 8.1, option1: 4.1, option2: 4, option3: 4  },
    {equipment: "Hot Water", baseLine: 0.8, option1: 0.8, option2: 0.8, option3: 0.8 },
    {equipment: "Cooling", baseLine: 4.3, option1: 1.9, option2: 1.9, option3: 1.9 },
    {equipment: "Pumps", baseLine: 0.6, option1: 0.6, option2: 0.6, option3: 0.6 },
    {equipment: "Fans", baseLine: 4.4, option1: 3.3, option2: 3.3, option3: 3.3 },
    {equipment: "Heat Rejection", baseLine: 0, option1: 0, option2: 0, option3: 0 },
    {equipment: "Cooking", baseLine: 1.2, option1: 1.2, option2: 1.2, option3: 1.2},
    {equipment: 'Total', baseLine: 37.7, option1: 28.2, option2: 28.2, option3: 28.2}
];

// const loadData = [
//   {design: 'Baseline', plugLoads:12.5, lighting: 5.8, heating: 8.1, hotWater: 0.8, cooling: 4.3, pumps: 0.6, fans: 4.4, heatRejection: 5, cooking: 1.2 },
//   {design: 'Option 1', plugLoads:12.5, lighting: 3.8, heating: 4.1, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0, cooking: 1.2 },
//   {design: "Option 2", plugLoads:12.5, lighting: 3.8, heating: 4, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0.0, cooking: 1.2 },
//   {design: "Option 3", plugLoads:12.5, lighting: 3.8, heating: 4, hotWater: 0.8, cooling: 1.9, pumps: 0.6, fans: 3.3, heatRejection: 0, cooking: 1.2 }
  
// ];

const choose = ['equipment','baseLine','option1','option2','option3'];
  
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


//i have a feeling that you have to refactor the data to be usable with tables
//because the table code is based on rows, so the each {} object should be refactor based on rows and not by columns

// const dataColumnIntermediate = valueChoose.map(function(c){
//   return loadData.map(function(d,i){
//     return {equipment: legendLabel[i],
//   })
// })



  
const row = tbody.selectAll('tr')
  .data(loadDataTable)
  .enter()
  .append('tr')
  .attr('class', function(d,i){
    if (i === loadDataTable.length-1){
      return 'table-total';
    }
  });

const cell = row.selectAll('td')
  .data(function(row){
    return choose.map(function(column){
      return {column: column, value:row[column]}
    })
  })
  .enter()
  .append('td')

  .text(function(d){ return d.value;});

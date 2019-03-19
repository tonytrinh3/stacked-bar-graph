//WSEC Standard Design LPD (W/sf)
const WSECDesign = [
    {spaceType: "Conference/ Meeting/ Multipurpose", wattSF: 0.98, alt: 0.60 },
    {spaceType: "Convention center - Exhibit space", wattSF: 1.16, alt: 0.60},
    {spaceType: "Corridor/ Transition", wattSF: 0.53, alt: 0.60},
    {spaceType: "Dining area", wattSF: 0.86, alt: 0.60},
    {spaceType: "Electrical/ Mechanical", wattSF: 0.76, alt: 0.60},
    {spaceType: "Food preparation", wattSF: 0.79, alt: 0.60},
    {spaceType: "Lobby", wattSF: 0.60, alt: 0.60},
    {spaceType: "Restrooms", wattSF: 0.78, alt: 0.60},
    {spaceType: "Stairs – Active", wattSF: 0.55, alt: 0.60}
];
//Option 2 Design LPD (W/sf)

const columns = ['Space Type', "WSEC Standard Design \n LPD (W/sf)", "Option 2 Design \n LPD (W/sf)"]
const selector = ['spaceType', 'wattSF', "alt"]

const option2Design = [
    {spaceType: "Conference/ Meeting/ Multipurpose", wattSF: 0.60},
    {spaceType: "Convention center - Exhibit space", wattSF: 0.60},
    {spaceType: "Corridor/ Transition", wattSF: 0.60},
    {spaceType: "Dining area", wattSF: 0.60},
    {spaceType: "Electrical/ Mechanical", wattSF: 0.60},
    {spaceType: "Food preparation", wattSF: 0.60},
    {spaceType: "Lobby", wattSF: 0.60},
    {spaceType: "Restrooms", wattSF: 0.60},
    {spaceType: "Stairs – Active", wattSF: 0.60}
];
//Envelope Washington Code

const envWashingtonCode = [
    {envelope: "Wall", code: "U-0.055 (R-18)"},
    {envelope: "Roof", code: "U-0.027 (R-37)"},
    {envelope: "Window U-Value", code: "U-0.3"},
    {envelope: "Window SHGC", code: "SHGC-0.4"},
    {envelope: "Window to Wall Ratio", code: "30% all sides"},
    {envelope: "Shading Devices", code: "None"}
];
//Envelope Proposed Design

const envProposedDesign = [
    {envelope: "Wall", code: "U-0.053 (R-19)"},
    {envelope: "Roof", code: "U-0.034 (R-30)"},
    {envelope: "Window U-Value", code: "U-0.2"},
    {envelope: "Window SHGC", code: "SHGC-0.26"},
    {envelope: "Window to Wall Ratio", code: "~100% on 3/4 floor \n 75% overall"},
    {envelope: "Shading Devices", code: "Vertical fins on the NW and SW facades \n Mature trees on the NE and SE sides"}
];
//HVAC System	Washington Code

const HVACWashCode = [
    {HVACSystem: "Ventilation System", code: "DOAS"},
    {HVACSystem: "Zone System", code: "Fan Coils"},
    {HVACSystem: "Zone Fan Control", code: "Constant"},
    {HVACSystem: "Heat recovery %", code: "50%"},
    {HVACSystem: "Cooling COP", code: "6.0"},
    {HVACSystem: "Heating COP", code: "0.9"}
];
//HVAC System	Proposed Design

const HVACProposedDesign = [
    {HVACSystem: "Ventilation System", code: "DOAS"},
    {HVACSystem: "Zone System", code: "Radiant"},
    {HVACSystem: "Zone Fan Control", code: "N/A"},
    {HVACSystem: "Heat recovery %", code: "75%"},
    {HVACSystem: "Cooling COP", code: "6.0"},
    {HVACSystem: "Heating COP", code: "0.9"}
];



const table = d3.select(".table").append('table');
const thead = table.append('thead');
const tbody = table.append('tbody');

thead.selectAll('th')
  .data(columns)
  .enter()
  .append('th')
  .attr('class', function(d){ if (d === 'Space Type'){ return "spaceType"}})
  .text(function (d) {return d;})

  /*
//you are now adding all data to all tr
const row = tbody.selectAll('tr')
  .data(WSECDesign)
  .enter()
  .append('tr');

const cells = row.selectAll('td')
  .data( function (row) {
    return selector.map(function (column){
      return {column: column, value: row[column]}
    })
  })
  .enter()
  .append('td')
  .text(function(d) { return d.column})
*/


//you are now adding all data to all tr
table.append('tbody')
  .selectAll('tr')
  .data(WSECDesign)
  .enter()
  .append('tr')
  .selectAll('td')
  .data( function (row) {
    return selector.map(function (column){
      return {column: column, value: row[column]}
    })
  })
  .enter()
  .append('td')
  .attr( 'class', function (d) { if(d.column === "spaceType"){return 'spaceType' }})
  .text(function(d) { return d.value})




//d3.select('.table').append('table').append('tr').selectAll('td').data
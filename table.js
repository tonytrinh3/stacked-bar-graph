//WSEC Standard Design LPD (W/sf)
const WSECDesign = [
    {label: "Conference/ Meeting/ Multipurpose", value: 0.98, alt: 0.60 },
    {label: "Convention center - Exhibit space", value: 1.16, alt: 0.60},
    {label: "Corridor/ Transition", value: 0.53, alt: 0.60},
    {label: "Dining area", value: 0.86, alt: 0.60},
    {label: "Electrical/ Mechanical", value: 0.76, alt: 0.60},
    {label: "Food preparation", value: 0.79, alt: 0.60},
    {label: "Lobby", value: 0.60, alt: 0.60},
    {label: "Restrooms", value: 0.78, alt: 0.60},
    {label: "Stairs - Active", value: 0.55, alt: 0.60}
];


const columns = [['Space Type', "WSEC Standard Design \n LPD (W/sf)", "Option 2 Design \n LPD (W/sf)"],
['Envelope', "Washington Code", "Proposed Design"]]

const selector = ['label', 'value', "alt"]
/*
//Option 2 Design LPD (W/sf)
const option2Design = [
    {spaceType: "Conference/ Meeting/ Multipurpose", value: 0.60},
    {spaceType: "Convention center - Exhibit space", value: 0.60},
    {spaceType: "Corridor/ Transition", value: 0.60},
    {spaceType: "Dining area", value: 0.60},
    {spaceType: "Electrical/ Mechanical", value: 0.60},
    {spaceType: "Food preparation", value: 0.60},
    {spaceType: "Lobby", value: 0.60},
    {spaceType: "Restrooms", value: 0.60},
    {spaceType: "Stairs - Active", value: 0.60}
];
*/

//Envelope Washington value

const envWashingtonvalue = [
    {label: "Wall", value: "U-0.055 (R-18)", alt:"U-0.053 (R-19)" },
    {label: "Roof", value: "U-0.027 (R-37)", alt:"U-0.034 (R-30)" },
    {label: "Window U-Value", value: "U-0.3", alt:"U-0.2" },
    {label: "Window SHGC", value: "SHGC-0.4", alt:"SHGC-0.26" },
    {label: "Window to Wall Ratio", value: "30% all sides", alt:"~100% on 3/4 floor \n 75% overall" },
    {label: "Shading Devices", value: "None", alt:"Vertical fins on the NW and SW facades \n Mature trees on the NE and SE sides" }
];

/*
//Envelope Proposed Design

const envProposedDesign = [
    {envelope: "Wall", value: "U-0.053 (R-19)"},
    {envelope: "Roof", value: "U-0.034 (R-30)"},
    {envelope: "Window U-Value", value: "U-0.2"},
    {envelope: "Window SHGC", value: "SHGC-0.26"},
    {envelope: "Window to Wall Ratio", value: "~100% on 3/4 floor \n 75% overall"},
    {envelope: "Shading Devices", value: "Vertical fins on the NW and SW facades \n Mature trees on the NE and SE sides"}
];
*/

//HVAC System	Washington value

const HVACWashvalue = [
    {label: "Ventilation System", value: "DOAS", alt: "DOAS" },
    {label: "Zone System", value: "Fan Coils", alt: "Radiant" },
    {label: "Zone Fan Control", value: "Constant", alt: "N/A" },
    {label: "Heat recovery %", value: "50%", alt: "75%" },
    {label: "Cooling COP", value: "6.0", alt: "6.0" },
    {label: "Heating COP", value: "0.9", alt: "0.9" }
];

/*
//HVAC System	Proposed Design
const HVACProposedDesign = [
    {HVACSystem: "Ventilation System", value: "DOAS"},
    {HVACSystem: "Zone System", value: "Radiant"},
    {HVACSystem: "Zone Fan Control", value: "N/A"},
    {HVACSystem: "Heat recovery %", value: "75%"},
    {HVACSystem: "Cooling COP", value: "6.0"},
    {HVACSystem: "Heating COP", value: "0.9"}
];

*/

const table = d3.select(".spaceType-table").append('table');
const thead = table.append('thead');
const tbody = table.append('tbody');

thead.selectAll('th')
  .data(columns[0])
  .enter()
  .append('th')
  .attr('class', function(d){ if (d[0]){ return "spaceType"}})
  .text(function (d) {return d;})


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
  .attr( 'class', function (d) { if(d.column === "label"){return 'spaceType' }})
  .text(function(d) { return d.value})


/*
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
*/



//WSEC Standard Design LPD (W/sf)
const WSECDesign = [
    {spaceType: "Conference/ Meeting/ Multipurpose", wattSF: 0.98},
    {spaceType: "Convention center - Exhibit space", wattSF: 1.16},
    {spaceType: "Corridor/ Transition", wattSF: 0.53},
    {spaceType: "Dining area", wattSF: 0.86},
    {spaceType: "Electrical/ Mechanical", wattSF: 0.76},
    {spaceType: "Food preparation", wattSF: 0.79},
    {spaceType: "Lobby", wattSF: 0.60},
    {spaceType: "Restrooms", wattSF: 0.78},
    {spaceType: "Stairs – Active", wattSF: 0.55}
];
//Option 2 Design LPD (W/sf)

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
import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const HeatLoadMall = () => {
  const panelDetails = [
    "Inside Temperature",
    "Equipment Heat Disipetion",
    "Occupancy",
    "Light Load",
    "Area",
    "Height",
    "Sensible Heat",
    "Type of Glass / U-Factor",
    "Wall",
    "Partition / U-Factor",
  ];

  const fieldDetails = [
    { name: "Main_Entrance_Lobby", label: "Main entrance lobby" },
    { name: "Concierge_Information_Desk", label: "Concierge/information desk" },
    {
      name: "Security_Checkpoints",
      label: "Security checkpoints/scanning area",
    },
    {
      name: "Anchor_Stores",
      label: "Anchor stores (e.g., supermarkets or department stores)",
    },
    {
      name: "High_Visibility_Shops",
      label: "High-visibility shops (luxury or premium brands)",
    },
    { name: "Restrooms", label: "Restrooms (male, female, accessible)" },
    { name: "ATM_Zones", label: "ATM zones" },
    { name: "Waiting_Lounges", label: "Waiting lounges" },
    { name: "Main_Atrium", label: "Main atrium" },
    { name: "Walkways_Corridors", label: "Walkways and corridors" },
    { name: "Escalators_Elevators", label: "Escalators and elevators" },
    { name: "Stairs", label: "Stairs" },
    {
      name: "Small_Kiosks_Cafes",
      label: "Small kiosks or cafes near the entrance",
    },
    { name: "Car_Parking_Bays", label: "Car parking bays" },
    { name: "Two_Wheeler_Parking_Bays", label: "Two-wheeler parking bays" },
    { name: "EV_Charging_Stations", label: "EV charging stations" },
    { name: "Entry_Exit_Ramps", label: "Entry/Exit ramps" },
    { name: "HVAC_Plant_Rooms", label: "HVAC plant rooms" },
    { name: "Generator_Rooms", label: "Generator rooms" },
    { name: "Electrical_Substation", label: "Electrical substation" },
    { name: "Water_Treatment_Plant", label: "Water treatment plant (WTP)" },
    { name: "Sewage_Treatment_Plant", label: "Sewage treatment plant (STP)" },
    { name: "Fire_Pump_Rooms", label: "Fire pump rooms" },
    { name: "Storage_Areas", label: "Storage areas" },
    { name: "Staff_Rooms", label: "Staff rooms" },
    { name: "Security_Rooms", label: "Security rooms" },
    { name: "Loading_Unloading_Docks", label: "Loading and unloading docks" },
    { name: "Waste_Management_Areas", label: "Waste management areas" },
    {
      name: "Individual_Retail_Shops",
      label: "Individual retail shops (small to large sizes)",
    },
    { name: "Flagship_Stores", label: "Flagship stores" },
    {
      name: "Cafes_Standalone_Restaurants",
      label: "Cafes or standalone restaurants",
    },
    { name: "Restrooms_On_Each_Floor", label: "Restrooms on each floor" },
    { name: "Drinking_Water_Fountains", label: "Drinking water fountains" },
    { name: "Balconies", label: "Balconies overlooking the atrium" },
    { name: "Food_Stalls_Outlets", label: "Food stalls and outlets" },
    { name: "Communal_Seating_Areas", label: "Communal seating areas" },
    { name: "Fine_Dining", label: "Fine dining" },
    { name: "Arcade_Gaming_Zones", label: "Arcade or gaming zones" },
    { name: "Kids_Play_Area", label: "Kids’ play area" },
    { name: "Bowling_Alleys", label: "Bowling alleys" },
    { name: "Ticket_Counters", label: "Ticket counters" },
    { name: "Cinema_Halls", label: "Multiple cinema halls/screens" },
    { name: "Baby_Care_Rooms", label: "Baby care rooms" },
    { name: "Mall_Management_Offices", label: "Mall management offices" },
    { name: "Leasing_Offices", label: "Leasing offices" },
    { name: "Meeting_Rooms", label: "Meeting rooms" },
    { name: "Security_Offices", label: "Security offices" },
    { name: "CCTV_Monitoring_Rooms", label: "CCTV monitoring rooms" },
    { name: "Staff_Lounges", label: "Staff lounges" },
    { name: "Locker_Rooms", label: "Locker rooms" },
    { name: "Pantry", label: "Pantry" },
    {
      name: "Maintenance_Electrical",
      label: "Maintenance rooms for electrical systems",
    },
    {
      name: "Maintenance_Plumbing",
      label: "Maintenance rooms for Plumbing systems",
    },
    { name: "Maintenance_HVAC", label: "Maintenance rooms for HVAC systems" },
    { name: "Rooftop_Cafes", label: "Rooftop cafes/restaurants" },
    { name: "Open_Terraces", label: "Open terraces or event spaces" },
    { name: "HVAC_Equipment", label: "HVAC equipment" },
    { name: "Solar_Panels", label: "Solar panel installations" },
    { name: "Landscaping", label: "Landscaping" },
    { name: "Seating_Zones", label: "Seating zones" },
    { name: "Diesel_Generator_Room", label: "Diesel Generator Room" },
    { name: "Fuel_Storage_Area", label: "Fuel Storage Area" },
    { name: "Chiller_Plant", label: "Chiller Plant" },
    { name: "Pump_Room", label: "Pump Room" },
    { name: "HVAC_Control_Room", label: "HVAC Control Room" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">HEAT LOAD - Mall</h2>
      {panelDetails.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {fieldDetails.map(({ name, label }) => (
              <RHFTextField
                key={`${section}.${name}`}
                name={`${section.replace(/\s+/g, "_").toLowerCase()}.${name}`}
                label={label}
                rules={{ required: "This field is required" }}
                type="number"
              />
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default HeatLoadMall;

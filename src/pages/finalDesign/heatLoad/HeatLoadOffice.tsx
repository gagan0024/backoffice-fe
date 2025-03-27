import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const HeatLoadOffice = () => {
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
    { name: "Reception_Desk", label: "Reception Desk" },
    { name: "Waiting_Lounge", label: "Waiting Lounge" },
    { name: "Security_Desk_Turnstiles", label: "Security Desk/Turnstiles" },
    { name: "Elevator_Lobby", label: "Elevator Lobby" },
    { name: "Information_Display_Area", label: "Information Display Area" },
    { name: "Small_Meeting_Rooms", label: "Small Meeting Rooms" },
    { name: "Conference_Rooms", label: "Conference Rooms" },
    { name: "Public_Restrooms", label: "Public Restrooms" },
    { name: "Coffee_Shop_Cafeteria", label: "Coffee Shop/Cafeteria" },
    {
      name: "Vending_Machine_Refreshment_Area",
      label: "Vending Machine/Refreshment Area",
    },
    { name: "Electrical_Room", label: "Electrical Room" },
    { name: "Server_IT_Room", label: "Server/IT Room" },
    { name: "Loading_Dock", label: "Loading Dock" },
    { name: "Storage_Room", label: "Storage Room" },
    { name: "Car_Parking_Spaces", label: "Car Parking Spaces" },
    { name: "EV_Charging_Stations", label: "EV Charging Stations" },
    { name: "Bicycle_Parking", label: "Bicycle Parking" },
    { name: "HVAC_Plant_Room", label: "HVAC Plant Room" },
    { name: "Electrical_Substation", label: "Electrical Substation" },
    {
      name: "Water_Tank_and_Plumbing_Rooms",
      label: "Water Tank and Plumbing Rooms",
    },
    { name: "General_Storage", label: "General Storage" },
    { name: "Document_Archive_Rooms", label: "Document Archive Rooms" },
    { name: "Fire_Pump_Room", label: "Fire Pump Room" },
    { name: "Emergency_Exits_Stairwells", label: "Emergency Exits/Stairwells" },
    {
      name: "Large_Dining_Area_with_Multiple_Food_Counters",
      label: "Large Dining Area with Multiple Food Counters",
    },
    { name: "Fitness_Center", label: "Fitness Center" },
    { name: "Yoga_Relaxation_Room", label: "Yoga/Relaxation Room" },
    { name: "Game_Room", label: "Game Room (Table Tennis, Pool Table, etc.)" },
    { name: "Indoor_Seating_Terrace", label: "Indoor Seating Terrace" },
    {
      name: "For_Townhalls_Events_and_Training",
      label: "For Townhalls, Events, and Training",
    },
    { name: "Open_Plan_Workspaces", label: "Open-Plan Workspaces" },
    {
      name: "Private_Offices",
      label: "Private Offices (for executives or managers)",
    },
    { name: "Hot_Desking_Zones", label: "Hot-Desking Zones" },
    { name: "Cubicles", label: "Cubicles (if used)" },
    { name: "Small_Huddle_Rooms", label: "Small Huddle Rooms" },
    { name: "Team_Collaboration_Spaces", label: "Team Collaboration Spaces" },
    { name: "Phone_Booths", label: "Phone Booths (for private calls)" },
    { name: "Print_Copy_Scan_Room", label: "Print/Copy/Scan Room" },
    { name: "File_Storage_Room", label: "File Storage Room" },
    { name: "Pantry_Kitchenette", label: "Pantry/Kitchenette" },
    { name: "Breakout_Lounge", label: "Breakout Lounge" },
    { name: "Restrooms", label: "Restrooms" },
    { name: "Hallways_and_Corridors", label: "Hallways and Corridors" },
    { name: "CEO_Office", label: "CEO Office" },
    { name: "Senior_Management_Offices", label: "Senior Management Offices" },
    { name: "Personal_Assistant_Desks", label: "Personal Assistant Desks" },
    {
      name: "Large_Boardroom_with_Video_Conferencing_Facilities",
      label: "Large Boardroom with Video Conferencing Facilities",
    },
    { name: "VIP_Meeting_Rooms", label: "VIP Meeting Rooms" },
    { name: "Executive_Lounge", label: "Executive Lounge" },
    { name: "Private_Dining_Room", label: "Private Dining Room" },
    { name: "Secure_File_Storage", label: "Secure File Storage" },
    { name: "IT_Support_Room", label: "IT Support Room" },
    {
      name: "Executive_Restrooms",
      label: "Executive Restrooms (luxurious finishes)",
    },
    {
      name: "Pantry_with_Advanced_Facilities",
      label: "Pantry with Advanced Facilities",
    },
    { name: "Solar_Panels", label: "Solar Panels (if applicable)" },
    { name: "HVAC_Equipment", label: "HVAC Equipment" },
    { name: "Rooftop_Garden", label: "Rooftop Garden" },
    {
      name: "Outdoor_Seating_Relaxation_Area",
      label: "Outdoor Seating/Relaxation Area",
    },
    { name: "Rooftop_Event_Area", label: "Rooftop Event Area" },
    { name: "Landscaped_Gardens", label: "Landscaped Gardens" },
    { name: "Surface_Parking_Lot", label: "Surface Parking Lot" },
    { name: "Bicycle_Racks", label: "Bicycle Racks" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">HEAT LOAD - Office</h2>
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

export default HeatLoadOffice;

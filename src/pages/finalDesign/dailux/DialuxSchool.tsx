import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxSchool = () => {
  const rooms = [
    { name: "Main_Entrance", label: "Main Entrance" },
    { name: "Reception_Lobby", label: "Reception / Lobby Area" },
    { name: "Principals_Office", label: "Principal's Office" },
    { name: "Staff_Room", label: "Staff Room" },
    { name: "Classrooms", label: "Classrooms" },
    { name: "Science_Laboratories", label: "Science Laboratories" },
    { name: "Computer_Labs", label: "Computer Labs" },
    { name: "Library", label: "Library" },
    { name: "Toilets", label: "Toilets" },
    { name: "Staircases_Elevators", label: "Staircases and Elevators" },
    { name: "Art_Craft_Room", label: "Art and Craft Room" },
    { name: "Music_Room", label: "Music Room" },
    { name: "Multipurpose_Hall", label: "Multipurpose Hall" },
    { name: "Restrooms", label: "Restrooms" },
    { name: "Retail_Shops", label: "Individual retail shops" },
    { name: "Flagship_Stores", label: "Flagship stores" },
    { name: "Cafes_Restaurants", label: "Cafes or standalone restaurants" },
    { name: "Drinking_Water_Fountains", label: "Drinking water fountains" },
    { name: "Escalators_Elevators", label: "Escalators and elevators" },
    { name: "Walkways_Corridors", label: "Walkways and corridors" },
    { name: "Balconies", label: "Balconies overlooking the atrium" },
    { name: "Food_Stalls_Outlets", label: "Food stalls and outlets" },
    { name: "Communal_Seating_Areas", label: "Communal seating areas" },
    { name: "Fine_Dining", label: "Fine dining" },
    { name: "Arcade_Gaming_Zones", label: "Arcade or gaming zones" },
    { name: "Kids_Play_Area", label: "Kids’ play area" },
    { name: "Bowling_Alleys", label: "Bowling alleys" },
    { name: "Ticket_Counters", label: "Ticket counters" },
    { name: "Cinema_Halls", label: "Multiple cinema halls/screens" },
    { name: "Waiting_Lounges", label: "Waiting lounges" },
    { name: "Washrooms", label: "Washrooms" },
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
    { name: "Diesel_Generator_Room", label: "Diesel Generator Room" },
    { name: "Fuel_Storage_Area", label: "Fuel Storage Area" },
    { name: "Chiller_Plant", label: "Chiller Plant" },
    { name: "Pump_Room", label: "Pump Room" },
    { name: "HVAC_Control_Room", label: "HVAC Control Room" },
  ];

  const sections = [
    "Lux Level",
    "Uniformity",
    "Area",
    "Light Fixture",
    "Mounting Height",
    "Maintenance factor",
    "Reflectance factor",
    "Wall zone",
    "Work plane",
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dailux (School)</h2>
      {sections.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {rooms.map(({ name, label }) => (
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

export default DailuxSchool;

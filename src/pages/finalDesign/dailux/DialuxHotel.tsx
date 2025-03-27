import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxHotel = () => {
  const rooms = [
    { name: "Grand_Entrance_Vestibule", label: "Grand Entrance and Vestibule" },
    { name: "Reception_Desk", label: "Reception Desk/Front Office" },
    { name: "Concierge_Desk", label: "Concierge Desk" },
    { name: "Guest_Waiting_Lounge", label: "Guest Waiting Lounge" },
    { name: "Luggage_Room_Storage", label: "Luggage Room/Storage" },
    { name: "Valet_Parking_Dropoff", label: "Valet Parking Drop-off Area" },
    { name: "All_Day_Dining", label: "All-Day Dining Restaurant" },
    { name: "Coffee_Shop", label: "Coffee Shop" },
    { name: "Lounge_Bar", label: "Lounge Bar" },
    { name: "Retail_Spaces", label: "Retail Spaces" },
    { name: "Pre_Function_Areas", label: "Pre-function Areas" },
    { name: "Grand_Ballroom", label: "Grand Ballroom" },
    { name: "Banquet_Halls", label: "Banquet Halls" },
    { name: "Security_Office", label: "Security Office" },
    { name: "Fire_Control_Room", label: "Fire Control Room" },
    { name: "Multi_Level_Parking", label: "Multi-level Parking" },
    { name: "Valet_Parking_Area", label: "Valet Parking Area" },
    { name: "Loading_Dock", label: "Loading Dock" },
    {
      name: "Maintenance_Engineering_Rooms",
      label: "Maintenance/Engineering Rooms",
    },
    { name: "Waste_Management_Area", label: "Waste Management Area" },
    { name: "Staff_Locker_Rooms", label: "Staff Locker Rooms" },
    {
      name: "Storage_Rooms",
      label: "Storage Rooms (Housekeeping, Pantry, Supplies)",
    },
    { name: "Kitchens", label: "Kitchens (Main, Bakery, Room Service)" },
    { name: "Backup_Generator_Room", label: "Backup Power Generator Room" },
    { name: "Specialty_Restaurants", label: "Specialty Restaurants" },
    { name: "Spa_Wellness_Center", label: "Spa and Wellness Center" },
    { name: "Fitness_Center_Gym", label: "Fitness Center/Gym" },
    { name: "Sauna_Steam_Rooms", label: "Sauna and Steam Rooms" },
    { name: "Yoga_Meditation_Rooms", label: "Yoga and Meditation Rooms" },
    { name: "Beauty_Salon", label: "Beauty Salon" },
    { name: "Game_Room", label: "Game Room" },
    { name: "Cinema_Screening_Room", label: "Cinema/Private Screening Room" },
    { name: "Conference_Rooms", label: "Conference Rooms" },
    { name: "Boardrooms", label: "Boardrooms" },
    { name: "Meeting_Rooms", label: "Meeting Rooms" },
    { name: "Exhibition_Space", label: "Exhibition Space" },
    { name: "Standard_Rooms", label: "Standard Rooms (Single, Double, Twin)" },
    { name: "Deluxe_Rooms", label: "Deluxe Rooms" },
    {
      name: "Accessible_Rooms",
      label: "Accessible Rooms (for differently-abled guests)",
    },
    { name: "Suites", label: "Suites (Junior, Executive, Presidential)" },
    { name: "Penthouse_Suites", label: "Penthouse Suites" },
    { name: "VIP_CheckIn_Lounge", label: "VIP Check-In/Check-Out Lounge" },
    { name: "Private_Club_Lounge", label: "Private Club or Executive Lounge" },
    { name: "Rooftop_Dining_Area", label: "Rooftop or Terrace Dining Area" },
    { name: "Rooftop_Bar_Lounge", label: "Rooftop Bar or Lounge" },
    { name: "Infinity_Pool_Jacuzzi", label: "Infinity Pool/Jacuzzi" },
    { name: "Poolside_Cabanas", label: "Poolside Cabanas" },
    { name: "Helipad", label: "Helipad (if applicable)" },
    { name: "Landscaped_Gardens", label: "Landscaped Gardens" },
    { name: "Terrace_Lounge_Deck", label: "Terrace Lounge/Deck" },
    { name: "Outdoor_Event_Spaces", label: "Outdoor Event Spaces" },
    { name: "Swimming_Pools", label: "Swimming Pools (Indoor and Outdoor)" },
    { name: "Kids_Pool_Play_Area", label: "Kids' Pool/Play Area" },
    { name: "Golf_Course", label: "Golf Course or Mini-Golf Area" },
    { name: "Sports_Courts", label: "Tennis/Basketball Courts" },
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
      <h2 className="text-xl font-bold mb-4">Dailux (Hotel)</h2>
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

export default DailuxHotel;

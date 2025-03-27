import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxResidential = () => {
  const rooms = [
    { name: "Security_Desk/Turnstiles", label: "Security Desk/Turnstiles" },
    { name: "Elevator_Lobby", label: "Elevator Lobby" },
    { name: "Reception_Area", label: "Reception Area" },
    { name: "Car_Parking_Spaces", label: "Car Parking Spaces" },
    { name: "EV_Charging_Stations", label: "EV Charging Stations" },
    { name: "Two-Wheeler_Parking", label: "Two-Wheeler Parking" },
    { name: "Maintenance_Rooms", label: "Maintenance Rooms" },
    { name: "Storage_Rooms", label: "Storage Rooms" },
    { name: "Water_Treatment_Plant", label: "Water Treatment Plant" },
    { name: "Sewage_Treatment_Plant", label: "Sewage Treatment Plantk" },
    { name: "Emergency_Exits/Stairwells", label: "Emergency Exits/Stairwells" },
    { name: "Living_Room", label: "Living Room" },
    { name: "Dining_Area", label: "Dining Area" },
    { name: "Bedrooms", label: "Bedrooms" },
    { name: "Bathrooms", label: "Bathrooms" },
    { name: "Kitchen", label: "Kitchen" },
    { name: "Balcony/Utility_Area", label: "Balcony/Utility Area" },
    {
      name: "Study_Room_or_Office_Space ",
      label: "Study Room or Office Space ",
    },
    { name: "Floor_Corridors", label: "Floor Corridors" },
    { name: "Elevators_and_Staircases", label: "Elevators and Staircases" },
    { name: "Fire_Escape_Routes", label: "Fire Escape Routes" },
    { name: "Landscaped_Gardens", label: "Landscaped Gardens" },
    { name: "Surface_Parking_Lot", label: "Surface Parking Lot" },
    { name: "Bicycle_Racks", label: "Bicycle Racks" },
    { name: "Playground", label: "Playground" },
    { name: "Basketball/Tennis Courts", label: "Basketball/Tennis Courts" },
    { name: "Fountain/Water Bodies", label: "Fountain/Water Bodies" },
    { name: "Open_Amphitheater", label: "Open Amphitheater" },
    { name: "Clubhouse_Lobby", label: "Clubhouse Lobby" },
    { name: "Gymnasium", label: "Gymnasium" },
    { name: "Indoor_Games_Room", label: "Indoor Games Room" },
    { name: "Multipurpose_Hall", label: "Multipurpose Hall" },
    { name: "Swimming_Pool", label: "Swimming Pool" },
    { name: "Yoga_and_Meditation_Room", label: "Yoga and Meditation Room" },
    { name: "Sauna/Steam_Room", label: "Sauna / Steam Room" },
    { name: "Cafeteria/Dining_Area", label: "Cafeteria / Dining Area" },
    { name: "Library/Reading_Room", label: "Library / Reading Room" },
    { name: "Sports_Courts", label: "Sports Courts" },
    { name: "Restrooms/Changing Rooms", label: "Restrooms / Changing Rooms" },
    { name: "Shops/Retail_Outlets", label: "Shops / Retail Outlets" },
    { name: "Cafes/Restaurants", label: "Cafes / Restaurants" },
    { name: "ATM/Banking_Facility", label: "ATM / Banking Facility" },
    { name: "Co-working_Spaces", label: "Co-working Spaces" },
    { name: "Medical_Clinic", label: "Medical Clinic" },
    { name: "Beauty_Salon/Spa", label: "Beauty Salon / Spa" },
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
      <h2 className="text-xl font-bold mb-4">Dailux (Residential)</h2>
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

export default DailuxResidential;

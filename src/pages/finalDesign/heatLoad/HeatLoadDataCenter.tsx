import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const HeatLoadDataCenter = () => {
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
    { name: "Reception_Lobby", label: "Reception Lobby" },
    { name: "Security_Checkpoint", label: "Security Checkpoint" },
    { name: "Visitor_Waiting_Area", label: "Visitor Waiting Area" },
    { name: "ID_Badge_Issuance_Room", label: "ID Badge Issuance Room" },
    { name: "Loading_Dock", label: "Loading Dock" },
    { name: "Delivery_Inspection_Room", label: "Delivery Inspection Room" },
    {
      name: "Storage_Equipment_Spares",
      label: "Storage for Equipment and Spares",
    },
    { name: "UPS_Rooms", label: "Uninterruptible Power Supply (UPS) Rooms" },
    { name: "Battery_Storage_Room", label: "Battery Storage Room" },
    { name: "Staff_Break_Room", label: "Staff Break Room" },
    { name: "Washrooms", label: "Washrooms" },
    { name: "Small_Cafeteria", label: "Small Cafeteria" },
    { name: "Car_Parking_Spaces", label: "Car Parking Spaces" },
    { name: "EV_Charging_Stations", label: "EV Charging Stations" },
    { name: "Two_Wheeler_Parking", label: "Two-Wheeler Parking" },
    { name: "Water_Treatment_Plant", label: "Water Treatment Plant" },
    { name: "Sewage_Treatment_Plant", label: "Sewage Treatment Plant" },
    {
      name: "Storage_Maintenance_Supplies",
      label: "Storage Rooms for Maintenance Supplies",
    },
    { name: "Emergency_Command_Center", label: "Emergency Command Center" },
    {
      name: "Emergency_Equipment_Storage",
      label: "Emergency Equipment Storage",
    },
    { name: "Main_Data_Hall", label: "Main Data Hall" },
    { name: "Secondary_Data_Hall", label: "Secondary/Backup Data Hall" },
    {
      name: "Storage_Spare_Racks_Cables",
      label: "Storage for Spare Racks and Cables",
    },
    {
      name: "Network_Operations_Center",
      label: "Network Operations Center (NOC)",
    },
    {
      name: "Telecom_Equipment_Room",
      label: "Telecommunications Equipment Room",
    },
    { name: "Structured_Cabling_Room", label: "Structured Cabling Room" },
    { name: "MDF_Room", label: "Main Distribution Frame (MDF) Room" },
    { name: "Electrical_Switchgear_Room", label: "Electrical Switchgear Room" },
    { name: "PDU_Area", label: "Power Distribution Units (PDU) Area" },
    {
      name: "Monitoring_Room",
      label: "Monitoring Room (for server and environmental monitoring)",
    },
    { name: "IT_Support_Room", label: "IT Support Room" },
    {
      name: "Staging_Area",
      label: "Staging Area (for pre-installation configuration)",
    },
    { name: "Washrooms_2", label: "Washrooms" },
    { name: "Staff_Break_Room_2", label: "Staff Break Room" },
    { name: "Admin_Offices", label: "Admin Offices" },
    { name: "IT_Engineering_Offices", label: "IT and Engineering Offices" },
    { name: "Meeting_Rooms", label: "Meeting Rooms" },
    { name: "Conference_Room", label: "Conference Room" },
    { name: "Staff_Lounge", label: "Staff Lounge" },
    { name: "Cafeteria_Pantry", label: "Cafeteria or Pantry" },
    {
      name: "Fitness_Room",
      label: "Fitness Room (optional for large facilities)",
    },
    { name: "Training_Room", label: "Training Room" },
    {
      name: "Documentation_Archive_Room",
      label: "Documentation and Archive Room",
    },
    { name: "SOC", label: "Security Operations Center (SOC)" },
    {
      name: "Surveillance_Equipment_Room",
      label: "Surveillance Equipment Room",
    },
    { name: "Rooftop_AHUs", label: "Rooftop Air Handling Units (AHUs)" },
    { name: "Cooling_Towers", label: "Cooling Towers" },
    { name: "Solar_Panel_Arrays", label: "Solar Panel Arrays" },
    { name: "Wind_Turbines", label: "Wind Turbines" },
    {
      name: "Satellite_Dish_Antennae",
      label: "Satellite Dish and Antennae Mounts",
    },
    { name: "Diesel_Generator_Room", label: "Diesel Generator Room" },
    { name: "Fuel_Storage_Area", label: "Fuel Storage Area" },
    { name: "Chiller_Plant", label: "Chiller Plant" },
    { name: "Pump_Room", label: "Pump Room" },
    { name: "HVAC_Control_Room", label: "HVAC Control Room" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">HEAT LOAD - Data Center</h2>
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

export default HeatLoadDataCenter;

import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const VentilationUnderground = () => {
  const panelDetails = [
    "Area",
    "Height",
    "Air Changes per Hour",
    "Number of Fans",
    "Light Load",
    "Equimpment Heat dissipation",
    "Air inlet temp",
    "Inside temp",
    "Equilent no. of air Change",
  ];

  const fieldDetails = [
    { name: "db_room_01", label: "DB Room-01" },
    { name: "db_room_02", label: "DB Room-02" },
    { name: "ups_room_01", label: "UPS Room-01" },
    { name: "ups_room_02", label: "UPS Room-02" },
    { name: "sewage_room", label: "Sewage Room" },
    { name: "seepage_room", label: "Seepage Room" },
    { name: "tvs_plant_room_01", label: "TVS Plant Room-01" },
    { name: "tvs_plant_room_02", label: "TVS Plant Room-02" },
    { name: "ass_room_01", label: "ASS Room-01" },
    { name: "ass_room_02", label: "ASS Room-02" },
    { name: "e_m_store", label: "E&M Store" },
    { name: "e_m_staff", label: "E&M Staff" },
    { name: "cleaners_room", label: "Cleaners Room" },
    { name: "public_toilet", label: "Public Toilet" },
    { name: "emergency_equipment_room", label: "Emergency Equipment Room" },
    { name: "chiller_plant_room", label: "Chiller Plant Room" },
    { name: "pump_room", label: "Pump Room" },
    { name: "dosing_room", label: "Dosing Room" },
    { name: "dg_panel_room", label: "DG Panel Room" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        VENTILATION - UNDERGROUND STATION
      </h2>
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

export default VentilationUnderground;

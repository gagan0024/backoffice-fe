import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const VentilationDepot = () => {
  const panelDetails = [
    "Area",
    "Height",
    "Air Changes per Hour",
    "Number of Fans",
  ];

  const fieldDetails = [
    { name: "pump_room", label: "PUMP ROOM" },
    { name: "ass_room", label: "ASS ROOM" },
    { name: "auto_wash_plant_room", label: "AUTO WASH PLANT ROOM" },
    { name: "etu_room", label: "ETU ROOM" },
    { name: "pit_wheel_lathe_room", label: "PIT WHEEL LATHE ROOM" },
    { name: "scrap_yard", label: "SCRAP YARD" },
    { name: "stabling_yard_area", label: "STABLING YARD AREA" },
    { name: "compressor_room", label: "COMPRESSOR ROOM" },
    { name: "male_toilet_area", label: "MALE TOILET AREA" },
    { name: "female_toilet_area", label: "FEMALE TOILET AREA" },
    { name: "welding_plant_room", label: "WELDING PLANT ROOM" },
    { name: "pit_area", label: "PIT AREA" },
    { name: "toilet", label: "TOILET" },
    { name: "guard_changing_room", label: "GUARD CHANGING ROOM" },
    { name: "loby", label: "LOBY" },
    { name: "waiting_area", label: "WAITING AREA" },
    { name: "guard_room", label: "GUARD ROOM" },
    { name: "scrap_store_01", label: "SCRAP STORE-01" },
    { name: "pantry", label: "PANTRY" },
    { name: "janitor", label: "JANITOR" },
    { name: "kitchen", label: "KITCHEN" },
    { name: "workshop_area", label: "WORKSHOP AREA" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">VENTILATION - DEPOT</h2>
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

export default VentilationDepot;

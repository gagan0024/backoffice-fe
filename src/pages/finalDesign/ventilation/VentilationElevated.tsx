import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const VentilationElevated = () => {
  const panelDetails = [
    "Area",
    "Height",
    "Air Changes per Hour",
    "Number of Fans",
  ];

  const fieldDetails = [
    { name: "ass", label: "ASS" },
    { name: "toilet", label: "Toilet" },
    { name: "pump_room", label: "Pump Room" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">VENTILATION - ELEVATED</h2>
      {panelDetails.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-3 gap-4 mb-4">
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

export default VentilationElevated;

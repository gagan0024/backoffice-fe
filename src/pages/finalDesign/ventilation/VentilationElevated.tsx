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
      {panelDetails.map((panel, panelIndex) => (
        <Box className="flex flex-col gap-4" key={panelIndex}>
          <Box>
            <h2 className="mb-2">{panel}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-1 gap-4 mb-4 grid-flow-col">
            {fieldDetails.map((field, fieldIndex) => {
              return (
                <RHFTextField
                  key={`${panelIndex}-${fieldIndex}`}
                  name={`${panel}.${field.name}`}
                  label={field.label}
                  rules={{
                    required: "This field is required",
                  }}
                />
              );
            })}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default VentilationElevated;

import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DuctSizingUnderground = () => {
  const panelDetails = [
    "Signal Equipment Room",
    "Telecom Equipment Room",
    "UPS S&T",
    "UPS Electrical",
    "Station Control Room",
  ];

  const fieldDetails = [
    { name: "area", label: "Area" },
    { name: "height", label: "Height" },
    { name: "load", label: "Load" },
    { name: "velocity", label: "Velocity" },
    { name: "frictional_factor", label: "Frictional Factor" },
    { name: "flow", label: "Flow" },
    { name: "number_of_grills", label: "Number Of Grills" },
    { name: "room_number", label: "Room Number" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">DUCT SIZING - UNDERGROUND</h2>
      {panelDetails.map((panel, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{panel}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {fieldDetails.map((fieldDetails: any, index: number) => {
              return (
                <>
                  <RHFTextField
                    key={index}
                    name={`${name}.${fieldDetails.name}`}
                    label={fieldDetails.label}
                    rules={{
                      required: "This field is required",
                    }}
                  />
                </>
              );
            })}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default DuctSizingUnderground;

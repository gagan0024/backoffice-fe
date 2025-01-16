import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const CableDepot = () => {
  const panelDetails = [
    "MAIN DISTRIBUTION BOARD (MDB)",
    "ESPP",
    "PAP",
    "VAC",
    "MLP",
    "EMLP",
    "FPP",
    "WPP",
    "DG",
    "DG AMF PANEL",
    "VAC DB",
    "VEF DB",
  ];

  const fieldDetails = [
    { name: "select_bus_bar", label: "Select Bus Bar" },
    { name: "select_equipment", label: "Select Equipment" },
    { name: "cable_type", label: "Cable Type" },
    { name: "cable_length", label: "Cable Length" },
    { name: "no_of_core", label: "No. Of Core" },
    { name: "cable_size", label: "Cable Size" },
    { name: "connected_load", label: "Connected Load" },
    { name: "voltage_drop", label: "Voltage Drop" },
    { name: "breaker_size", label: "Breaker Size" },
    { name: "power_factor", label: "Power Factor" },
    { name: "diversity_factor", label: "Diversity Factor" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">ELECTRICAL PANEL (Depot)</h2>
      {panelDetails.map((panel, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{panel}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-3 gap-4 mb-4 grid-flow-col">
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

export default CableDepot;

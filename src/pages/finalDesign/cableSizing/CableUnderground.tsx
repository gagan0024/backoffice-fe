import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const CableUnderground = () => {
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
      <h2 className="text-xl font-bold mb-4">Cable Sizing (Underground)</h2>
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
              />
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default CableUnderground;

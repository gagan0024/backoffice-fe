import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const ElectricalPanelUnderground = () => {
  const panelTitles = [
    "MAIN LIGHT PANEL (MLP)",
    "EPP",
    "EMLP",
    "AMF",
    "MDB",
    "ACDB",
    "ESCALATOR PANEL",
    "FPP",
    "WPP",
    "GD PANEL",
    "UPS",
    "DG",
  ];

  const fields = [
    { name: "connected_load", label: "Connected Load" },
    { name: "system_voltage", label: "System Voltage" },
    { name: "power_factor", label: "Power Factor" },
    { name: "load_factor", label: "Load Factor" },
    { name: "demand_factor", label: "Demand Factor" },
    { name: "md_load", label: "Md Load" },
    { name: "kvar", label: "Kvar" },
    { name: "full_load_current", label: "Full Load Current" },
    { name: "spare_design", label: "Spare Design" },
    { name: "switchgear_current", label: "Switchgear Current" },
    { name: "breaker_selection", label: "Breaker Selection" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">ELECTRICAL PANEL (Underground)</h2>
      {panelTitles.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-3 gap-4 mb-4 grid-flow-col">
            {fields.map(({ name, label }) => (
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

export default ElectricalPanelUnderground;

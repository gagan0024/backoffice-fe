import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const ElectricalPanelDepot = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">ELECTRICAL PANEL (Depot)</h2>
      {[
        "MAIN LIGHT PANEL (MLP)	",
        "EPP",
        "EMLP",
        "EPP",
        "AMF",
        "MDB",
        "ACDB",
        "ESCALATOR PANEL",
        "FPP",
        "WPP",
        "GD PANEL",
        "UPS",
        "DG",
      ].map((title: string, index: number) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{title}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-3 gap-4 mb-4 grid-flow-col">
            <RHFTextField
              name={`${title}.connected_load`}
              label="Connected Load"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.system_voltage`}
              label="System Voltage"
              rules={{
                required: "This field is required",
              }}
            />

            <RHFTextField
              name={`${title}.power_factor`}
              label="Power Factor"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.load_factor`}
              label="Load Factor"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.demand_factor`}
              label="Demand Factor"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.md_load`}
              label="Md Load"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.kvar`}
              label="Kvar"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.full_load_current`}
              label="Full Load Current"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.spare_design`}
              label="Spare Design"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.switchgear_current`}
              label="Switchgear Current"
              rules={{
                required: "This field is required",
              }}
            />
            <RHFTextField
              name={`${title}.breaker_selection`}
              label="Breaker Selection"
              rules={{
                required: "This field is required",
              }}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ElectricalPanelDepot;

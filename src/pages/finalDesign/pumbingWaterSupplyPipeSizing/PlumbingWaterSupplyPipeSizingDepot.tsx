import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingWaterSupplyPipeSizingDepot = () => {
  const panelDetails = [
    "ADMIN MALE TOILET",
    "ADMIN FEMALE TOILET",
    "ADMIN HANDICAP TOILET",
    "GUARD ROOM TOILET",
  ];

  const panelDetails2 = ["ADMIN KITCHEN", "WORKSHOP", "AUTO COACH"];

  const fieldDetails = [
    { name: "velocity", label: "Velocity" },
    { name: "number_of_wc", label: "Number of WC" },
    { name: "number_of_wb", label: "Number of WB" },
    { name: "number_of_urinal", label: "Number of Urinal" },
    { name: "number_of_shower", label: "Number of Shower" },
    { name: "number_of_tap", label: "Number of Tap" },
    { name: "operational_hour", label: "Operational Hour" },
    { name: "diversity", label: "Diversity" },
  ];

  const fieldDetails2 = [
    { name: "velocity", label: "Velocity" },
    { name: "water_quantity", label: "Water Quantity" },
    { name: "number_of_tap", label: "Number of Tap" },
    { name: "operational_hour", label: "Operational Hour" },
    { name: "diversity", label: "Diversity" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        WATER SUPPLY PIPE SIZING (DEPOT)
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
              />
            ))}
          </Box>
        </Box>
      ))}

      {panelDetails2.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {fieldDetails2.map(({ name, label }) => (
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

export default PlumbingWaterSupplyPipeSizingDepot;

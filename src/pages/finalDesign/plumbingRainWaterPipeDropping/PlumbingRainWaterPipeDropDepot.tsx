import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingRainWaterPipeDropDepot = () => {
  const panelDetails = [
    "ADMIN BUILDING",
    "WORKSHOP",
    "PUMP ROOM",
    "ASS ROOM",
    "AUTO WASH PLANT",
    "COMPRESSOR ROOM",
    "ETU",
    "PIT WHEEL LATHE",
    "STORE",
    "TIME OFFICE",
    "STABLING YARD",
    "WELDING PLANT",
    "WHOLE SITE"
  ];

  const fieldDetails = [
    { name: "catchment_area", label: "Catchment Area" },
    { name: "pipe_size", label: "Pipe Size" },
    { name: "rainfall_intensity", label: "Rain Fall Intensity" },
    { name: "number_of_droppings", label: "Number of Droppings" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        RAIN WATER PIPE DROPPING - DEPOT
      </h2>
      {panelDetails.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {fieldDetails?.map(({ name, label }) => (
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

export default PlumbingRainWaterPipeDropDepot;

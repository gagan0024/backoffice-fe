import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const SeepagePumpSizingUnderground = () => {
  const panelDetails = ["Seepage Sump sizing calculations"];

  const fieldDetails = [
    { name: "retaining_wall_area", label: "Retaining Wall Area" },
    {
      name: "seepage_generation_rate_peak_season",
      label: "Seepage Generation Rate at Peak Season",
    },
    { name: "station_cleaning_area", label: "Station Cleaning Area" },
    { name: "number_of_hydrants", label: "Number of Hydrants" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">
        SEEPAGE PUMP SIZING - UNDERFROUND
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

export default SeepagePumpSizingUnderground;

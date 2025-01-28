import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingRWHDepot = () => {
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
    "WHOLE SITE",
  ];

  const fieldDetails = [
    { name: "roof_area_coefficient", label: "Roof Area Coefficient" },
    { name: "green_area_coefficient", label: "Green Area Coefficient" },
    { name: "footpath_area_coefficient", label: "Footpath Area Coefficient" },
    { name: "roof_area", label: "Roof Area" },
    { name: "green_area", label: "Green Area" },
    { name: "footpath_area", label: "Footpath Area" },
    { name: "storage_time", label: "Storage Time" },
    { name: "number_of_harvesting_pits", label: "Number of Harvesting Pits" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">RWH CALCULATION - DEPOT</h2>
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

export default PlumbingRWHDepot;

import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingWaterDemandUnderground = () => {
  const panelDetails = ["UNDERGROUND STATION"];

  const fieldDetails = [
    { name: "number_of_staff", label: "Number of Staff" },
    { name: "number_of_visitors", label: "Number of Visitors" },
    { name: "diversity", label: "Diversity" },
    { name: "station_area_cleaning", label: "Station Area for Cleaning" },
    { name: "area_gardening", label: "Area for Gardening" },
    { name: "pd_area", label: "PD Area" },
    { name: "water_demand_staff", label: "Water Demand Staff" },
    { name: "water_demand_visitor", label: "Water Demand Visitor" },
    {
      name: "water_demand_station_cleaning",
      label: "Water Demand Station Cleaning",
    },
    { name: "water_demand_gardening", label: "Water Demand Gardening" },
    { name: "makeup_water_requirement", label: "Make-Up Water Requirement" },
    { name: "operation_hours", label: "Operation Hours" },
    {
      name: "filter_cleaning_water_requirement",
      label: "Filter Cleaning Water Requirement",
    },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">WATER DEMAND (UNDERGROUND)</h2>
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

export default PlumbingWaterDemandUnderground;

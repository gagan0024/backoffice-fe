import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingWaterDemandDepot = () => {
  const panelDetails1 = ["ADMIN"];
  const panelDetails2 = ["AUTO COACH"];
  const panelDetails3 = ["GUARD ROOM"];

  const fieldDetails = [
    { name: "number_of_staff", label: "Number of Staff" },
    { name: "number_of_visitors", label: "Number of Visitors" },
    { name: "water_demand_staff", label: "Water Demand Staff" },
    { name: "water_demand_visitor", label: "Water Demand Visitor" },
    { name: "water_demand_kitchen", label: "Water Demand Kitchen" },
    {
      name: "water_demand_station_cleaning",
      label: "Water Demand Station Cleaning",
    },
    { name: "water_demand_gardening", label: "Water Demand Gardening" },
    { name: "diversity", label: "Diversity" },
    { name: "total_floor_area", label: "Total Floor Area" },
    { name: "makeup_water", label: "Make-Up Water" },
    { name: "filter_cleaning_water", label: "Filter Cleaning Water" },
  ];

  const fieldDetails_2 = [
    { name: "train_washing", label: "Train Washing" },
    { name: "number_of_trains", label: "Number of Trains" },
    { name: "operational_hour", label: "Operational Hour" },
    { name: "diversity", label: "Diversity" },
    { name: "total_floor_area", label: "Total Floor Area" },
    { name: "makeup_water", label: "Make-Up Water" },
    { name: "filter_cleaning_water", label: "Filter Cleaning Water" },
  ];

  const fieldDetails_3 = [
    { name: "number_of_staff", label: "Number of Staff" },
    { name: "number_of_visitors", label: "Number of Visitors" },
    { name: "water_demand_staff", label: "Water Demand Staff" },
    { name: "water_demand_visitor", label: "Water Demand Visitor" },
    { name: "water_demand_kitchen", label: "Water Demand Kitchen" },
    { name: "operational_hour", label: "Operational Hour" },
    { name: "diversity", label: "Diversity" },
    { name: "total_floor_area", label: "Total Floor Area" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">WATER DEMAND (DEPOT)</h2>
      {panelDetails1.map((section, index) => (
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
            {fieldDetails_2.map(({ name, label }) => (
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

      {panelDetails3.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-cols-4 gap-4 mb-4">
            {fieldDetails_3.map(({ name, label }) => (
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

export default PlumbingWaterDemandDepot;

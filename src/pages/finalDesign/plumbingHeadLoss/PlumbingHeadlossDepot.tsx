import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const PlumbingHeadlossDepot = () => {
  const panelDetails = [
    "15 MM DIA GI PIPE",
    "20 MM DIA GI PIPE",
    "25 MM DIA GI PIPE",
    "32 MM DIA GI PIPE",
    "40 MM DIA GI PIPE",
    "50 MM DIA GI PIPE",
    "65 MM DIA GI PIPE",
    "80 MM DIA GI PIPE",
    "100 MM DIA GI PIPE",
    "150 MM DIA GI PIPE",
  ];

  const fieldDetails = [
    { name: "flow_rate", label: "Flow Rate Q" },
    { name: "horizontal_length", label: "Horizontal Length" },
    { name: "vertical_length", label: "Vertical Length" },
    { name: "elbow_45", label: "Screwed Elbow 45°" },
    { name: "elbow_90", label: "Screwed Elbow 90°" },
    { name: "tee_90", label: "Screwed Tee 90°" },
    { name: "gate_valve", label: "Gate Valve" },
    { name: "globe_valve", label: "Globe Valve" },
    { name: "angle_valve", label: "Angle Valve" },
    { name: "butterfly_valve", label: "Butterfly Valve" },
    { name: "non_return_valve", label: "Non Return Valve" },
  ];
  return (
    <>
      <h2 className="text-xl font-bold mb-4">PLUMBING HEADLOSS (DEPOT)</h2>
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

export default PlumbingHeadlossDepot;

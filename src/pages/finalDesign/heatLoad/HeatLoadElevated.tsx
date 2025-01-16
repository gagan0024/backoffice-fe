import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const HeatLoadElevated = () => {

  const panelDetails = [
    "Inside Temperature",
    "Equipment Heat Disipetion",
    "Occupancy",
    "Light Load",
    "Area",
    "Height",
    "Sensible Heat",
    "Type of Glass / U-Factor",
    "Wall",
    "Partition / U-Factor",
  ];

  const fieldDetails = [
    { name: "signal_equipment_room", label: "Signal Equipment Room" },
    { name: "telecom_equipment_room", label: "Telecom Equipment Room" },
    { name: "ups_snt", label: "UPS S&T" },
    { name: "ups_electrical", label: "UPS Electrical" },
    { name: "station_control_room", label: "Station Control Room" },
    { name: "ticket_office_manager", label: "Ticket Office Manager" },
    { name: "efo", label: "EFO" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">HEAT LOAD - ELEVATED</h2>
      {panelDetails.map((panel, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{panel}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-3 gap-4 mb-4 grid-flow-col">
            {fieldDetails.map((fieldDetails: any, index: number) => {
              return (
                <>
                  <RHFTextField
                    key={index}
                    name={`${name}.${fieldDetails.name}`}
                    label={fieldDetails.label}
                    rules={{
                      required: "This field is required",
                    }}
                  />
                </>
              );
            })}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default HeatLoadElevated;

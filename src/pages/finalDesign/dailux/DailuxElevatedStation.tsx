import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxElevated = () => {
  const roomDetails = [
    { name: "pump_room", label: "Pump Room" },
    { name: "dg_room", label: "DG Room" },
    { name: "scr_room", label: "SCR Room" },
    { name: "tom_room", label: "TOM Room" },
    { name: "telecom_equipment_room", label: "Telecom Equipment Room" },
    { name: "ups_room", label: "UPS Room" },
    { name: "signaling_equipment_room", label: "Signaling Equipment Room" },
    { name: "ass_room", label: "Ass Room" },
    { name: "odu_room_space", label: "Odu Room/space" },
    { name: "loading_unloading_deck", label: "Loading/unloading Deck" },
    { name: "boh_corridor", label: "Boh Corridor" },
    { name: "esc_panel_space", label: "Esc Panel Space" },
    { name: "male_toilet_area", label: "Male Toilet Area" },
    { name: "female_toilet_area", label: "Female Toilet Area" },
    { name: "accessible_toilet_area", label: "Accessible Toilet Area" },
    { name: "f_changing_room", label: "F. Changing Room" },
    { name: "m_changing_room", label: "M. Changing Room" },
    { name: "mess_room", label: "Mess Room" },
    { name: "spare_room", label: "Spare Room" },
    { name: "security_room", label: "Security Room" },
    { name: "paid_area", label: "Paid Area" },
    { name: "unpaid_area", label: "Unpaid Area" },
    { name: "entry_exit_corridor", label: "Entry Exit Corridor" },
    { name: "external_area", label: "External Area" },
    { name: "platform_area", label: "Platform Area" },
  ];

  const sections = [
    "Lux Level",
    "Uniformity",
    "Area",
    "Light Fixture",
    "Mounting Height",
    "Maintenance factor",
    "Reflectance factor",
    "Wall zone",
    "Work plane",
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dailux (Elevated Station)</h2>
      {sections.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-5 gap-4 mb-4 grid-flow-col">
            {roomDetails.map(({ name, label }) => (
              <RHFTextField
                key={`${section}.${name}`}
                name={`${section.replace(/\s+/g, "_").toLowerCase()}.${name}`}
                label={label}
                // rules={{ required: "This field is required" }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default DailuxElevated;

import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxUnderground = () => {
  const rooms = [
    { name: "Pump_Room", label: "Pump Room" },
    { name: "Dg_Room", label: "Dg Room" },
    { name: "Scr_Room", label: "Scr Room" },
    { name: "Tom_Room", label: "Tom Room" },
    { name: "Telecom_Equipment_Room", label: "Telecom Equipment Room" },
    { name: "Ups_Room", label: "Ups Room" },
    { name: "Signaling_Equipment_Room", label: "Signaling Equipment Room" },
    { name: "Ass_Room", label: "Ass Room" },
    { name: "Odu_Room_Space", label: "Odu Room/space" },
    { name: "Loading_Unloading_Deck", label: "Loading/unloading Deck" },
    { name: "Boh_Corridor", label: "Boh Corridor" },
    { name: "Esc_Panel_Space", label: "Esc Panel Space" },
    { name: "Male_Toilet_Area", label: "Male Toilet Area" },
    { name: "Female_Toilet_Area", label: "Female Toilet Area" },
    { name: "Accessible_Toilet_Area", label: "Accessible Toilet Area" },
    { name: "F_Changing_Room", label: "F. Changing Room" },
    { name: "M_Changing_Room", label: "M. Changing Room" },
    { name: "Mess_Room", label: "Mess Room" },
    { name: "Spare_Room", label: "Spare Room" },
    { name: "Security_Room", label: "Security Room" },
    { name: "Paid_Area", label: "Paid  Area" },
    { name: "Unpaid_Area", label: "Unpaid  Area" },
    { name: "Entry_Exit_Corridor", label: "Entry Exit Corridor" },
    { name: "External_Area", label: "External Area" },
    { name: "Ahu_Room", label: "Ahu Room" },
    { name: "Tvs_Fan_Room", label: "Tvs Fan Room" },
    { name: "Gsm_Room", label: "Gsm Room" },
    { name: "Chiller_Plant_Room", label: "Chiller Plant Room" },
    { name: "Undercroft_Area", label: "Undercroft Area" },
    { name: "Platform_Area", label: "Platform Area" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dailux (Underground Station)</h2>
      {[
        "Lux Level",
        "Uniformity",
        "Area",
        "Light Fixture",
        "Mounting Height",
        "Maintenance factor",
        "Reflectance factor",
        "Wall zone",
        "Work plane	",
      ].map((title: string, index: number) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{title}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-5 gap-4 mb-4 grid-flow-col">
            {rooms.map((room: any, index: number) => {
              return (
                <>
                  <RHFTextField
                    key={index}
                    name={`${title}.${room.name}`}
                    label={room.label}
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

export default DailuxUnderground;

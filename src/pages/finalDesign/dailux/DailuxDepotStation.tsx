import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DailuxDepot = () => {
  const rooms = [
    { name: "Engineering_Practice", label: "Engineering Practice" },
    { name: "Simulator", label: "Simulator" },
    { name: "Ser_Dcc", label: "Ser(Dcc)" },
    { name: "Ter_Dcc", label: "Ter(Dcc)" },
    { name: "Meeting_Room", label: "Meeting Room" },
    { name: "Electrical_Room", label: "Electrical Room" },
    { name: "Ups_Room", label: "Ups Room" },
    { name: "Canteen", label: "Canteen" },
    { name: "Store", label: "Store" },
    { name: "Kitchen", label: "Kitchen" },
    { name: "Toilet", label: "Toilet" },
    { name: "Janitor", label: "Janitor" },
    { name: "It_Contractor", label: "It Contractor" },
    { name: "Corridor", label: "Corridor" },
    { name: "Afc_Sdc_Lab", label: "Afc Sdc Lab" },
    { name: "Psd_Lab", label: "Psd Lab" },
    { name: "Scada_Lab", label: "Scada Lab" },
    { name: "Telecom_Lab", label: "Telecom Lab" },
    { name: "Afc_Central_Workstation", label: "Afc Central Workstation" },
    { name: "Afc_Central_Server_Room", label: "Afc Central Server Room" },
    {
      name: "Anti_Fraud_Revenue_Store_Room",
      label: "Anti Fraud Revenue Store Room",
    },
    { name: "It_Server_Room", label: "It Server Room" },
    { name: "Afc_Master_Cc_Room", label: "Afc Master Cc Room" },
    { name: "Enm_Scada", label: "Enm Scada" },
    { name: "Smr", label: "Smr" },
    { name: "Snt_Store", label: "Snt Store" },
    { name: "Computer_Training_Room", label: "Computer Training Romm" },
    { name: "Cer_Telecom", label: "Cer Telecom" },
    { name: "Cer_Signalling", label: "Cer Signalling" },
    { name: "Scada_Equipment_Room", label: "Scada Equipment Room" },
    { name: "Onm_Operator", label: "Onm Operator" },
    { name: "Css_Nms", label: "Css Nms" },
    { name: "Bms_Panel_Room", label: "Bms Panel Room" },
    { name: "Signalling_Lab", label: "Signalling Lab" },
    { name: "Office", label: "Office" },
    { name: "Security_Control_Room", label: "Security Control Room" },
    { name: "Dcc_Room", label: "Dcc Room" },
    { name: "Lobby", label: "Lobby" },
    { name: "Spare_Room", label: "Spare Room" },
    { name: "Maintenance_Room", label: "Maintenance Room" },
    { name: "Conference_Room", label: "Conference Room" },
    { name: "Library", label: "Library" },
    { name: "Vr_Bim_Lab", label: "Vr Bim Lab" },
    { name: "Lecture_Hall", label: "Lecture Hall" },
    { name: "Training_Coordinator_Staff", label: "Training Coordinator Staff" },
    { name: "Pump_Room", label: "Pump Room" },
    { name: "Ass_Room", label: "Ass Room" },
    { name: "Auto_Wash_Plant_Room", label: "Auto Wash Plant Room" },
    { name: "Etu_Room", label: "Etu Room" },
    { name: "Pit_Wheel_Lathe_Room", label: "Pit Wheel Lathe Room" },
    { name: "Scrap_Yard", label: "Scrap Yard" },
    { name: "Stabling_Yard_Area", label: "Stabling Yard Area" },
    { name: "Compressor_Room", label: "Compressor Room" },
    { name: "Welding_Plant_Room", label: "Welding Plant Room" },
    { name: "Pit_Area", label: "Pit Area" },
    { name: "Guard_Changing_Room", label: "Guard Changing Room" },
    { name: "Loby", label: "Loby" },
    { name: "Waiting_Area", label: "Waiting Area" },
    { name: "Guard_Room", label: "Guard Room" },
    { name: "Scrap_Store_01", label: "Scrap Store-01" },
    { name: "Scrap_Store_02", label: "Scrap Store-02" },
    { name: "Scrap_Store_03", label: "Scrap Store-03" },
    { name: "Store_For_Batteries", label: "Store For Batteries" },
    { name: "Store_For_Oil", label: "Store For Oil" },
    {
      name: "Heavy_Equipment_Storage_Area",
      label: "Heavy Equipment StorageArea",
    },
    { name: "Cable_Storage_Area", label: "Cable Storage Area" },
    { name: "Store_Manager_Room", label: "Store Manager Room" },
    { name: "Pantry", label: "Pantry" },
    { name: "Managers_Office", label: "Managers Office" },
    { name: "Visitors_Room", label: "Visitors Room" },
    { name: "Inspection_Reception_Area", label: "Inspection Reception Area" },
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
      <h2 className="text-xl font-bold mb-4">Dailux (Depot)</h2>
      {sections.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-12 gap-4 mb-4 grid-flow-col">
            {rooms.map(({ name, label }) => (
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

export default DailuxDepot;

import { Box, Divider } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const HeatLoadDepot = () => {
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
    { name: "simulator", label: "Simulator" },
    { name: "ser_dcc", label: "Ser(Dcc)" },
    { name: "ter_dcc", label: "Ter(Dcc)" },
    { name: "meeting_room", label: "Meeting Room" },
    { name: "electrical_room", label: "Electrical Room" },
    { name: "ups_room", label: "Ups Room" },
    { name: "canteen", label: "Canteen" },
    { name: "store", label: "Store" },
    { name: "kitchen", label: "Kitchen" },
    { name: "electrical_room", label: "Electrical Room" },
    { name: "toilet", label: "Toilet" },
    { name: "janitor", label: "Janitor" },
    { name: "it_contractor", label: "It Contractor" },
    { name: "corridor", label: "Corridor" },
    { name: "afc_sdc_lab", label: "Afc Sdc Lab" },
    { name: "psd_lab", label: "Psd Lab" },
    { name: "scada_lab", label: "Scada Lab" },
    { name: "telecom_lab", label: "Telecom Lab" },
    { name: "afc_central_workstation", label: "Afc Central Workstation" },
    { name: "afc_central_server_room", label: "Afc Central Server Room" },
    {
      name: "anti_fraud_revenue_store_room",
      label: "Anti Fraud Revenue Store Room",
    },
    { name: "it_server_room", label: "It Server Room" },
    { name: "afc_master_cc_room", label: "Afc Master Cc Room" },
    { name: "enm_scada", label: "Enm Scada" },
    { name: "smr", label: "Smr" },
    { name: "snt_store", label: "Snt Store" },
    { name: "computer_training_room", label: "Computer Training Room" },
    { name: "cer_telecom", label: "Cer Telecom" },
    { name: "cer_signalling", label: "Cer Signalling" },
    { name: "scada_equipment_room", label: "Scada Equipment Room" },
    { name: "onm_operator", label: "Onm Operator" },
    { name: "css_nms", label: "Css Nms" },
    { name: "bms_panel_room", label: "Bms Panel Room" },
    { name: "signalling_lab", label: "Signalling Lab" },
    { name: "office", label: "Office" },
    { name: "security_control_room", label: "Security Control Room" },
    { name: "dcc_room", label: "Dcc Room" },
    { name: "meeting_room", label: "Meeting Room" },
    { name: "lobby", label: "Lobby" },
    { name: "spare_room", label: "Spare Room" },
    { name: "maintenance_room", label: "Maintenance Room" },
    { name: "conference_room", label: "Conference Room" },
    { name: "library", label: "Library" },
    { name: "vr_bim_lab", label: "Vr Bim Lab" },
    { name: "lecture_hall", label: "Lecture Hall" },
    { name: "training_coordinator_staff", label: "Training Coordinator Staff" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold mb-4">HEAT LOAD - DEPOT</h2>
      {panelDetails.map((section, index) => (
        <Box className="flex flex-col gap-4" key={index}>
          <Box>
            <h2 className="mb-2">{section}</h2>
            <Divider />
          </Box>
          <Box className="grid grid-rows-12 gap-4 mb-4 grid-flow-col">
            {fieldDetails.map(({ name, label }) => (
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

export default HeatLoadDepot;

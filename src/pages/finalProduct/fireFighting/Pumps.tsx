import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const Pumps = () => {
  return (
    <>
      <FormControl className="w-1/4">
        <RHFTextField
          name="model_number"
          label="Model Number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="hp"
          label="HP"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="flow_rate"
          label="Flow Rate"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="pressure_rating"
          label="Pressure Rating"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="pump_head"
          label="Pump Head"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="efficiency"
          label="Efficiency"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="npsh"
          label="NPSH (Net Positive Suction Head)"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="compliance_with_standards"
          label="Compliance with Standards"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default Pumps;

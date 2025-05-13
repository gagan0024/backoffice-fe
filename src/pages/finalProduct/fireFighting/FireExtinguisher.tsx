import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const FireExtinguisher = () => {
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
          name="extinguisher_type"
          label="Extinguisher Type"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="size_and_capacity"
          label="Size and Capacity"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="discharge_time_and_range"
          label="Discharge Time and Range"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="rechargeability"
          label="Rechargeability"
          type="number"
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

export default FireExtinguisher;

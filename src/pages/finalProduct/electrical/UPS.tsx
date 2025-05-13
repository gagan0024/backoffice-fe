import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const UPS = () => {
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
          name="voltage_rating"
          label="Voltage Rating (V)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="power_capacity"
          label="Power Capacity (kVA or kW)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="battery_type_and_runtime"
          label="Battery Type and Runtime"
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
          name="form_factor"
          label="Form Factor"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="transfer_time"
          label="Transfer Time"
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

export default UPS;

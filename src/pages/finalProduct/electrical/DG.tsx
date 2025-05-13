import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const DG = () => {
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
          name="power_output"
          label="Power Output (kVA or kW)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="fuel_type"
          label="Fuel Type"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="voltage_regulation"
          label="Voltage Regulation"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="fuel_consumption_rate"
          label="Fuel Consumption Rate"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="noise_level"
          label="Noise Level (db)"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="operating_hours_and_runtime"
          label="Operating Hours and Runtime"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="emissions_standards"
          label="Emissions Standards"
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

export default DG;

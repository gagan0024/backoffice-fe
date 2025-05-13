import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const ODU = () => {
  return (
    <>
      <FormControl className="w-1/4">
        <RHFTextField
          name="model_number"
          label="Model Number"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="cooling_heating_capacity"
          label="Cooling/Heating Capacity"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="compressor_type"
          label="Compressor Type"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="energy_efficiency"
          label="Energy Efficiency"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="size_and_space_availability"
          label="Size and Space Availability"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="noise_levels"
          label="Noise Levels"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="refrigerant_type"
          label="Refrigerant Type"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="outdoor_air_conditions"
          label="Outdoor Air Conditions"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="reliability_and_durability"
          label="Reliability and Durability"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="anti_corrosion_protection"
          label="Anti-Corrosion Protection"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="control_system_integration"
          label="Control System Integration"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default ODU;

import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const Chiller = () => {
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
          name="cooling_capacity"
          label="Cooling Capacity"
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
          name="type_of_chiller"
          label="Type of Chiller"
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
          name="heat_exchanger_type"
          label="Heat Exchanger Type"
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
          name="control_systems"
          label="Control Systems"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="ambient_temperature_range"
          label="Ambient Temperature Range"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="size_and_footprint"
          label="Size and Footprint"
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
          name="maintenance_and_serviceability"
          label="Maintenance and Serviceability"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="environmental_impact"
          label="Environmental Impact"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default Chiller;

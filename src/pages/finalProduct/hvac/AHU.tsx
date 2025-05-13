import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const AHU = () => {
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
          name="airflow"
          label="Airflow"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="cooling_and_heating_capacity"
          label="Cooling and Heating Capacity"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="air_filtration"
          label="Air Filtration"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="fan_type_and_efficiency"
          label="Fan Type and Efficiency"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="external_static_pressure"
          label="External Static Pressure"
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
          name="energy_efficiency"
          label="Energy Efficiency"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="temperature_and_humidity_control"
          label="Temperature and Humidity Control"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="size_and_physical_dimensions"
          label="Size and Physical Dimensions"
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
          name="environmental_conditions"
          label="Environmental Conditions"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="reliability_and_redundancy"
          label="Reliability and Redundancy"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="maintenance_requirements"
          label="Maintenance Requirements"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="compliance_with_regulations_and_standards"
          label="Compliance with Regulations and Standards"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default AHU;

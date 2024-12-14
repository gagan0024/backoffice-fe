import { Box, Button, Divider, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import { useState } from "react";

const FinalDesign = () => {
  const methods = useForm();
  const [showfullForm, setShowFullForm] = useState<boolean>(false);
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const handleChangeRoomValues = (value: any) => {
    console.log(value, "hello");
    setShowFullForm(true);
  };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Design Form</h2>
      </Box>
      <FormProvider {...methods}>
        <form
          className="h-[70vh] overflow-y-scroll py-2"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box className="flex gap-4 mb-4 flex-wrap">
            <FormControl className="w-1/4">
              <RHFAutocomplete
                name="service"
                options={["Option 1", "Option 2", "Option 3"]}
                label="Service"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            <FormControl className="w-1/4">
              <RHFAutocomplete
                name="building"
                options={["Option 1", "Option 2", "Option 3"]}
                label="Building"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            <FormControl className="w-1/4">
              <RHFAutocomplete
                name="sub_building"
                options={["Option 1", "Option 2", "Option 3"]}
                label="Sub Building"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            <FormControl className="w-1/4">
              <RHFAutocomplete
                name="levels"
                options={["Option 1", "Option 2", "Option 3"]}
                label="levels"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            <FormControl className="w-1/4">
              <RHFAutocomplete
                name="rooms"
                options={["Option 1", "Option 2", "Option 3"]}
                label="Rooms"
                rules={{ required: "This field is required" }}
                onChange={(value: any) => handleChangeRoomValues(value)}
              />
            </FormControl>
          </Box>
          {showfullForm ? (
            <>
              <Box className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">VRV SYSTEM</h2>
                <Box className="flex flex-col gap-4">
                  <Box>
                    <h2 className="mb-2">Outside Temprature</h2>
                    <Divider />
                  </Box>
                  <Box className="flex gap-4 mb-4">
                    <RHFTextField
                      name="summer"
                      label="Summer"
                      type="number"
                      rules={{
                        required: "This field is required",
                        max: {
                          value: 9999999,
                          message: "You can enter 7 digit maxium ",
                        },
                      }}
                    />
                    <RHFTextField
                      name="monsoon"
                      label="Monsoon"
                      rules={{
                        required: "This field is required",
                        max: {
                          value: 9999999,
                          message: "You can enter 7 digit maxium ",
                        },
                      }}
                      type="number"
                    />
                    <RHFTextField
                      name="winter"
                      label="Winter"
                      rules={{
                        required: "This field is required",
                        max: {
                          value: 9999999,
                          message: "You can enter 7 digit maxium ",
                        },
                      }}
                      type="number"
                    />
                  </Box>
                </Box>

                {[
                  "Inside Temprature",
                  "Equipment Heat Disipetion",
                  "Occupancy",
                  "Light Load",
                  "Area",
                  "Height",
                  "Sensible Heat",
                  "Type of Glass/U-Factor",
                  "Wall",
                  "Partition/U-Factor",
                ].map((title: string, index: number) => (
                  <Box className="flex flex-col gap-4" key={index}>
                    <Box>
                      <h2 className="mb-2">{title}</h2>
                      <Divider />
                    </Box>
                    <Box className="grid grid-rows-2 gap-4 mb-4 grid-flow-col">
                      <RHFTextField
                        name={`${title}.isignal-equipment-room`}
                        label="Signal Equipment Room"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.telecom-equipment-room`}
                        label="Telecom Equipment Room"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />

                      <RHFTextField
                        name={`${title}.UPS-S&T`}
                        label="UPS S&T"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.UPS-electrical`}
                        label="UPS Electrical"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.station-control-room`}
                        label="Station Control Room"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.ticket-office-manager`}
                        label="Ticket Office Manager"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.EFO`}
                        label="EFO"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box>
                <h2 className="text-xl font-bold mb-4">VENTILATION</h2>
                {[
                  "Ventilation Area",
                  "Ventilation Height",
                  "Air Changes per Hour",
                  "Number of Fans",
                ].map((title: string, index: number) => (
                  <Box className="flex flex-col gap-4" key={index}>
                    <Box>
                      <h2 className="mb-2">{title}</h2>
                      <Divider />
                    </Box>
                    <Box className="grid grid-rows-1 gap-4 mb-4 grid-flow-col">
                      <RHFTextField
                        name={`${title}.ass`}
                        label="Ass"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.toilet`}
                        label="Toilet"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                      <RHFTextField
                        name={`${title}.pump-room`}
                        label="Pump Room"
                        rules={
                          {
                            // required: "This field is required",
                          }
                        }
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          ) : null}

          <Box className="flex justify-start py-4">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="w-[20.5rem] h-12"
            >
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default FinalDesign;

import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";

const ConfirmBox = (props: any) => {
  const { handlelogin, handleCloselogin, message } = props;
  const methods = useForm();
  const {
    formState: { isSubmitting },
  } = methods;
  return (
    <>
      <Box className="flex flex-col gap-8 text-center">
        <h3 className="text-xl">{message}</h3>
        <Box className="flex gap-8">
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handlelogin}
            disabled={isSubmitting ? true : false}
            fullWidth
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleCloselogin}
            fullWidth
          >
            No
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmBox;

import { Box, Button } from "@mui/material";

const ConfirmBox = (props: any) => {
  const { handlelogin, handleCloselogin,message } = props;
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

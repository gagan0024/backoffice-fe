import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAdminLoginMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accessAdminTokken } from "../../redux/slices/loingSlice";

const Login = () => {
  const [loginAdmin] = useAdminLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const reqObject = {
      url: "auth/login",
      body: {
        email: data.email,
        password: data.password,
      },
    };
    try {
      const resp: any = await loginAdmin(reqObject).unwrap();
      if (resp?.token) {
        dispatch(accessAdminTokken(resp?.token));
      }
      if (resp?.token) {
        navigate("/home");
        toast.success("Successfully Login");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Login
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={
                errors.email ? String(errors.email.message) : undefined
              }
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={
                errors.password ? String(errors.password.message) : undefined
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 3 }}
            >
              Signin
            </Button>
          </form>

        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#0071c8",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
              Welcome!
            </Typography>
            <Typography sx={{ mb: 4 }}>
              Welcome ! We are so happy to have you here. It's great to see you.
              We hope you had a safe and enjoyable time away.
            </Typography>
            <Typography>
              No account yet?{" "}
              <Link href="#" underline="hover" color="inherit">
                Signup.
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

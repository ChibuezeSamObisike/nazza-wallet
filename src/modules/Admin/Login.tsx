import { useEffect } from "react";
import Loader from "shared/Loader";
import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import nazaLogo from "assets/naza-logo.svg";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useAlert } from "hooks/useAlert";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendAdminLoginLink, loginAdmin } from "services/AppService";
import handleApiError, { handleAppError } from "utils/handleApiError";
import { isAuthenticated, setToken } from "utils/auth";

const AdminLogin = () => {
  const { showNotification } = useAlert();
  const location = useLocation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const loginKey = new URLSearchParams(location.search).get("key");

  const sendLoginLink = useMutation(sendAdminLoginLink);
  const { isLoading: loginLoading } = useQuery(
    ["login-admin"],
    () => loginAdmin(userId, loginKey),
    {
      enabled: !!userId || !!loginKey,
      onSuccess(data) {
        setToken("adminToken", data?.accessToken);
        navigate("/admin");
      },
      onError(error) {
        showNotification?.(handleAppError(error) || handleApiError(error), {
          type: "error",
        });
        navigate("/admin/login");
      },
    }
  );

  const onSubmit = (data: { email: string }) => {
    sendLoginLink.mutate(data, {
      onSuccess(data) {
        showNotification?.("Login link sent. Please check your email.", {
          type: "success",
        });
      },
      onError(error) {
        showNotification?.(handleAppError(error) || handleApiError(error), {
          type: "error",
        });
      },
    });
  };

  const defaultValues = {
    email: "",
  };

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Type must be email"),
  });

  const resolver = yupResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver, defaultValues });

  useEffect(() => {
    if (isAuthenticated("adminToken")) {
      navigate(-1);
    }
  });

  //Handle authenticated user visiting already opened admin login page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        isAuthenticated("adminToken")
      ) {
        return navigate("/admin");
      }
      return;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  });

  if (loginLoading || isAuthenticated("adminToken")) return <Loader />;

  return (
    <Box
      bgcolor="#00368f"
      sx={{
        width: "100%",
        height: "100vh",
        position: "fixed",
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bgcolor="#fff" width="30%" p={4}>
        <Box
          marginX="auto"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          p={4}
        >
          <img
            src={nazaLogo}
            alt="logo"
            width={"123px"}
            style={{
              color: "red",
              marginBottom: 4,
            }}
          />
        </Box>
        <Typography textAlign="center" fontWeight="bold" variant="subtitle1">
          Welcome Admin
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Email"
            label="Email"
            fullWidth
            {...register("email")}
            sx={{
              mt: 3,
            }}
            error={Boolean(errors["email"]?.message)}
            helperText={errors.email?.message?.toString()}
          />

          <Button
            sx={{
              mt: 3,
              width: "100%",
            }}
            type="submit"
            disabled={sendLoginLink.isLoading}
            startIcon={
              sendLoginLink.isLoading && (
                <CircularProgress
                  size={16}
                  sx={{
                    fontSize: 2,
                    color: "#fff",
                  }}
                />
              )
            }
          >
            Send login link
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminLogin;

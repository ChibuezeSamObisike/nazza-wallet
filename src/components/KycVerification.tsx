import { Box, Alert, Typography, Button, Divider } from "@mui/material";

function KycBox() {
  return (
    <div>
      <Box
        display='flex'
        alignItems={{ xs: "flex-start", md: "center" }}
        my={2}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box color='#47454C'>
          <Typography fontWeight='bold' mb={2}>
            Verify Email completed
          </Typography>
          <Typography>
            Verification has been sent to your email address
          </Typography>
        </Box>
        <Box>
          <Box
            ml={{ md: 2, xs: 0 }}
            bgcolor='#95CD79'
            p={1}
            px={2}
            borderRadius='16px'
            mt={{ md: 0, xs: 2 }}
          >
            <Typography color='white'>Complete</Typography>
          </Box>
        </Box>
      </Box>

      <Divider
        sx={{
          mt: 2,
        }}
      />
    </div>
  );
}

export default function KycVerification() {
  return (
    <Box bgcolor='#fff' p={3} pt={5}>
      <Box mt={1}>
        <div
          style={{
            marginBottom: "60px",
          }}
        >
          <KycBox />
        </div>
        <KycBox />
        <Alert
          sx={{
            mt: 3,
          }}
          severity='info'
        >
          Please add requested info to complete your account setup
        </Alert>

        <Box
          display='flex'
          my={6}
          alignItems={{ xs: "flex-start", md: "center" }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box color='#47454C'>
            <Typography fontWeight='bold' mb={2}>
              Verify Email completed
            </Typography>
            <Typography>
              Verification has been sent to your email address
            </Typography>
          </Box>
          <Box>
            <Box
              ml={{ md: 2, xs: 0 }}
              bgcolor='#D53A32'
              p={1}
              px={2}
              borderRadius='16px'
            >
              <Typography color='white'>Complete</Typography>
            </Box>
          </Box>
        </Box>

        <Box mt={4} border='1px solid #D4D4D4' borderRadius='4px' p={2}>
          <Typography mb={2} fontWeight={700}>
            Required Document
          </Typography>
          <Typography color='#8C8B90'>
            Any Government ID such as Driver’s License, NIN slip, International
            passportDate of Birth
          </Typography>
        </Box>
        <Box mt={3} mb={4}>
          <Button
            sx={{
              width: "100%",
            }}
            fullWidth
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

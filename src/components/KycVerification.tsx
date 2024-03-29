import { Box, Typography, Button, Divider } from "@mui/material";

export default function KycVerification({
  handleChangeTabs,
  verifyStatus,
}: {
  handleChangeTabs?: Function;
  verifyStatus: Boolean;
}) {
  return (
    <Box bgcolor='#fff' border='1px solid #D4D4D4' p={3} pt={1}>
      <Box mt={1}>
        <Box
          display='flex'
          my={6}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent='space-between'
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box color='#47454C'>
            <Typography fontWeight='bold' mb={2}>
              Level 1 - Verification
            </Typography>
            <Typography>Profile setup</Typography>
          </Box>
          {verifyStatus ? (
            <Box>
              <Box
                ml={{ md: 2, xs: 0 }}
                mt={{ xs: 2, md: 0 }}
                bgcolor='#61C554'
                p={1}
                px={2}
                borderRadius='16px'
              >
                <Typography color='white'>Complete</Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Box>
                <Box
                  ml={{ md: 2, xs: 0 }}
                  mt={{ xs: 2, md: 0 }}
                  bgcolor='#D53A32'
                  p={1}
                  px={2}
                  borderRadius='16px'
                >
                  <Typography color='white'>InComplete</Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
        {/* 
        <Button onClick={() => handleChangeTabs?.(4)} fullWidth>
          Update
        </Button> */}

        <Divider
          sx={{
            my: 2,
          }}
        />
        <Box
          display='flex'
          my={6}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent='space-between'
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box color='#47454C'>
            <Typography fontWeight='bold' mb={2}>
              Level 2 - Unlimited
            </Typography>
            <Typography>Verify Email</Typography>
          </Box>
          <Box>
            <Box
              ml={{ md: 2, xs: 0 }}
              mt={{ xs: 2, md: 0 }}
              bgcolor='#61C554'
              p={1}
              px={2}
              borderRadius='16px'
            >
              <Typography color='white'>Complete</Typography>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Box
          display='flex'
          my={6}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent='space-between'
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box color='#47454C'>
            <Typography fontWeight='bold' mb={2}>
              Level 3 - Verification
            </Typography>
            <Typography>KYC</Typography>
          </Box>
          <Box>
            <Box
              ml={{ md: 2, xs: 0 }}
              mt={{ xs: 2, md: 0 }}
              bgcolor='#D53A32'
              p={1}
              px={2}
              borderRadius='16px'
            >
              <Typography color='white'>InComplete</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          mt={4}
          borderRadius='4px'
          p={2}
          border='1px solid #D4D4D4'
          width='60%'
        >
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

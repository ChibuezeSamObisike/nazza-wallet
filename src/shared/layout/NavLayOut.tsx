import React from "react";
import { Container } from "@mui/system";
import Navbar from "components/Navbar";

export default function NavLayOut({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />

      <Container
        sx={{
          marginBottom: 5,
        }}
      >
        {children}
      </Container>
    </div>
  );
}

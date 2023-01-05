import React from "react";
import { Container } from "@mui/system";
import Navbar from "components/Navbar";

export default function NavLayOut({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}

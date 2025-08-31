"use client";

import TTTGame from "@/components/tic-tac-toe/TTTGame";
import React from "react";
import { Theme, Box } from "@radix-ui/themes";
import Footer from "@/components/Footer";


export default function Game() {
  return (
      <Box className="App">
        <TTTGame />
        <Footer />
      </Box>
  )
}

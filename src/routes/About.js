import React from "react";
import { Flex, Text } from "theme-ui";

import Footer from "../components/Footer";

function About() {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
        alignItems: "center",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "300px",
          flexGrow: 1,
        }}
        mb={2}
      >
        <Text variant="display" as="h1" sx={{ textAlign: "center" }}>
          About
        </Text>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default About;

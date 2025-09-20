import { Box, Card, Text } from "@radix-ui/themes";

export default function InfoCard({ text = "" }) {
  return (
    <Box className="rounded-full px-3 py-1 flex items-center justify-center"
      style={{ backgroundColor: "var(--gray-6)" }}
    >
      {text}
    </Box>)
}

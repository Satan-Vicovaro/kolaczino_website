import { Box } from "@radix-ui/themes";

export default function ErrorCard({ text = "" }) {
  return (
    <Box className="rounded-full px-3 py-1 flex items-center justify-center w-max"
      style={{ backgroundColor: "var(--red-6)", color: "var(--white-6)" }}
    >
      {text}
    </Box>)
}

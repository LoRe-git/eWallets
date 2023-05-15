import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function CopyRight(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="https://kuehne-nagel.com/">
        Kuehne+Nagel
      </Link>{" "}
    </Typography>
  );
}

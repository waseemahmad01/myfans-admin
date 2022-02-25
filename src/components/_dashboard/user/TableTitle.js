import { Box, Typography } from "@mui/material";

export default function TableTitle({ title }) {
	return (
		<Box
			sx={{
				px: 3,
				py: 1,
				backgroundColor: "primary.TableTitleBarbg",
				color: "primary.TableTitleBarTitle",
				borderBottom: "1px solid #e3e6f0",
			}}
		>
			<Typography variant="h6" sx={{}}>
				{title}
			</Typography>
		</Box>
	);
}

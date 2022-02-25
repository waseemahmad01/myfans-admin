import { Box, Card, Grid, Typography } from "@mui/material";
const FormWrapper = ({ title = "Title", children }) => {
	return (
		<Card sx={{ borderRadius: "5px" }}>
			<Box
				sx={{
					px: 3,
					py: 1,
					backgroundColor: "primary.TableTitleBarbg",
					color: "primary.TableTitleBarTitle",
					borderBottom: "1px solid #e3e6f0",
				}}
			>
				<Typography>{title}</Typography>
			</Box>
			<Grid sx={{ p: "20px" }} container spacing={3}>
				{children}
			</Grid>
		</Card>
	);
};

export default FormWrapper;

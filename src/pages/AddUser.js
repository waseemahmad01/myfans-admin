// import { Box, Card, Typography, Grid } from "@mui/material";
import { Grid } from "@mui/material";
//import { styled } from "@mui/material/styles";
import Page from "../components/Page";
import { FormWrapper } from "../components/_dashboard/user";
import { UserForm } from "../components/_dashboard/user";
import { UploadButton } from "../components/_dashboard/user";
export default function AddAdmin() {
	return (
		<Page title="User | Add User">
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<FormWrapper title="User Details">
						<UserForm />
					</FormWrapper>
				</Grid>
				<Grid item xs={4}>
					<FormWrapper title="Add Image">
						<UploadButton />
					</FormWrapper>
				</Grid>
			</Grid>
		</Page>
	);
}

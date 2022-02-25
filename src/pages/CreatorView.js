import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import bxsUser from '@iconify/icons-bx/bxs-user';
import starFilled from '@iconify/icons-ant-design/star-filled';
import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Grid, Tabs, Tab, Typography, Box, styled, Card, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// utils
import { mockAvatar, mockAvatar1, mockAvatar2, mockAvatar3 } from '../utils/mockImages';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.info.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(name, data) {
	return { name, data };
}
const rows = [
	createData('Username:', 159, 6.0, 24, 4.0),
	createData('user_mode', 237, 9.0, 37, 4.3),
	createData('Name:', 262, 16.0, 24, 6.0),
	createData('Age :', 305, 3.7, 67, 4.3),
	createData('Gender:', 356, 16.0, 49, 3.9),
	createData('Mobile:', 356, 16.0, 49, 3.9),
	createData('Email:', 356, 16.0, 49, 3.9),
	createData('Country:', 356, 16.0, 49, 3.9),
	createData('Personal Status', 356, 16.0, 49, 3.9),
	createData('Followers:', 356, 16.0, 49, 3.9),
	createData('Following:', 356, 16.0, 49, 3.9),
	createData('Rating', 356, 16.0, 49, 3.9),

];
const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: '#858796',
}));


export default function UserView() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: '#dddfeb' }}>
				<TabsStyle value={value} onChange={handleChange} aria-label="basic tabs example">
					<TabStyle label="User Details" {...a11yProps(0)} />
					<TabStyle label="Image" {...a11yProps(1)} />
					<TabStyle label="Videos" {...a11yProps(2)} />
				</TabsStyle>
			</Box>
			<TabPanelStyle value={value} index={0}>
				<Typography sx={{ mb: '20px', color: '#4e73df' }}>User Details</Typography>
				<CardStyle>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 500 }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>User Details</StyledTableCell>
											<StyledTableCell></StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<StyledTableRow key={row.name}>
												<StyledTableCell component="th">
													{row.name}
												</StyledTableCell>
												<StyledTableCell align="left">{row.data}</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item xs={4}>
							<Box
								component="img"
								src={mockAvatar}
								sx={{ objectFit: 'contain', aspectRatio: '1', width: '80%', borderRadius: '50%', background: "rgba(0,0,0,0.05)", mx: 'auto', mb: "20px" }}
							/>
							<Stack
								direction="row"
								divider={<Divider orientation="vertical" flexItem />}
								spacing={1}
								sx={{ justifyContent: 'center', pb: '20px' }}
							>
								<Item><Icon icon={bxsUser} /> 10</Item>
								<Item><Icon icon={bxsUser} /> 10</Item>
								<Item><Icon icon={starFilled} /> 20</Item>
							</Stack>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<ImageStyle component="img" src={mockAvatar1} />
								</Grid>
								<Grid item xs={6}>
									<ImageStyle component="img" src={mockAvatar2} />
								</Grid>
								<Grid item xs={6}>
									<ImageStyle component="img" src={mockAvatar3} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardStyle>
			</TabPanelStyle>
			<TabPanelStyle value={value} index={1}>
				<Typography sx={{ mb: '20px' }}>User Images</Typography>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<ImageStyle component="img" src={mockAvatar1} />
					</Grid>
					<Grid item xs={3}>
						<ImageStyle component="img" src={mockAvatar2} />
					</Grid>
					<Grid item xs={3}>
						<ImageStyle component="img" src={mockAvatar3} />
					</Grid>
				</Grid>
			</TabPanelStyle>
			<TabPanelStyle value={value} index={2}>
				Item Three
			</TabPanelStyle>
		</Box>
	);
}

const ImageStyle = styled((props) => <Box {...props} />)(
	({ theme }) => ({
		objectFit: 'cover',
		aspectRatio: '1',
		borderRadius: '5px'
	})
);


const TabStyle = styled((props) => <Tab {...props} />)(
	({ theme }) => ({
		"&.Mui-selected": {
			backgroundColor: '#fff',
			color: '#6e707e'
		}
	})
);

const TabsStyle = styled((props) => <Tabs {...props} />)(
	({ theme }) => ({
		"& .MuiTabs-indicator": {
			display: 'none'
		}
	})
);

const TabPanelStyle = styled((props) => <TabPanel {...props} />)(
	({ theme }) => ({
		color: '#6e707e'
	})
);

const CardStyle = styled((props) => <Card {...props} />)(
	({ theme }) => ({
		backgroundColor: '#fff',
		padding: '50px 20px',
		borderRadius: '7px'
	})
);
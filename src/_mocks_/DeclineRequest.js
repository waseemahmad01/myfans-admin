import faker from "faker";
//import { sample } from "lodash";
// utils
//import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const PendingRequests = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	// avatarUrl: mockImgAvatar(index + 1),
	// name: faker.name.findName(),
	// company: faker.company.companyName(),
	// isVerified: faker.datatype.boolean(),
	// status: sample(['active', 'banned']),
	// role: sample([
	//   'Leader',
	//   'Hr Manager',
	//   'UI Designer',
	//   'UX Designer',
	//   'UI/UX Designer',
	//   'Project Manager',
	//   'Backend Developer',
	//   'Full Stack Designer',
	//   'Front End Developer',
	//   'Full Stack Developer'
	// ]),
	sno: "1",
	username: "Anu Mehta",
	email: "nishaneemal@gmail.com",
	amount: "$ 2.4",
	// transactionid: "4DD77942KP4904805",
	// payableamount: "$ 1.68",
	// gender: sample(["Male", "Female"]),
	// status: sample(["active", "banned"]),
}));

export default PendingRequests;

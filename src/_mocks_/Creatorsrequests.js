import faker from "faker";
import { sample } from "lodash";
//import { sample } from "lodash";
// utils
//import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const creatorsrequests = [...Array(24)].map((_, index) => ({
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
	username: "Pritpal Singh",
	creatorname: "Mufasa",
	doctype: "Aadhar card",
	document: "View",
	document2: "View",
	callprice:'1',
	allaccess:'12',
	requestat:'2021-02-02 17:00:45',
	action:sample(['Grant', 'Deny']),
}));

export default creatorsrequests;

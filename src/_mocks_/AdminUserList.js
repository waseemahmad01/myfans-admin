import faker from "faker";
import { sample } from "lodash";
// utils
//import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
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
	name: "test",
	emailaddress: "pritpal.singh@gmail.com",
	phoneno: "0987654321",
	followers: "0",
	following: "0",
	gender: sample(["Male", "Female"]),
	status: sample(["active", "banned"]),
}));

export default users;

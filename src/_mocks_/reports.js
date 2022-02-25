import faker from "faker";
import { sample } from "lodash";
// utils
//import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const reports = [...Array(24)].map((_, index) => ({
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
	reportedby: "Lollipop",
	reportedagainst: "classic",
	text: "1",
	status: sample(["active"]),
}));

export default reports;

import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import userFilled from "@iconify/icons-fa-solid/users";
// import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
// import fileTextFill from "@iconify/icons-eva/file-text-fill";
// import lockFill from "@iconify/icons-eva/lock-fill";
// import personAddFill from "@iconify/icons-eva/person-add-fill";
// import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import adminfill from "@iconify/icons-eva/person-fill";
import inqueryfill from "@iconify/icons-eva/message-square-fill";
import menoyfill from "@iconify/icons-fa-solid/file-invoice-dollar";
import videofill from "@iconify/icons-eva/video-fill";
import creatorfill from "@iconify/icons-fa/street-view";
import giftfill from "@iconify/icons-eva/gift-fill";
import packfill from "@iconify/icons-fa-solid/money-check-alt";
import reportfill from "@iconify/icons-octicon/database-16";
import messageFilled from "@iconify/icons-ant-design/message-filled";
// import AddAdmin from "src/pages/AddAdmin";
// import AdminList from "src/pages/AdminList";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "Admin_Details",
    path: "/dashboard/admin",
    icon: getIcon(adminfill),
    sectionTitle: "Admin",
    children: [
      {
        title: "Add_Admin",
        path: "addadmin",
      },
      {
        title: "List_Admin",
        path: "adminlist",
      },
    ],
  },
  {
    title: "User_Management",
    path: "/dashboard/user",
    icon: getIcon(userFilled),
    sectionTitle: "User",
    children: [
      {
        title: "User_List",
        path: "userlist",
      },
      {
        title: "Creator_List",
        path: "creatorslist",
      },
    ],
  },
  {
    title: "Mass_Message",
    path: "/mass",
    icon: getIcon(messageFilled),
  },
  {
    title: "Inquiry",
    path: "/inquiry",
    icon: getIcon(inqueryfill),
  },
  {
    title: "Money_Request",
    path: "/dashboard/money",
    icon: getIcon(menoyfill),
    sectionTitle: "Requests",
    children: [
      {
        title: "Pending_Request",
        path: "pendingmoneyrequest",
      },
      {
        title: "Accept_Request",
        path: "acceptmoneyrequest",
      },
      {
        title: "Decline_Request",
        path: "declinemoneyrequest",
      },
    ],
  },
  {
    title: "Video",
    path: "/videolist",
    icon: getIcon(videofill),
  },
  {
    title: "Creator_Request",
    path: "/creatorrequest",
    icon: getIcon(creatorfill),
  },
  {
    title: "Gifts",
    path: "/dashboard/gifts",
    icon: getIcon(giftfill),
    sectionTitle: "Gifts",
    children: [
      {
        title: "Gifts_Details",
        path: "giftdetails",
      },
      {
        title: "List_Gifts",
        path: "giftlist",
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: getIcon(reportfill),
  },
];

const sidebarConfig2 = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "Admin_Details",
    path: "/dashboard/admin",
    icon: getIcon(adminfill),
    sectionTitle: "Admin",
    children: [
      {
        title: "List_Admin",
        path: "adminlist",
      },
    ],
  },
  {
    title: "User_Management",
    path: "/dashboard/user",
    icon: getIcon(userFilled),
    sectionTitle: "User",
    children: [
      {
        title: "User_List",
        path: "userlist",
      },
      {
        title: "Creator_List",
        path: "creatorslist",
      },
    ],
  },
  {
    title: "Mass_Message",
    path: "/mass",
    icon: getIcon(messageFilled),
  },
  {
    title: "Inquiry",
    path: "/inquiry",
    icon: getIcon(inqueryfill),
  },
  {
    title: "Money_Request",
    path: "/dashboard/money",
    icon: getIcon(menoyfill),
    sectionTitle: "Requests",
    children: [
      {
        title: "Pending_Request",
        path: "pendingmoneyrequest",
      },
      {
        title: "Accept_Request",
        path: "acceptmoneyrequest",
      },
      {
        title: "Decline_Request",
        path: "declinemoneyrequest",
      },
    ],
  },
  {
    title: "Video",
    path: "/videolist",
    icon: getIcon(videofill),
  },
  {
    title: "Creator_Request",
    path: "/creatorrequest",
    icon: getIcon(creatorfill),
  },
  {
    title: "Gifts",
    path: "/dashboard/gifts",
    icon: getIcon(giftfill),
    sectionTitle: "Gifts",
    children: [
      {
        title: "Gifts_Details",
        path: "giftdetails",
      },
      {
        title: "List_Gifts",
        path: "giftlist",
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: getIcon(reportfill),
  },
];

const config = {
  sidebarConfig,
  sidebarConfig2,
};

export default config;

// import { icons } from "react-icons/lib";
import path from "./path";
import icons from "./icons";
import { TbJewishStarFilled } from "react-icons/tb";

const {
  BsShieldShaded,
  FaTruckFast,
  PiGiftDuotone,
  BsReplyFill,
  FaTty,
  AiOutlineDashboard,
  MdGroup,
  GrTechnology,
  FaCashRegister,
} = icons;

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];

export const productExtraInfomation = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality checked",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free shipping",
    sub: "Free on all products",
    icon: <FaTruckFast />,
  },
  {
    id: 3,
    title: "Special gift card",
    sub: "Special gift card",
    icon: <PiGiftDuotone />,
  },
  {
    id: 4,
    title: "Free return",
    sub: "Within 7 days",
    icon: <BsReplyFill />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "DISCRIPTION",
    content: `Raise your game and carry your squad with the new ROG Strix G16, a powerful gaming laptop that features Windows 11, a 13th Gen Intel Core processor, and an NVIDIA GeForce RTX 40 Series Laptop GPU. With DDR5-4800MHz memory and PCIe 4x4, this laptop is designed to provide lightning-fast performance and minimize loading times. The ROG Intelligent Cooling system with upgraded liquid metal on the CPU and Tri-Fan Technology, ensures that the laptop can handle the power it can deliver. The ROG Nebula Display guarantees a premium visual experience, and the MUX Switch with Advanced Optimus optimizes both gaming performance and battery life. The laptop's design is inspired by cyberpunk aesthetics and graffiti accents, and features unique elements such as a dot matrix design on the lid and cross-hatched vents.`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `UMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warrantities are given to the original retail purchaser of the following Ashley Furniture industries Inc Products
    Frames Used in upholstered and Loomer Products
    Limited Letime Warranty
    A Limited Lifetime Warranty applies to al frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers, Ashley Furniture Industries on these components to you the original retail purchaser, to be tree bom material manufacturing defects`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `PURCHASING & DELIVERY
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser's responsibility to make sure the correct items are picked up and in good condition. Delivery
    Before you make your purchase, it's helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination. Picking up at the store
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `PURCHASING & DELIVERY
    Shopify Shop requires that of products are property inspected BEFORE you toke it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for sofe transport. We encourage at customers to bring furniture pads or blankets to protect the items during transport as well as rope or be downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit it is the purchaser's sponsibility to make sure the comect items are picked up and in good condition
    Butorn you make your purchase, it's holotus to know the measurements of the groo you plan to ploce the furniture. You should also measure any doorways and bollways through which the fumiture will poss to get to its final destination
    Customers are able to pick the next ovoloble delivery day that best fits their schedule. However, to foute stops os efficiently as possible, Shopity shop will provide the time frame Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible years or older) wit be home at that time. in proporation for your delivery, please remove existing fumiture pictures, mirrors, accessories, etc. to prevent comages, Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team shopity Shop will deliver
    adult (18 assemble, and set up your new furniture purchase and remove a pocking materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel ore unable to remove doors, hoist furniture or carry furniture up more than 3 tight of stairs. An elevator must be available for deliveries to the 4th floor and above`,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];

export const adminSideBar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage User",
    path: `${path.MANAGE_USER}`,
    icon: <MdGroup size={20} />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage Products",
    icon: <GrTechnology size={20} />,
    submenu: [
      {
        text: "Create product",
        path: `${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage product",
        path: `${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage orders",
    path: `${path.MANAGE_ORDER}`,
    icon: <FaCashRegister size={20} />,
  },
];

export const memberSideBar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My cart",
    path: `${path.MY_CART}`,
    icon: <MdGroup size={20} />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Buy histories",
    path: `${path.HISTORY}`,
    icon: <FaCashRegister size={20} />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Wishlist",
    path: `${path.WISHLIST}`,
    icon: <TbJewishStarFilled size={20} />,
  },
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "-title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "tile",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price, high to low",
  },
  {
    id: 5,
    value: "price",
    text: "Price, low to high",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Date, new to old",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Date, old to new",
  },
];

export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Neutral",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];

export const statusOrders = [
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Succeed",
    value: "Succeed",
  },
];
export const roles = [
  {
    code: "admin",
    value: "Admin",
  },
  {
    code: "user",
    value: "User",
  },
];
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Actived",
  },
];

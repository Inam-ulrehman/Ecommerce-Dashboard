import {
  FaRegAddressBook,
  FaInstagramSquare,
  FaFacebook,
  FaTwitterSquare,
  FaProductHunt,
  // FaSignInAlt,
} from 'react-icons/fa'
// ========logo =========== //
export const logo =
  'https://res.cloudinary.com/inam6530/image/upload/v1667486202/inamwebsolutions/Inam_n9s4i4.svg'
// ========Nav Bar=========== //

export const DashboardSidebarNav = [
  {
    id: 1,
    path: '/dashboard',
    title: 'Home',
    icon: <FaProductHunt />,
  },
  {
    id: 1,
    path: '/dashboard/products',
    title: 'Products',
    icon: <FaProductHunt />,
  },
  {
    id: 2,
    path: '/dashboard/contact',
    title: 'Contact Form',
    icon: <FaRegAddressBook />,
  },
  {
    id: 3,
    path: '/dashboard/orders',
    title: 'Online Orders',
    icon: <FaRegAddressBook />,
  },
]
// =======Dashboard========

export const dashboardNavLink = [
  { id: 1, title: 'Dashboard', path: '/dashboard' },
  { id: 2, title: 'Profile', path: '/dashboard/profile' },
  { id: 3, title: 'Upload Product', path: '/dashboard/upload' },
  { id: 4, title: 'Change password', path: '/dashboard/changePassword' },
  { id: 5, title: 'Update Website Content', path: '/dashboard/websiteContent' },
]

// ==========Website Content=========

export const WebsiteContentSideBar = [
  { id: 1, title: 'Section-1', path: '/dashboard/websiteContent' },
  { id: 2, title: 'Section-2', path: '/dashboard/websiteContent/sectionTwo' },
  { id: 3, title: 'Section-3', path: '/dashboard/websiteContent/SectionThree' },
  { id: 4, title: 'About Us', path: '/dashboard/websiteContent/aboutUs' },
  {
    id: 5,
    title: 'Contact Details',
    path: '/dashboard/websiteContent/contact',
  },
  {
    id: 6,
    title: 'Social Links',
    path: '/dashboard/websiteContent/socialLinks',
  },
]

// ==================footer //============
// ===== Data for Address =====
export const address = [
  {
    id: 1,
    title: 'Address',
    titleInfo: 'https://www.google.com/maps/@43.4450731,-80.4859129,17z',
    titleText: '86 Cedar Street,Kitchener, ON,  N2G 3L8',
    target: '_blank',
    rel: 'noreferrer',
  },
  {
    id: 2,
    title: 'Mobile Number',
    titleInfo: 'tel:4165606790',
    titleText: '4165606790',
  },
  {
    id: 3,
    title: 'Landline',
    titleInfo: 'tel:4165606790',
    titleText: '4165606790',
  },
  {
    id: 4,
    title: 'Email',
    titleInfo: 'mailto:Support@inamwebsolutions.com',
    titleText: 'Support@inamwebsolutions.com',
  },
]
// ======Data for SocialIcons=====Start
export const socialIcons = [
  {
    id: 1,
    path: 'https://facebook.com',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaFacebook />,
    title: 'Facebook',
  },
  {
    id: 2,
    path: 'https://Twitter.com',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaTwitterSquare />,
    title: 'Twitter',
  },
  {
    id: 5,
    path: 'https://www.instagram.com/',
    target: '_blank',
    rel: 'noreferrer',
    icon: <FaInstagramSquare />,
    title: 'Instagram',
  },
]
// ======== data for google maps==========

export const googleMapsData = { lat: 43.4450848, lng: -80.48596 }

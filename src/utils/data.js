import {
  FaHome,
  FaEnvelope,
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

export const navbar = [
  { id: 1, path: '/', title: 'Home', icon: <FaHome /> },
  { id: 2, path: '/about', title: 'About', icon: <FaEnvelope /> },
  { id: 3, path: '/products', title: 'Products', icon: <FaProductHunt /> },
  { id: 4, path: '/contact', title: 'Contact', icon: <FaRegAddressBook /> },
]
// =======Dashboard========
export const dashboardNavLink = [
  { id: 1, title: 'dashboard', path: '/dashboard' },
  { id: 2, title: 'Profile', path: '/dashboard/profile' },
  { id: 3, title: 'Change password', path: '/dashboard/changepassword' },
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


export const businessCategory = [
  {key: 1, text: 'clothings', value: 'clothing'},
  {key: 2, text: 'electronics', value: 'electronics'},
  {key: 3, text: 'Catering', value: 'Catering'},
  {key: 4, text: 'House cleaning', value: 'House cleaning'},
  {key: 5, text: 'Copy or content writing', value: 'Copy or content writing'},
  {key: 6, text: 'Graphics design', value: 'Graphics design'},
  {key: 7, text: 'Interior', value: 'Interior'},
  {key: 8, text: 'Photography', value: 'Photography'},
  {key: 9, text: 'Real estate', value: 'Real estate'},
  {key: 10, text: 'Personal trainer', value: 'Personal trainer'}
]

export const state = [
  {key: 1, text: 'Lagos', value: 'lagos'},
  {key: 2, text: 'Ogun', value: 'ogun'},
  {key: 3, text: 'Ibadan', value: 'ibadan'},
  {key: 4, text: 'Abuja', value: 'abuja'}
]

export const asideMenu =
    [
      {
        text: 'home',
        value: 'home',
        icon: 'home',
        path: '/',
      },
      {
        text: 'dashboard',
        value: 'dashboard',
        icon: 'dashboard',
        path: `/dashboard/store`,
      },
    ]

export const dashboardMenu = [
    {
      text: 'store',
      value: 'store',
      icon: 'warehouse',
      path: '/dashboard/store',
    },
    {
      text: 'business',
      value: 'business',
      icon: 'handshake',
      path: '/dashboard/business',
    },
    {
      text: 'wallet',
      value: 'wallet',
      icon: 'google wallet',
      path: '/dashboard/wallet',
    },
    {
        text: 'invoice',
        value: 'invoices',
        icon: 'payment',
        path: '/dashboard/invoice',
      },
    {
      text: 'profile',
      value: 'profile',
      icon: 'user',
      path: '/user',
    },
  ]
  export const cardMenu = [
    {
      text: 'business',
      value: 'business',
      icon: 'handshake',
      path: '/dashboard/business',
      color: 'teal'
    },
    {
      text: 'clients',
      value: 'clients',
      icon: 'users',
      path: '/dashboard/clients',
      color: 'orange'
    },
    {
        text: 'invoice',
        value: 'invoices',
        icon: 'payment',
        path: '/dashboard/invoice',
        color: ''
      },
    {
      text: 'wallet',
      value: 'wallet',
      icon: 'google wallet',
      path: '/dashboard/wallet',
    },
  ]
  export const socialMediaOptions = [
    { key: 'm', text: 'facebook f', value: 'facebook f', icon: 'facebook' },
    { key: 'f', text: 'instagram', value: 'instagram', icon: 'instagram' },
    { key: 'o', text: 'linkedin', value: 'linkedin', icon: 'linkedin' },
  ]
export const genderOptions = [
    { key: 'm', text: 'male', value: 'male' },
    { key: 'f', text: 'female', value: 'female' },
    { key: 'o', text: 'others', value: 'others' },
]
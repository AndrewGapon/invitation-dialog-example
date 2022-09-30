export const ROLE_IDS = {
  guest: 'guest',
  admin: 'admin',
}

export const roles = {
  [ROLE_IDS.guest]: {
    id: ROLE_IDS.guest,
    title: 'Guest',
    description:
      'Default access level, can leave tributes, share media and stories',
  },
  [ROLE_IDS.admin]: {
    id: ROLE_IDS.admin,
    title: 'Admin',
    description:
      'Can control all aspects of the website, including moderating content posted by others and changing website settings',
  },
}

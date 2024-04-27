import type { User } from '@/service/UserService';

export const roles = [
  {
    value: 'ACCOUNT_MANAGER',
    label: 'Account manager',
    color: 'danger',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    color: 'success',
  },
  {
    value: 'AGENT',
    label: 'Agent',
    color: 'info',
  },
  {
    value: 'EXTERNAL_REVIEWER',
    label: 'External reviewer',
    color: 'warning',
  },
];

export const rolesByValue = roles.reduce((acc, role) => {
  acc[role.value] = role;

  return acc;
}, {} as Record<User['role'], typeof roles[number]>);

export type RoleValue = typeof roles[number]['value']

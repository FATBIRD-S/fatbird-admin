declare interface RoleItem {
  id: number;
  name: string;
}

declare interface Permission {
  id: number;
  code: string;
  description: string;
}

declare interface JwtUserData {
  userId: number;
  username: string;
  roles: RoleItem[];
  permissions: Permission[];
}

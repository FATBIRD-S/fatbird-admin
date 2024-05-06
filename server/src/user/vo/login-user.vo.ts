import { Permission } from './../entities/permission.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

interface UserInfo extends User {
  roles: RoleItem[];
  permissions: Permission[];
}

class RoleItemCla implements RoleItem {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

class PermissionCla implements Permission {
  @ApiProperty()
  id: number;
  @ApiProperty()
  code: string;
  @ApiProperty()
  description: string;
}

class UserInfoCla implements UserInfo {
  @ApiProperty({
    type: Number,
  })
  id: number;
  @ApiProperty({
    type: String,
    default: '2333',
  })
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  nickName: string;
  @ApiProperty()
  headPic: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  isFrozen: boolean;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty({
    type: Date,
  })
  createTime: Date;
  @ApiProperty()
  updateTime: Date;
  @ApiProperty({ type: RoleItemCla, isArray: true })
  roles: RoleItem[];
  @ApiProperty({ type: PermissionCla, isArray: true })
  permissions: Permission[];
}

export class LoginUserVo {
  @ApiProperty({
    type: UserInfoCla,
  })
  userInfo: UserInfo;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

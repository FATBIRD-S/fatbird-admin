import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserInfoVo {
  @Type(() => Number)
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  userName: string;

  @Expose()
  @ApiProperty()
  nickName: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  headPic: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty()
  isFrozen: boolean;

  // 使用Transform装饰器将字符串转换为Date对象
  @Type(() => Date)
  @Expose()
  @ApiProperty()
  createTime: Date;
}

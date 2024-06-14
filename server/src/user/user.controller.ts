import { RedisService } from 'src/redis/redis.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequireLgPe, RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserInfoVo } from './vo/user-info.vo';
import { plainToClass } from 'class-transformer';
import { UpdateUserPasswordDto } from './dto/updateUserPasword.dto';
import { UpdateUserDto } from './dto/updareUser.dto';
import { generateParseIntPipe } from 'src/utils';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserVo } from './vo/login-user.vo';
import { RefreshTokenVo } from './vo/refresh-token.vo';

@ApiTags('用户管理模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '注册成功',
    type: UserInfoVo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '注册失败',
    type: String,
  })
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @ApiOperation({ summary: '发送注册验证码' })
  @ApiQuery({
    name: 'address',
    description: '邮箱地址',
    type: String,
    required: true,
    example: '123456789@qq.com',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '发送成功',
    type: String,
  })
  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(-6);

    await this.redisService.set(`captcha_${address}`, code, 60 * 5);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<h1>您的验证码是${code}</h1>`,
    });
    return { message: '验证码已发送至您的邮箱' };
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '用户不存在/密码错误', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: '用户信息与token', type: LoginUserVo })
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const user = await this.userService.login(loginUser, false);

    user.accessToken = this.jwtService.sign(
      {
        userId: user.userInfo.id,
        username: user.userInfo.username,
        role: user.userInfo.roles,
        permissions: user.userInfo.permissions,
      },
      {
        expiresIn: this.configService.get('jwt_access_token_expires_time'),
      },
    );

    user.refreshToken = this.jwtService.sign(
      {
        userId: user.userInfo.id,
        isAdmin: user.userInfo.isAdmin,
      },
      {
        expiresIn: this.configService.get('jwt_refresh_token_expires_time'),
      },
    );
    return user;
  }

  @ApiOperation({ summary: '刷新 token' })
  @ApiQuery({
    name: 'refreshToken',
    type: String,
    description: '刷新 token',
    required: true,
    example: 'xxxxxxxxyyyyyyyyzzzzz',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'token 已失效，请重新登录',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '刷新成功',
    type: RefreshTokenVo,
  })
  @Get('refresh')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserById(data.userId, data.isAdmin);
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
          roles: user.roles,
          permissions: user.permissions,
        },
        {
          expiresIn: this.configService.get('jwt_access_token_expires_time'),
        },
      );
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        {
          expiresIn: this.configService.get('jwt_refresh_token_expires_time'),
        },
      );
      const vo = new RefreshTokenVo();
      vo.access_token = access_token;
      vo.refresh_token = refresh_token;
      return vo;
    } catch (error) {
      throw new UnauthorizedException('Refresh token expired');
    }
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: '用户信息', type: UserInfoVo })
  @Get('info')
  @RequireLogin()
  async getInfo(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);
    const userVo = plainToClass(UserInfoVo, user, {
      excludeExtraneousValues: true,
    });
    return userVo;
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: '更新成功' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '更新失败' })
  @ApiBody({
    type: UpdateUserPasswordDto,
    description: '更新密码',
  })
  @Post('update_password')
  @RequireLogin()
  async updatePassword(@UserInfo('userId') userId: number, @Body() passwordDto: UpdateUserPasswordDto) {
    return await this.userService.updateUserPassword(userId, passwordDto);
  }

  @ApiOperation({ summary: '发送更改密码验证码' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'email', description: '邮箱地址', type: String, required: true, example: '123456789@qq.com' })
  @Get('update_password/captcha')
  async updatePasswordCaptcha(@Query('email') email: string, @UserInfo('userId') userId: number) {
    await this.userService.sendPasswordCaptcha(email, userId);
    return '发送成功';
  }

  /**
   * 修改用户信息
   */
  @Post('update')
  @RequireLogin()
  async update(@UserInfo('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  @ApiOperation({ summary: '发送更改用户信息验证码' })
  @Get('update/captcha')
  async updateCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`update_user_captcha_${address}`, code, 10 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '更改用户信息验证码',
      html: `<p>你的验证码是 ${code}</p>`,
    });
    return '发送成功';
  }

  @ApiOperation({ summary: '冻结用户' })
  @Get('freeze')
  @RequireLogin()
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }

  @ApiOperation({ summary: '获取用户列表' })
  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo')) pageNo: number,
    @Query('pageSize', new DefaultValuePipe(2), generateParseIntPipe('pageSize')) pageSize: number,
    @Query('userName') username: string,
    @Query('email') email: string,
  ) {
    return await this.userService.findUsersByPage(pageNo, pageSize, username, email);
  }
  @Get('app2')
  @RequireLgPe(['ccc'])
  getApp2(@UserInfo('permissions') permissions: JwtUserData['permissions']) {
    return permissions;
  }
}

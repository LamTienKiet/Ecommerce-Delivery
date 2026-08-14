import { Controller, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard) // Bắt buộc đăng nhập
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('avatar')
  updateAvatar(@Request() req, @Body('imageUrl') imageUrl: string) {
    // req.user được gán từ JWT token
    const accountId = req.user.accountId;
    return this.profileService.updateAvatar(accountId, imageUrl);
  }

  @Put('change-password')
  changePassword(@Request() req, @Body() dto: ChangePasswordDto) {
    return this.profileService.changePassword(req.user.accountId, dto);
  }

  @Put('update-email')
  updateEmail(@Request() req, @Body() dto: UpdateEmailDto) {
    return this.profileService.updateEmail(req.user.accountId, dto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Không tìm thấy file để upload');
    }
    
    // Upload thẳng lên Cloudinary
    const result = await this.cloudinaryService.uploadFile(file);

    return {
      url: result.secure_url,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) // Yêu cầu đăng nhập + phân quyền
  @Roles('ADMIN')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    const catId = categoryId ? parseInt(categoryId) : undefined;
    return this.productService.findAll(pageNumber, limitNumber, catId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}

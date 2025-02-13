import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  Request,
  Query
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity'; // 假设有一个Article实体类
import { AuthGuard } from '../auth/guard/auth.guard';
import { Logger } from '@nestjs/common';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}
  private readonly logger = new Logger(ArticleController.name);

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto): Promise<Article | undefined> {
    return this.articlesService.create(createArticleDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req, @Query('knowledgeId') knowledgeId: number): Promise<Article[]> {
    return this.articlesService.findAll(req.user.id, knowledgeId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Request() req): Promise<Article | undefined> {
    const articleId = parseInt(id, 10);
    return this.articlesService.update(articleId, updateArticleDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    this.logger.debug(`Deleting article with id: ${id}`);
    const articleId = parseInt(id, 10);
    await this.articlesService.remove(articleId, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Article | undefined> {
    const articleId = parseInt(id, 10);
    return this.articlesService.findOne(articleId, req.user.id);
  }

}




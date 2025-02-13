import { Knowledge } from './../knowledge/entities/knowledge.entity';
import { Injectable, Inject, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ARTICLE_REPOSITORY } from '../../constants/common.constants';
import { Article } from './entities/article.entity';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ARTICLE_REPOSITORY)
    private articleRepository: Repository<Article>,
  ) {}
  private readonly logger = new Logger(ArticleService.name);
  async create(createArticleDto: CreateArticleDto,authorId:number): Promise<Article> {
    try {
      this.logger.log(`Creating a new article with data: ${JSON.stringify(createArticleDto)}`);
      // 创建新的文章实体
      const article = this.articleRepository.create({
        ...createArticleDto,
        last_modified_at: new Date(),
        author_id:authorId,
      });
      // 保存文章实体
      const savedArticle = await this.articleRepository.save(article);
      this.logger.log(`Created article entity: ${JSON.stringify(savedArticle)}`);
      return savedArticle;
    } catch (error) {
      this.logger.error(`Error creating article: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An error occurred while creating the article');
    }
  }

  async findAll(userId: number, knowledgeId :number): Promise<Article[]> {
    this.logger.log(`Fetching articles for user with ID: ${userId}`);

    const articles = await this.articleRepository.find({
      where: [
        { author_id: userId },
        { knowledge_base_id:knowledgeId}
      ],
    });
    this.logger.log(`Fetched ${articles.length} articles for user with ID: ${userId}`);
    return articles;
  }

  async findOne(id: number, userId: number): Promise<Article> {
    this.logger.log(`Finding article with ID: ${id} for user with ID: ${userId}`);

    const article = await this.articleRepository.findOne({
      where: { article_id: id },
    });
    if (!article) {
      this.logger.error(`Article with ID ${id} not found`);
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    // 检查是否有权限查看该文章
    if (
      article.author_id !== userId 
    ) {
      this.logger.error(`User with ID ${userId} does not have permission to view article with ID ${id}`);
      throw new UnauthorizedException('You do not have permission to view this article');
    }

    this.logger.log(`Found article: ${JSON.stringify(article)}`);
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number): Promise<Article> {
    this.logger.log(`Updating article with ID: ${id} using data: ${JSON.stringify(updateArticleDto)} and user ID: ${userId}`);

    const article = await this.findOne(id, userId);

    // 检查是否有权限更新该文章
    if (article.author_id !== userId) {
      this.logger.error(`User with ID ${userId} does not have permission to update article with ID ${id}`);
      throw new UnauthorizedException('You do not have permission to update this article');
    }

    Object.assign(article, updateArticleDto);
    article.last_modified_at = new Date();

    this.logger.log(`Updated article entity: ${JSON.stringify(article)}`);
    return this.articleRepository.save(article);
  }

  async remove(id: number, userId: number): Promise<void> {
    this.logger.log(`Removing article with ID: ${id} for user with ID: ${userId}`);

    const article = await this.findOne(id, userId);
    if (!article) {
      this.logger.error(`Article with ID ${id} not found`);
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    await this.articleRepository.remove(article);
    this.logger.log(`Removed article with ID: ${id}`);
  }

  private async getUserTeamKnowledgeBaseIds(userId: number): Promise<number[]> {
    // 假设有一个方法来获取用户的团队知识库ID列表
    // 这里可以调用相关的服务或数据库查询
    // 示例：return [1, 2, 3]; // 返回用户的团队知识库ID列表
    return [];
  }

  private async isInSameTeamKnowledgeBase(userId: number, knowledgeBaseId: number): Promise<boolean> {
    // 假设有一个方法来检查用户是否在某个团队知识库中
    // 这里可以调用相关的服务或数据库查询
    // 示例：return true; // 如果用户在团队知识库中返回true
    return false;
  }
}
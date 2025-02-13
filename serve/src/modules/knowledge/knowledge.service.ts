import { Injectable, Inject, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { KNOWLEDGE_REPOSITORY } from '../../constants/common.constants';
import { Knowledge } from './entities/knowledge.entity';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class KnowledgeService {
  constructor(
    @Inject(KNOWLEDGE_REPOSITORY)
    private knowledgeRepository: Repository<Knowledge>,
  ) {}

  private readonly logger = new Logger(KnowledgeService.name);

  async create(createKnowledgeDto: CreateKnowledgeDto,userId:number): Promise<Knowledge> {
    try {
      this.logger.log(`Creating a new knowledge entry with data: ${JSON.stringify(createKnowledgeDto)}`);

      // 创建新的知识实体
      const knowledge = this.knowledgeRepository.create({
        ...createKnowledgeDto,
        created_by:userId
      });

      // 保存知识实体
      const savedKnowledge = await this.knowledgeRepository.save(knowledge);
      this.logger.log(`Created knowledge entity: ${JSON.stringify(savedKnowledge)}`);

      return savedKnowledge;
    } catch (error) {
      this.logger.error(`Error creating knowledge: ${error.message}`, error.stack);
      throw new InternalServerErrorException('An error occurred while creating the knowledge');
    }
  }

  async findAll(userId: number): Promise<Knowledge[]> {
    this.logger.log(`Fetching knowledge entries for user with ID: ${userId}`);

    const knowledgeEntries = await this.knowledgeRepository.find({
      where: [
        { created_by: userId },
      ],
    });
    this.logger.log(`Fetched ${knowledgeEntries.length} knowledge entries for user with ID: ${userId}`);
    return knowledgeEntries;
  }

  async findOne(id: number, userId: number): Promise<Knowledge> {
    this.logger.log(`Finding knowledge entry with ID: ${id} for user with ID: ${userId}`);

    const knowledgeEntry = await this.knowledgeRepository.findOne({
      where: { id },
    });
    if (!knowledgeEntry) {
      this.logger.error(`Knowledge entry with ID ${id} not found`);
      throw new NotFoundException(`Knowledge entry with ID ${id} not found`);
    }

    // 检查是否有权限查看该知识条目
    if (
      knowledgeEntry.created_by !== userId 
    ) {
      this.logger.error(`User with ID ${userId} does not have permission to view knowledge entry with ID ${id}`);
      throw new UnauthorizedException('You do not have permission to view this knowledge entry');
    }
    this.logger.log(`Found knowledge entry: ${JSON.stringify(knowledgeEntry)}`);
    return knowledgeEntry;
  }

  async update(id: number, updateKnowledgeDto: UpdateKnowledgeDto, userId: number): Promise<Knowledge> {
    this.logger.log(`Updating knowledge entry with ID: ${id} using data: ${JSON.stringify(updateKnowledgeDto)} and user ID: ${userId}`);

    const knowledgeEntry = await this.findOne(id, userId);
    Object.assign(knowledgeEntry, updateKnowledgeDto);

    this.logger.log(`Updated knowledge entry: ${JSON.stringify(knowledgeEntry)}`);
    return this.knowledgeRepository.save(knowledgeEntry);
  }

  async remove(id: number, userId: number): Promise<void> {
    this.logger.log(`Removing knowledge entry with ID: ${id} for user with ID: ${userId}`);

    const knowledgeEntry = await this.findOne(id, userId);
    if (!knowledgeEntry) {
      this.logger.error(`Knowledge entry with ID ${id} not found`);
      throw new NotFoundException(`Knowledge entry with ID ${id} not found`);
    }

    await this.knowledgeRepository.remove(knowledgeEntry);
    this.logger.log(`Removed knowledge entry with ID: ${id}`);
  }

  private async getUserTeamIds(userId: number): Promise<number[]> {
    // 假设有一个方法来获取用户的团队ID列表
    // 这里可以调用相关的服务或数据库查询
    // 示例：return [1, 2, 3]; // 返回用户的团队ID列表
    return [];
  }

  private async isInSameTeam(userId: number, teamId: number): Promise<boolean> {
    // 假设有一个方法来检查用户是否在某个团队中
    // 这里可以调用相关的服务或数据库查询
    // 示例：return true; // 如果用户在团队中返回true
    return false;
  }
}
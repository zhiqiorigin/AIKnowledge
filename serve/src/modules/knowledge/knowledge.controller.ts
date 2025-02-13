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
} from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { Knowledge } from './entities/knowledge.entity'; // 假设有一个Knowledge实体类
import { AuthGuard } from '../auth/guard/auth.guard';
import { Logger } from '@nestjs/common';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}
  private readonly logger = new Logger(KnowledgeController.name);

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createKnowledgeDto: CreateKnowledgeDto): Promise<Knowledge | undefined> {
    return this.knowledgeService.create(createKnowledgeDto,req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Knowledge[]> {
    return this.knowledgeService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Knowledge | undefined> {
    const knowledgeId = parseInt(id, 10);
    return this.knowledgeService.findOne(knowledgeId, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKnowledgeDto: UpdateKnowledgeDto, @Request() req): Promise<Knowledge | undefined> {
    const knowledgeId = parseInt(id, 10);
    return this.knowledgeService.update(knowledgeId, updateKnowledgeDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    this.logger.debug(`Deleting knowledge entry with id: ${id}`);
    const knowledgeId = parseInt(id, 10);
    await this.knowledgeService.remove(knowledgeId, req.user.id);
  }
}
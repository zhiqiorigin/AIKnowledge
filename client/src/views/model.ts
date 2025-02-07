interface KnowledgeBase {
  id: string;          // 唯一标识符
  name: string;        // 知识库名称
  description?: string;// 描述
  teamId: string;      // 所属团队ID
  documents: Document[];// 包含的文档列表
  permissions: {
    view: ('public' | 'team' | 'private')// 查看权限
    edit: ('team' | 'owner')           // 编辑权限
  };
}

interface Document {
  id: string;           // 唯一标识符
  title: string;        // 文档标题
  content: string;      // 文档内容
  version: number;      // 版本号
  teamId?: string;      // 所属团队ID（可选）
  knowledgeBaseId?: string;// 所属知识库ID（可选）
  author: User;         // 创建者信息
  createdAt: Date;      // 创建时间
  lastModifiedBy?: User; // 最后修改者信息
  lastModifiedAt?: Date; // 最后修改时间
}

interface User {
  id: string;          // 唯一标识符
  username: string;    // 用户名
  email: string;       // 邮箱地址
  role: 'admin' | 'member'; // 用户角色：管理员或普通成员
  createdAt: Date;     // 注册时间
}

interface Team {
  id: string;          // 唯一标识符
  name: string;        // 团队名称
  description?: string;// 描述
  members: User[];     // 团队成员列表
  createdBy: string;   // 创建者ID
  createdAt: Date;     // 创建时间
  lastModifiedBy?: string; // 最后修改者ID
  lastModifiedAt?: Date;   // 最后修改时间
}

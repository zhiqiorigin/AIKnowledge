import { useState, useEffect } from 'react';
import styles from './ChatInterface.module.scss';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 辅助问题列表
  const assistantQuestions = [
    { category: "💡 建议", questions: ["如何优化React组件性能？", "React项目结构的最佳实践"] },
    { category: "❓ 核心问题", questions: ["什么是React?", "如何使用useState?", "什么是Hooks?", "如何创建一个简单的React应用?", "如何处理异步操作?"] },
    { category: "✍️ 创作助手", questions: ["生成React组件模板代码", "编写一个自定义Hook示例"] },
    { category: "🌪️ 头脑风暴", questions: ["设计一个状态管理方案", "实现动态表单的多种方式"] }
  ];

  // 发送消息
  const handleSubmitMessage = async () => {
    if (!inputText.trim()) return;

    // 添加用户消息到聊天记录
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      setIsLoading(true);

      // 这里你可以替换为实际调用大模型的 API 代码
      // 暂时使用模拟数据
      const aiResponse: Message = {
        id: Date.now(),
        text: `你输入的是：${inputText}\n这是一个模拟回复。在实际应用中，这里应该与真实的大模型 API 对接.`,
        isUser: false,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      // 显示错误提示
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: '抱歉，出现了一些问题，请稍后再试。',
          isUser: false,
        }
      ]);
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };

  // 处理辅助问题点击
  const handleQuestionClick = (question: string) => {
    setInputText(question); // 设置输入框文本为所选问题
    handleSubmitMessage();   // 提交消息
  };

  return (
    <div className={styles.chatInterface}>
      {/* 辅助问题盒子 */}
      {!messages.length && (
        <div className={styles.assistantQuestionsBox}>
          <h3 className={styles.assistantTitle}>Ziky，你好呀！今天我能为你做些什么？</h3>
          <ul className={styles.questionCategories}>
            {assistantQuestions.map((category, index) => (
              <li key={index} className={styles.categorySection}>
                <div className={styles.categoryHeader}>{category.category}</div>
                <ul className={styles.questionList}>
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} onClick={() => handleQuestionClick(question)}>
                      {question}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.chatHistory}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
          >
            <div className={styles.messageContent}>{message.text}</div>
          </div>
        ))}
        {/* 加载状态 */}
        {isLoading && (
          <div className={styles.loading}>
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入你的消息..."
          disabled={isLoading}
        />
        <button onClick={handleSubmitMessage} disabled={isLoading}>
          发送
        </button>
      </div>
    </div>
  );
}




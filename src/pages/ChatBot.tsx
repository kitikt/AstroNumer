import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Minimize2,
} from "lucide-react";
import styles from "@/styles/ChatBot.module.css";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface IChatBot {
  id: string;
  name: string;
  avatar: string;
  description: string;
  color: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

interface Chat {
  botId: string;
  messages: Message[];
}

const ChatBot = () => {
  const [chatBots] = useState<IChatBot[]>([
    {
      id: "1",
      name: "Assistant AI",
      avatar: "🤖",
      description: "Trợ lý AI thông minh",
      color: styles.bgBlue500,
      isOnline: true,
      lastMessage: "Xin chào! Tôi có thể giúp gì cho bạn?",
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: "2",
      name: "Code Helper",
      avatar: "💻",
      description: "Chuyên gia lập trình",
      color: styles.bgGreen500,
      isOnline: true,
      lastMessage: "Bạn cần hỗ trợ code gì không?",
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
    },
    {
      id: "3",
      name: "Language Tutor",
      avatar: "📚",
      description: "Giáo viên ngôn ngữ",
      color: styles.bgPurple500,
      isOnline: false,
      lastMessage: "Hãy luyện tập tiếng Anh nhé!",
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
    },
    {
      id: "4",
      name: "Creative Writer",
      avatar: "✍️",
      description: "Nhà văn sáng tạo",
      color: styles.bgPink500,
      isOnline: true,
      lastMessage: "Tôi có thể giúp bạn viết câu chuyện!",
      lastMessageTime: new Date(Date.now() - 1800000),
      unreadCount: 1,
    },
  ]);

  const [chats, setChats] = useState<{ [key: string]: Chat }>({
    "1": {
      botId: "1",
      messages: [
        {
          id: "1",
          content:
            "Xin chào! Tôi là Assistant AI. Tôi có thể giúp gì cho bạn hôm nay?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    },
  });

  const [activeChatId, setActiveChatId] = useState<string>("1");
  const [inputMessage, setInputMessage] = useState("");
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChatId]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setChats((prev) => ({
      ...prev,
      [activeChatId]: {
        ...prev[activeChatId],
        messages: [...(prev[activeChatId]?.messages || []), newMessage],
      },
    }));

    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage, activeChatId),
        sender: "bot",
        timestamp: new Date(),
      };

      setChats((prev) => ({
        ...prev,
        [activeChatId]: {
          ...prev[activeChatId],
          messages: [...prev[activeChatId].messages, botResponse],
        },
      }));
    }, 1000);
  };

  const getBotResponse = (userMessage: string, botId: string): string => {
    const bot = chatBots.find((b) => b.id === botId);
    const responses = {
      "1": [
        "Tôi hiểu rồi! Bạn có cần tôi giải thích thêm không?",
        "Đó là một câu hỏi hay! Để tôi suy nghĩ...",
        "Tôi sẵn sàng giúp bạn với vấn đề này.",
        "Cảm ơn bạn đã chia sẻ. Tôi có thể hỗ trợ thêm gì không?",
      ],
      "2": [
        "Đây là một vấn đề lập trình thú vị! Bạn đang dùng ngôn ngữ nào?",
        "Tôi có thể giúp bạn debug code này. Hãy show tôi error message.",
        "React TypeScript à? Tôi rất giỏi về chủ đề này!",
        "Hãy thử approach này và cho tôi biết kết quả nhé.",
      ],
      "3": [
        "Great question! Let me help you with your English.",
        "That's a good sentence! Here's how to improve it...",
        "Your pronunciation is getting better! Keep practicing.",
        "Would you like to practice some conversation?",
      ],
      "4": [
        "Ý tưởng tuyệt vời! Hãy cùng phát triển câu chuyện này.",
        "Tôi có thể giúp bạn tạo ra những nhân vật thú vị.",
        "Câu chuyện của bạn có tiềm năng lớn! Tiếp tục đi.",
        "Hãy thử thêm một chút twist vào plot nhé!",
      ],
    };

    const botResponses =
      responses[botId as keyof typeof responses] || responses["1"];
    return botResponses[Math.floor(Math.random() * botResponses.length)];
  };

  const startNewChat = (botId: string) => {
    if (!chats[botId]) {
      const bot = chatBots.find((b) => b.id === botId);
      setChats((prev) => ({
        ...prev,
        [botId]: {
          botId,
          messages: [
            {
              id: Date.now().toString(),
              content: `Xin chào! Tôi là ${bot?.name}. ${bot?.description}. Tôi có thể giúp gì cho bạn?`,
              sender: "bot",
              timestamp: new Date(),
            },
          ],
        },
      }));
    }
    setActiveChatId(botId);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "vừa xong";
    if (minutes < 60) return `${minutes}ph`;
    if (hours < 24) return `${hours}h`;
    return `${days} ngày`;
  };

  const filteredBots = chatBots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeBot = chatBots.find((bot) => bot.id === activeChatId);
  const activeChat = chats[activeChatId];

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div
        className={`${styles.leftSidebar} ${
          isLeftPanelCollapsed ? styles.leftSidebarCollapsed : ""
        }`}
      >
        {/* Header */}
        <div className={styles.header}>
          {!isLeftPanelCollapsed && (
            <>
              <h1 className={styles.headerTitle}>AI Chatbots</h1>
              <div className="flex items-center gap-2">
                <button className={styles.headerButton}>
                  <Plus className={styles.headerIcon} />
                </button>
                <button className={styles.headerButton}>
                  <Settings className={styles.headerIcon} />
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
            className={styles.headerButton}
          >
            <Minimize2
              className={`${styles.headerIcon} ${
                isLeftPanelCollapsed ? styles.headerIconRotate : ""
              }`}
            />
          </button>
        </div>

        {/* Search */}
        {!isLeftPanelCollapsed && (
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Tìm kiếm chatbot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        )}

        {/* Bot List */}
        <div className={styles.botList}>
          {filteredBots.map((bot) => (
            <div
              key={bot.id}
              onClick={() => startNewChat(bot.id)}
              className={`${styles.botItem} ${
                activeChatId === bot.id ? styles.botItemActive : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={styles.botAvatarContainer}>
                  <div className={`${styles.botAvatar} ${bot.color}`}>
                    {bot.avatar}
                  </div>
                  {bot.isOnline && (
                    <div className={styles.botOnlineIndicator}></div>
                  )}
                </div>

                {!isLeftPanelCollapsed && (
                  <div className={styles.botInfo}>
                    <div className="flex items-center justify-between">
                      <h3 className={styles.botName}>{bot.name}</h3>
                      {bot.lastMessageTime && (
                        <span className={styles.botTime}>
                          {formatTime(bot.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    <p className={styles.botDescription}>{bot.description}</p>
                    {bot.lastMessage && (
                      <p className={styles.botLastMessage}>{bot.lastMessage}</p>
                    )}
                    {bot.unreadCount > 0 && (
                      <div className={styles.botUnreadCount}>
                        {bot.unreadCount}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.mainChat}>
        {activeBot && activeChat ? (
          <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <div className={styles.botAvatarContainer}>
                <div className={`${styles.chatAvatar} ${activeBot.color}`}>
                  {activeBot.avatar}
                </div>
                {activeBot.isOnline && (
                  <div className={styles.botOnlineIndicator}></div>
                )}
              </div>
              <div>
                <h2 className={styles.chatName}>{activeBot.name}</h2>
                <p className={styles.chatStatus}>
                  {activeBot.isOnline ? "Đang online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.messageWrapper} ${
                    message.sender === "user" ? styles.messageWrapperUser : ""
                  }`}
                >
                  <div
                    className={`${styles.messageContentWrapper} ${
                      message.sender === "user"
                        ? styles.messageContentWrapperUser
                        : ""
                    }`}
                  >
                    <div
                      className={`${styles.messageAvatar} ${
                        message.sender === "user"
                          ? styles.bgBlue500
                          : activeBot.color
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        activeBot.avatar
                      )}
                    </div>
                    <div
                      className={`${styles.messageContent} ${
                        message.sender === "user"
                          ? styles.messageContentUser
                          : styles.messageContentBot
                      }`}
                    >
                      <p className={styles.messageText}>{message.content}</p>
                      <p
                        className={`${styles.messageTime} ${
                          message.sender === "user"
                            ? styles.messageTimeUser
                            : styles.messageTimeBot
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className={styles.messageInputContainer}>
              <div className={styles.messageInputWrapper}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={`Nhắn tin cho ${activeBot.name}...`}
                  className={styles.messageInput}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className={styles.sendButton}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyChatContainer}>
            <div className={styles.emptyChatContent}>
              <MessageCircle className={styles.emptyChatIcon} />
              <h2 className={styles.emptyChatTitle}>
                Chọn một chatbot để bắt đầu
              </h2>
              <p className={styles.emptyChatText}>
                Chọn một AI chatbot từ danh sách bên trái để bắt đầu cuộc trò
                chuyện
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;

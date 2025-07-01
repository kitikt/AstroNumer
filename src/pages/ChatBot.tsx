import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  MessageCircle,
  Search,
  Settings,
  Minimize2,
} from "lucide-react";
import styles from "@/styles/ChatBot.module.css";
import AddConversationButton from "@/components/AddConversationButton";

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

interface IBotConversation {
  Id: number;
  User1CoreNumber: number;
  User2CoreNumber: number;
  RelationshipType: number;
  RelationshipTypeDescription: string;
  Title?: string;
  LatestMessage?: {
    Id: number;
    ConversationId: number | string;
    Message: string;
    Sender: string;
    CreatedAt: string;
  };
}
export enum RelationshipType {
  BanBe = 1,
  NguoiYeu = 2,
  DongNghiep = 3,
  BoMe = 4,
}

const RelationshipTypeLabels: { [key: number]: string } = {
  [RelationshipType.BanBe]: "Bạn Bè",
  [RelationshipType.NguoiYeu]: "Người Yêu",
  [RelationshipType.DongNghiep]: "Đồng Nghiệp",
  [RelationshipType.BoMe]: "Bố Mẹ",
};

interface Chat {
  botId: string;
  messages: Message[];
  conversationId?: string;
}

const ChatBot = () => {
  const [chatBots, setChatBots] = useState<IChatBot[]>([]);
  const [chats, setChats] = useState<{ [key: string]: Chat }>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    User1CoreNumber: 1,
    User2FullName: "",
    User2DateOfBirth: new Date().toISOString().slice(0, 16),
    RelationshipType: 0,
    RelationshipTypeDescription: "",
    Title: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSendingRef = useRef<boolean>(false);

  const USER_ID = localStorage.getItem("userId") || "";
  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = localStorage.getItem("token");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChatId]);

  useEffect(() => {
    const fetchBotConversations = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/Chat/bot-conversations/${USER_ID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        if (data.Success) {
          const bots: IChatBot[] = data.Data.map(
            (conv: IBotConversation, index: number) => {
              const conversationId = conv.Id.toString();
              return {
                id: conversationId,
                name:
                  conv.Title && conv.Title !== "string"
                    ? conv.Title
                    : conv.RelationshipTypeDescription ||
                      `Bot ${conv.User2CoreNumber}`,
                avatar: "🤖",
                description:
                  conv.RelationshipTypeDescription || "Trò chuyện với bot",
                color: styles[`bgColor${(index % 4) + 1}`] || styles.bgBlue500,
                isOnline: true,
                lastMessage: conv.LatestMessage?.Message
                  ? conv.LatestMessage.Message.substring(0, 20) + "..."
                  : "Chưa có tin nhắn",
                lastMessageTime: conv.LatestMessage?.CreatedAt
                  ? new Date(conv.LatestMessage.CreatedAt)
                  : undefined,
                unreadCount: 0,
              };
            }
          );

          // Remove duplicates based on conversation ID
          const uniqueBots = bots.filter(
            (bot, index, self) =>
              index === self.findIndex((b) => b.id === bot.id)
          );

          setChatBots(uniqueBots);
        }
      } catch {
        // Handle error silently
      }
    };
    fetchBotConversations();
  }, [USER_ID, TOKEN, API_URL]);

  function formatBotResponse(rawText: string): string {
    const sections = ["Phân tích", "Nhận xét", "Lời khuyên", "Tóm tắt"];

    // Bỏ dấu **
    let formatted = rawText.replace(/\*\*/g, "");

    // Thêm 2 dòng trắng trước mỗi tiêu đề
    sections.forEach((section) => {
      const regex = new RegExp(`${section}:`, "gi");
      formatted = formatted.replace(regex, `\n\n${section}:`);
    });

    // Xóa khoảng trắng đầu cuối và return
    return formatted.trim();
  }

  const sendMessageToBot = async (message: string) => {
    try {
      const conversationId = chats[activeChatId!]?.conversationId;
      if (!conversationId) {
        console.error("Không tìm thấy conversationId.");
        return;
      }
      // Set user message first
      setChats((prev) => {
        const currentChat = prev[activeChatId!] || {
          botId: activeChatId!,
          messages: [],
          conversationId,
        };

        return {
          ...prev,
          [activeChatId!]: {
            ...currentChat,
            messages: [
              ...currentChat.messages,
              {
                id: Date.now().toString(),
                content: message,
                sender: "user",
                timestamp: new Date(),
              },
            ],
          },
        };
      });
      setInputMessage("");
      scrollToBottom();

      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/api/Chat/analyze-relationship/${conversationId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(message),
        }
      );

      const data = await response.json();
      if (data.Success) {
        const botResponse = formatBotResponse(data.Data);

        setChats((prev) => {
          const currentChat = prev[activeChatId!] || {
            botId: activeChatId!,
            messages: [],
            conversationId,
          };

          const newMessages = [
            ...currentChat.messages,
            {
              id: (Date.now() + 1).toString(),
              content: botResponse,
              sender: "bot" as "user" | "bot",
              timestamp: new Date(),
            },
          ];

          return {
            ...prev,
            [activeChatId!]: {
              ...currentChat,
              messages: newMessages,
            },
          };
        });
      }
    } catch {
      // Handle error silently
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const fetchConversationHistory = async (conversationId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/Chat/conversation/${conversationId}?page-index=1&page-size=10`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      if (data.Success) {
        const messages = data.Data.Data.map(
          (msg: {
            Id: number;
            Message: string;
            Sender: string;
            CreatedAt: string;
          }) => ({
            id: msg.Id.toString(),
            content: msg.Message,
            sender: msg.Sender as "user" | "bot",
            timestamp: new Date(msg.CreatedAt),
          })
        );
        setChats((prev) => ({
          ...prev,
          [conversationId]: {
            botId: conversationId,
            messages,
            conversationId,
          },
        }));
      }
    } catch {
      // Handle error silently
    }
  };

  const startNewChat = async (botId: string) => {
    // Lấy conversationId từ chatBots (danh sách các cuộc trò chuyện)
    const bot = chatBots.find((b) => b.id === botId);
    const conversationId = bot?.id;
    setActiveChatId(botId);
    if (conversationId) {
      await fetchConversationHistory(conversationId);
    }
  };

  const sendMessage = async () => {
    if (
      !inputMessage.trim() ||
      !activeChatId ||
      isLoading ||
      isSendingRef.current
    )
      return;

    isSendingRef.current = true;
    try {
      await sendMessageToBot(inputMessage);
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleCreateConversation = async () => {
    // Validate required fields
    if (!formData.User1CoreNumber || formData.User1CoreNumber <= 0) {
      alert("Vui lòng nhập chỉ số chủ đạo hợp lệ (phải lớn hơn 0)");
      return;
    }

    if (!formData.User2FullName.trim()) {
      alert("Vui lòng nhập họ tên người đối thoại");
      return;
    }

    if (!formData.RelationshipType) {
      alert("Vui lòng chọn loại quan hệ");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Chat/${USER_ID}`, {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          User1CoreNumber: formData.User1CoreNumber,
          User2FullName: formData.User2FullName,
          User2DateOfBirth: formData.User2DateOfBirth,
          RelationshipType: formData.RelationshipType,
          RelationshipTypeDescription: formData.RelationshipTypeDescription,
          Title: formData.Title,
        }),
      });
      const data = await response.json();
      if (data.Success) {
        // Refresh the bot conversations list to get the new conversationId
        const refreshResponse = await fetch(
          `${API_URL}/api/Chat/bot-conversations/${USER_ID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          if (refreshData.Success) {
            // Find the newly created conversation by matching the title
            const newConversation = refreshData.Data.find(
              (conv: IBotConversation) =>
                conv.Title === formData.Title ||
                conv.RelationshipTypeDescription ===
                  formData.RelationshipTypeDescription
            );

            if (newConversation) {
              const conversationId = newConversation.Id.toString();

              setChatBots((prev) => {
                // Check if bot already exists to avoid duplicates
                const existingBot = prev.find(
                  (bot) => bot.id === conversationId
                );
                if (existingBot) {
                  return prev;
                }

                return [
                  {
                    id: conversationId,
                    name:
                      formData.Title ||
                      formData.RelationshipTypeDescription ||
                      `Bot ${formData.User2FullName}`,
                    avatar: "🤖",
                    description:
                      formData.RelationshipTypeDescription ||
                      "Trò chuyện với bot",
                    color:
                      styles[`bgColor${(prev.length % 4) + 1}`] ||
                      styles.bgBlue500,
                    isOnline: true,
                    unreadCount: 0,
                  },
                  ...prev,
                ];
              });
              setChats((prev) => ({
                ...prev,
                [conversationId]: {
                  botId: conversationId,
                  messages: [],
                  conversationId: conversationId,
                },
              }));
              setIsModalOpen(false);
              setFormData({
                User1CoreNumber: 1,
                User2FullName: "",
                User2DateOfBirth: new Date().toISOString().slice(0, 16),
                RelationshipType: 0,
                RelationshipTypeDescription: "",
                Title: "",
              });
            }
          }
        }
      } else {
        if (data.Errors && data.Errors.length > 0) {
          alert(`Lỗi: ${data.Errors.join(", ")}`);
        } else {
          alert("Có lỗi xảy ra khi tạo cuộc trò chuyện");
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Lỗi kết nối mạng. Vui lòng thử lại.");
    }
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

  const activeBot = activeChatId
    ? chatBots.find((bot) => bot.id === activeChatId)
    : null;
  const activeChat = activeChatId ? chats[activeChatId] : null;

  useEffect(() => {
    if (activeChatId && activeChat && activeChat.conversationId) {
      fetchConversationHistory(activeChat.conversationId);
    }
  }, [activeChat?.conversationId]);

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <div
        className={`${styles.leftSidebar} ${
          isLeftPanelCollapsed ? styles.leftSidebarCollapsed : ""
        }`}
      >
        <div className={styles.header}>
          {!isLeftPanelCollapsed && (
            <>
              <h1 className={styles.headerTitle}>AI Chatbots</h1>
              <div className="flex items-center gap-2">
                <AddConversationButton onClick={() => setIsModalOpen(true)} />
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
                    <p className={styles.botDescription}>
                      {bot.lastMessage || "Chưa có tin nhắn"}
                    </p>
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
                          ? styles.bgBlue100
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
                      {message.sender === "bot" ? (
                        formatBotResponse(message.content)
                          .split("\n")
                          .map((line, i) => <p key={i}>{line}</p>)
                      ) : (
                        <p>{message.content}</p>
                      )}
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
              {isLoading && (
                <div className={styles.loadingIndicator}>
                  <div className={styles.loadingSpinner}></div>
                  <span className={styles.loadingText}>Đang xử lý...</span>
                </div>
              )}
            </div>

            <div className={styles.messageInputContainer}>
              <div className={styles.messageInputWrapper}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Nhắn tin cho ${activeBot.name}...`}
                  className={styles.messageInput}
                />
                <button
                  onClick={handleSendClick}
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

      {/* Enhanced Modal Form */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContentEnhanced}>
            <h2 className={styles.modalTitleEnhanced}>
              Tạo cuộc trò chuyện mới
            </h2>
            <div className={styles.modalFormEnhanced}>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>
                  Chỉ số chủ đạo của bạn:
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={formData.User1CoreNumber}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setFormData({
                      ...formData,
                      User1CoreNumber: value > 0 ? value : 1,
                    });
                  }}
                  className={styles.modalInputEnhanced}
                  placeholder="Nhập chỉ số chủ đạo (1-99)"
                />
              </div>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>
                  Họ tên người đối thoại:
                </label>
                <input
                  type="text"
                  value={formData.User2FullName}
                  onChange={(e) =>
                    setFormData({ ...formData, User2FullName: e.target.value })
                  }
                  className={styles.modalInputEnhanced}
                  placeholder="Nhập họ tên"
                />
              </div>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>
                  Ngày sinh người đối thoại:
                </label>
                <input
                  type="datetime-local"
                  value={formData.User2DateOfBirth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      User2DateOfBirth: e.target.value,
                    })
                  }
                  className={styles.modalInputEnhanced}
                  placeholder="Chọn ngày sinh"
                />
              </div>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>Loại quan hệ:</label>
                <select
                  value={formData.RelationshipType}
                  onChange={(e) => {
                    const selectedValue = parseInt(e.target.value);
                    setFormData({
                      ...formData,
                      RelationshipType: selectedValue,
                      RelationshipTypeDescription:
                        RelationshipTypeLabels[selectedValue],
                    });
                  }}
                  className={styles.modalInputEnhanced}
                >
                  <option value="">-- Chọn loại quan hệ --</option>
                  <option value={1}>Bạn Bè</option>
                  <option value={2}>Người Yêu</option>
                  <option value={3}>Đồng Nghiệp</option>
                  <option value={4}>Bố Mẹ</option>
                </select>
              </div>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>Mô tả quan hệ:</label>
                <input
                  type="text"
                  value={formData.RelationshipTypeDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      RelationshipTypeDescription: e.target.value,
                    })
                  }
                  className={styles.modalInputEnhanced}
                  placeholder="Nhập mô tả quan hệ"
                />
              </div>
              <div className={styles.formGroupEnhanced}>
                <label className={styles.labelEnhanced}>Tiêu đề:</label>
                <input
                  type="text"
                  value={formData.Title}
                  onChange={(e) =>
                    setFormData({ ...formData, Title: e.target.value })
                  }
                  className={styles.modalInputEnhanced}
                  placeholder="Nhập tiêu đề"
                />
              </div>
            </div>
            <div className={styles.modalActionsEnhanced}>
              <button
                onClick={handleCreateConversation}
                className={styles.modalButtonEnhanced}
              >
                Lưu
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.modalButtonCancelEnhanced}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

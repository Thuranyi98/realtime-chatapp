"use client";

import UserSidebar from "../components/UserSidebar";
import ConversationPanel from "../components/ConversationPanel";
import { ChatHeader } from "../components/ChatHeader";
import { useChatPage } from "../lib/hooks/useChatPage";

export default function ChatPage() {
  const chat = useChatPage();

  return (
    <main className="page-grid flex h-screen min-h-0 flex-col">
      <ChatHeader
        status={chat.status}
        onLogout={chat.logout}
      />

      <section className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {chat.role === "ADMIN" && (
          <UserSidebar
            users={chat.users}
            selectedUserId={chat.selectedUserId}
            onSelect={chat.setSelectedUserId}
            presence={chat.presence}
            collapsed={chat.sidebarCollapsed}
            onToggle={() => chat.setSidebarCollapsed(!chat.sidebarCollapsed)}
          />
        )}

        <ConversationPanel
          scrollRef={chat.scrollRef}
          messages={chat.messages}
          currentUserId={chat.userId}
          input={chat.input}
          setInput={chat.setInput}
          onSend={chat.sendMessage}
          isDisconnected={chat.status !== "connected"}
          typingUserId={chat.typingUserId}
          typingName={chat.role === "ADMIN" ? chat.users.find((u) => u.id === chat.typingUserId)?.email : chat.admins.find((a) => a.id === chat.typingUserId)?.email}
          role={chat.role}
          token={chat.token}
          roomId={chat.roomId}
          selectedUserId={chat.selectedUserId}
          setSelectedUserId={chat.setSelectedUserId}
          admins={chat.admins}
          isHistoryLoading={chat.isHistoryLoading}
          connectionStatus={chat.status}
          isSelectedPeerConnected={chat.isSelectedPeerConnected}
        />
      </section>
    </main>
  );
}

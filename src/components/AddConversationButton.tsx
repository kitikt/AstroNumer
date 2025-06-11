import React from "react";
import { Plus } from "lucide-react";
import styles from "@/styles/ChatBot.module.css";

interface AddConversationButtonProps {
  onClick: () => void;
}

const AddConversationButton: React.FC<AddConversationButtonProps> = ({
  onClick,
}) => {
  return (
    <button className={styles.headerButton} onClick={onClick}>
      <Plus className={styles.headerIcon} />
    </button>
  );
};

export default AddConversationButton;

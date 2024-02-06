import React, { ReactNode } from "react";
import styles from "./CustomModal.module.css";

interface CustomModalProps {
  isVisible: boolean;
  onHide: () => void;
  children: ReactNode;
  width?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onHide, children, width }) => {
  if (!isVisible) return null;

  const modalStyle = {
    width: width || "auto",
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={modalStyle}>
        <button className={styles.closeButton} onClick={onHide}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;

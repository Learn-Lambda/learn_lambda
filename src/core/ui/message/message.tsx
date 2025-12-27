import React, { useState, useEffect } from "react";


type ShowMessageFunc = (text: string, duration?: number) => void;
export class MessageService {
  private static listeners: ShowMessageFunc[] = [];

  static subscribe(listener: ShowMessageFunc) {
    this.listeners.push(listener);
    return () => {
      // отписка
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  static show(text: string, duration?: number) {
    this.listeners.forEach((listener) => listener(text, duration));
  }
}


export const Message: React.FC = () => {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    // Подписываемся на вызовы из MessageService
    const unsubscribe = MessageService.subscribe((text, duration = 3000) => {
      setMsg(text);
      setTimeout(() => setMsg(null), duration);
    });
    return () => unsubscribe();
  }, []);

  if (!msg) return null;

  return <div style={styles.container}>{msg}</div>;
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 5,
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    zIndex: 9999,
    fontSize: 16,
  },
};
 

import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const myFrame = document.getElementById("payment-frame");

  if (!myFrame) {
    console.error("Payment frame not found!");
    return;
  }

  // Функция для обработки сообщений
  const handleMessage = (event) => {
    if (event.origin !== "https://philipp-moriss.github.io") return;
    if (event.data?.type === "payment-success") {
      console.log("Payment data received:", event.data.payload);
      console.log("Amount:", event.data.payload.amount);
      console.log("Card:", event.data.payload.cardNumber);
      console.log("Expiry:", event.data.payload.expiryDate);
    }
  };

  // Добавляем обработчик
  window.addEventListener("message", handleMessage);

  // Отправляем инициализацию после загрузки фрейма
  myFrame.addEventListener("load", () => {
    console.log("Frame loaded, sending init message");
    myFrame.contentWindow.postMessage("init-payment", "http://localhost:5174");
  });

  // Убираем обработчик при размонтировании (если это SPA)
  return () => {
    window.removeEventListener("message", handleMessage);
  };
});

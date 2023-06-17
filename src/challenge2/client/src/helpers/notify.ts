import toast from "react-hot-toast";

const notify = (type: "success" | "error", message: string) => {
  if (type === "success") {
    toast.success(message, {
      duration: 3000,
      style: {
        border: "1px solid #2C8488",
        padding: "10px 25px",
        color: "#2C8488",
      },
      iconTheme: {
        primary: "#2C8488",
        secondary: "#ffffff",
      },
    });
  }
  if (type === "error") {
    toast.error(message, {
      duration: 3000,
      style: {
        border: "1px solid #be1e2d",
        padding: "10px 25px",
        color: "#be1e2d",
      },
      iconTheme: {
        primary: "#be1e2d",
        secondary: "#ffffff",
      },
    });
  }
};

export default notify;

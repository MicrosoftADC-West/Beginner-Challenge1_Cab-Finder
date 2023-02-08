type HeaderProps = {
  content: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
};
export default function Header(props: HeaderProps) {
  const { content, size, color } = props;

  const fontSize = () => {
    switch (size) {
      case "xs":
        return "15px";
      case "sm":
        return "20px";
      case "md":
        return "30px";
      case "lg":
        return "45px";
      case "xl":
        return "60px";
      default:
        return "1.7rem";
    }
  };
  return (
    <h1
      className="header"
      style={{
        fontSize: fontSize(),
        color: color ?? "rgb(51, 51, 51)",
      }}
    >
      {content}
    </h1>
  );
}

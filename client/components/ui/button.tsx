type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-black";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2";

  return (
    <button className={`${variantClass} ${sizeClass} rounded`}>
      {children}
    </button>
  );
}

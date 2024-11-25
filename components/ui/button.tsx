type ButtonProps = {
  children: React.ReactNode;
  variant?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = (props: ButtonProps) => {
  const {
    children,
    variant = "bg-black",
    onClick = () => {},
    type = "button",
  } = props; //props and default
  return (
    <>
      <button
        className={`h-8 px-4 font-semibold rounded-md ${variant} text-white`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
export default Button;

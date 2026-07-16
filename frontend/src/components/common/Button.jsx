import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={`
        rounded-full
        bg-gradient-to-r
        from-violet-600
        to-indigo-500
        px-6
        py-3
        text-white
        font-medium
        shadow-lg
        transition-all
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
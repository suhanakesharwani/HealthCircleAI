// import { motion } from "framer-motion";

// const GlassCard = ({ children, className = "" }) => {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       transition={{ duration: 0.25 }}
//       className={`
//         rounded-[28px]
//         bg-white/70
//         backdrop-blur-xl
//         shadow-[0_20px_60px_rgba(15,23,42,0.08)]
//         p-6
//         ${className}
//       `}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default GlassCard;

export default function GlassCard({ children, className = "", ...rest }) {
    return (
        <div className={`hc-glass ${className}`} {...rest}>
            {children}
        </div>
    );
}
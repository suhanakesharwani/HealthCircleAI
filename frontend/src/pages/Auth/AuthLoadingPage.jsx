import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/user";

function AuthLoadingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkUser() {
            try {
                const user = await getCurrentUser();

                if (user.has_family) {
                    navigate("/dashboard");
                } else {
                    navigate("/family/setup");
                }
            } catch {
                navigate("/login");
            }
        }

        checkUser();
    }, []);

    return <h2>Loading...</h2>;
}

export default AuthLoadingPage;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { HeartPulse } from "lucide-react";
// import { getCurrentUser } from "../../api/user";

// function AuthLoadingPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function checkUser() {
//       try {
//         const user = await getCurrentUser();

//         if (user.has_family) {
//           navigate("/dashboard");
//         } else {
//           navigate("/family/setup");
//         }
//       } catch {
//         navigate("/login");
//       }
//     }

//     checkUser();
//   }, [navigate]);

//   return (
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFFDFB]">

//       {/* Background Gradient */}
//       <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl" />
//       <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/60 blur-3xl" />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-[340px] rounded-[30px] bg-white/70 backdrop-blur-xl shadow-xl p-10 text-center"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white"
//         >
//           <HeartPulse size={30} />
//         </motion.div>

//         <h1 className="display-font text-3xl">
//           HealthCircle AI
//         </h1>

//         <p className="mt-3 text-gray-500">
//           Preparing your healthcare workspace...
//         </p>

//         <div className="mt-8 h-2 overflow-hidden rounded-full bg-gray-200">
//           <motion.div
//             className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
//             initial={{ x: "-100%" }}
//             animate={{ x: "100%" }}
//             transition={{
//               duration: 1.4,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default AuthLoadingPage;
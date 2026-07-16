import { motion } from "framer-motion";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">

      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-violet-200 blur-[120px]" />

      <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-sky-200 blur-[120px]" />

      <div className="container-custom">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:.7}}
          >

            <span className="rounded-full bg-violet-100 px-4 py-2 text-sm text-violet-700">
              AI Powered Family Healthcare
            </span>

            <h1 className="display-font mt-8 text-6xl leading-tight">

              Healthcare
              <br/>

              designed for
              <br/>

              modern families.

            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-lg">

              Upload reports, monitor medicines, build healthy habits
              and let AI explain everything in seconds.

            </p>

            <div className="mt-10 flex gap-4">

              <Button>
                Start Free
              </Button>

              <Button className="bg-white text-black">
                Learn More
              </Button>

            </div>

          </motion.div>

          <motion.div
            initial={{opacity:0,scale:.9}}
            animate={{opacity:1,scale:1}}
            transition={{duration:.8}}
          >

            <div className="mx-auto h-[650px] w-[330px] rounded-[50px] bg-white shadow-2xl p-5">

              <div className="h-full rounded-[40px] bg-gradient-to-br from-violet-100 via-white to-emerald-100 flex items-center justify-center">

                Phone Mockup

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
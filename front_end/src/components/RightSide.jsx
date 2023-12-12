import React from "react";
import { motion } from "framer-motion";
import MyColaps from "./MyColap";

const RightSide = ({toggleTodo , remaining , total}) => {
  return (
    <div className="md:flex lg:col-span-2  h-full justify-start items-start m-8 my-10 ">
      <div className="">
        <motion.h1
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
          className="text-white md:text-5xl text-3xl  ml-2 md:ml-0  hover:text-black drop-shadow-md hover:drop-shadow-xl cursor-pointer lg:text-7xl mr-8 font-bold"
        >
          TaskFlow
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
          className=" text-white/90  hover:text-black/90 drop-shadow-md cursor-pointer md:text-2x lg:text-4xl ml-2 mr-8 font-bold"
        >
          A React-Powered Todo Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.9 } }}
          className=" text-white/80 my-5 font-extrabold hover:text-black/50 ml-2 md:text-xs  lg:text-base"
        >
          Total remaining are <span className="text-black my-5 hover:text-white/50">{remaining}</span>  from {total}
        </motion.p>
        <div className="colapss ml-2 my-2">
          <MyColaps toggleTodo = {toggleTodo} />
        </div>
      </div>
    </div>
  );
};

export default RightSide;

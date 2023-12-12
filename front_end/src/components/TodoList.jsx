import { motion } from "framer-motion";
import { useRef } from "react";

const TodosList = ({ todos, toggleTodo, removeSingle , getSingleFun }) => {
  // const checkboxRefs = todos.map(() => useRef(null));

  const handleCheckboxChange = (index, id) => {
    var temptodo = [...todos];
    var todoSingle = temptodo.find((todo) => {
      return todo._id === id;
    });
    // console.log(todoSingle);
    todoSingle.completed = !todoSingle.completed;
    // setTodo();

    toggleTodo(todos[index]._id, temptodo);
  };

  return (
    // <div className="flex justify-center mb-10">
      <div className=" ">
        {todos.length !== 0 &&
          todos?.map((data, index) => {
            return (
              <motion.div href="#" key={index} className="group block max-w-xs mx-auto rounded-lg p-6 bg-white  shadow-lg my-2 space-y-3 hover:bg-red-400 hover:ring-red-400">
                <div className="flex items-center space-x-3">
                  <input
                    id={`bordered-checkbox-$${index}`}
                    type="checkbox"
                    value=""
                    onChange={(e) => {
                      e.target.checked = !e.target.checked;
                      return handleCheckboxChange(index, data._id);
                    }}
                    // ref={checkboxRefs[index]}
                    checked={data.completed}
                    name="bordered-checkbox"
                    className="h-6 w-6 stroke-red-400 group-hover:stroke-white accent-white text-red-500"
                  />

                  <h3 className="text-red-400 group-hover:text-white text-sm font-semibold">
                    {data.title}
                  </h3>
                </div>
                <p className="text-slate-500 group-hover:text-white text-sm">
                  {!data.description ? "No description" : data.description}
                </p>
                <p>
                  <button onClick={() => removeSingle(data._id)}>
                    <i className="group-hover:text-white text-red-400 fa-solid fa-eraser"></i>
                  </button> &nbsp;
                  <button onClick={() => getSingleFun(data._id)}>
                    <i className="group-hover:text-white text-red-400  fa-solid fa-pen-to-square"></i>
                  </button>
                </p>
              </motion.div>
            );
          })}
      </div>
    // </div>
  );
};

export default TodosList;

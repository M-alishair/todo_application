import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToalContainer from "../ToalContainer";
import TodosList from "./TodoList";
import TodoContext from "../Context/TodoContext";
import RightSide from "./RightSide";

// import ContextApp from "../Context/TodoContex"

const inputClsx =
  "hover:bg-red-400 max-sm:text-sm hover:text-white max-md:bg-red-400 max-md:text-white p-2 px-4 shadow-lg rounded";

function MainComponent() {
  var [todo, setTodo] = useState([]);

  const {
    handleDeleteMany,
    data,
    handlePostRequest,
    handlePutRequest,
    handleDeleteRequest,
    GetSingle,
  } = useContext(TodoContext);

  console.log(data);

  // useEffect for get item form localStorage ......
  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem("items"));
    if (data.length !== 0) {
      setTodo(data);
    }
  }, [data]);

  // function toggleTodo or passit as a prop......

  var toggleTodo = (id, temptodo) => {
    handlePutRequest(id);

    toast("Todo Status Changed", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTodo(temptodo);
  };

  // use of useRef for targit a tag ......
  var inputRefDiscription = useRef();
  var inputRef = useRef();
  var inputRefhidden = useRef();

  var addTodo = async (e) => {
    e.preventDefault();
    var name = inputRef.current.value;
    var discription = inputRefDiscription.current.value;
    var id = inputRefhidden.current.value;
    if (name) {
      const result = await handlePostRequest(name, discription, id);
      if (result.success) {
        if (result.update) {
          console.log(result.data);
        }

        toast("ToDo added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast("Name Required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    inputRef.current.value = null;
    inputRefDiscription.current.value = null;
    inputRefhidden.current.value = null;
  };

  // clearTodo function ...Main...

  var clearTodo = () => {
    handleDeleteMany();
    var newList = todo.filter((todo) => !todo.completed);
    setTodo(newList);
  };

  // remove a single todo ...Main.

  var removeSingle = (id) => {
    handleDeleteRequest(id);
    var newList = todo.filter((todo) => todo._id != id);
    setTodo(newList);
  };

  var getSingleFun = async (id) => {
    var result = await GetSingle(id);
    console.log(result);
    inputRef.current.value = result.title;
    inputRefDiscription.current.value = result.description;
    inputRefhidden.current.value = result._id;
  };

  return (
    <>
      <ToalContainer />

      <div className="flex justify-center">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  ">
            <div className="md:order-first order-last flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              className="shadow-xl py-10 m-5 max-w-md bg-white p-5 rounded-xl"
            >
              <form onSubmit={addTodo}>
                <div className=" text-gray-400-500 flex items-center flex-col my-4">
                  {/* <div className="p-0 m-0 w-fu"> */}
                  <label
                    className="block my-2 text-xl uppercase text-red-400 font-semibold tracking-wide "
                    htmlFor="todo_input"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="border text-lg p-2 max-w-xs  w-full rounded-lg focus:outline focus:outline-red-500 "
                    ref={inputRef}
                    id="todo_input"
                    placeholder="Title"
                  />
                  <br />
                  {/* hidden field id ..... / */}
                  <input
                    type="hidden"
                    className=""
                    ref={inputRefhidden}
                    id="id_todo_input"
                  />
                  <label
                    className="block my-2 text-xl uppercase text-red-400 font-semibold tracking-wide "
                    htmlFor="dis"
                  >
                    Discription
                  </label>
                  <textarea
                    name="dis"
                    id="dis"
                    ref={inputRefDiscription}
                    className="border text-lg p-2 max-w-xs rounded-lg w-full focus:outline focus:outline-red-500"
                    placeholder="Discription"
                    cols="30"
                    rows="5"
                  ></textarea>
                  <br />
                  {/* </div> */}
                  <div className="flex space-x-4">
                    <button type="submit" className={`${inputClsx}`}>
                      Add todo
                    </button>
                    <button
                      type="button"
                      className={`${inputClsx}`}
                      onClick={clearTodo}
                    >
                      Clear Done ToDo
                    </button>
                  </div>
                  <br />
                </div>
              </form>

              <TodosList
                todos={todo}
                toggleTodo={toggleTodo}
                getSingleFun={getSingleFun}
                removeSingle={removeSingle}
              />
            </motion.div>
            </div>

            <RightSide  toggleTodo = {toggleTodo} total={todo.length} remaining={todo.filter(todo => !todo.completed).length} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComponent;

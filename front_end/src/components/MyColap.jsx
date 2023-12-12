import React, { useContext, useState } from "react";
import { motion } from "framer-motion";

import {
  Collapse,
  Button,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import TodoContext from "../Context/TodoContext";
import { toast } from "react-toastify";





const MyColaps = ({ toggleTodo }) => {
  var [searchTodo, setSearchTodo] = useState([]);

  const { GetSearch } = useContext(TodoContext);

  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);

  var getSerchData = async (event) => {
    event.preventDefault();
    var data = event.target.seaech.value;
    var result = await GetSearch(data);
    if (result.length == 0) {
      toast("no data found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setSearchTodo(result);
    }
    // console.log(result);
  };

  const handleCheckboxChange = (index, id) => {
    var temptodo = [...searchTodo];
    var todoSingle = temptodo.find((todo) => {
      return todo._id === id;
    });
    // console.log(todoSingle);
    todoSingle.completed = !todoSingle.completed;
    // setTodo();

    toggleTodo(temptodo[index]._id, temptodo);
  };

  return (
    <>
      <Button onClick={toggleOpen}>Search Todo</Button>
      <Collapse open={open}>
        <Card className="my-4">
          <CardBody>
            <form onSubmit={getSerchData}>
              <div className="relative flex w-full ">
                <Input
                  type="Text"
                  label="Search Title"
                  className="pr-20"
                  name="seaech"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  size="sm"
                  type="submit"
                  color="gray"
                  className="!absolute right-1 top-1 rounded"
                >
                  Search
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </Collapse>
      <div className="grid lg:grid-cols-2 gap-2">
        {searchTodo.length !== 0 &&
          searchTodo?.map((data, index) => {
            return (
              <motion.div
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0, transition: { duration:  index  } }}
                href="#"
                key={index}
                className="group block  rounded-lg p-6 bg-white  shadow-lg my-2 space-y-3 hover:bg-red-400 hover:ring-red-400"
              >
                <div className="flex items-center space-x-3">
                  <input
                    id={`bordered-checkbox2-${index}`}
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
              </motion.div>
            );
          })}
      </div>
    </>
  );
};

export default MyColaps;

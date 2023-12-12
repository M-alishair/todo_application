import React, { createContext, useEffect, useState } from "react";
import TodoContext from "./TodoContext";

const ContextApp = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const host = "https://todo-app-backend-wheat-pi.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/api/getTodo`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // console.log(result.data)
        setData(result.data);
        setLoading(false);
        return result.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // post request .....

  const handlePostRequest = async (title, description , id ) => {
    try {
      const response = await fetch(`${host}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          id : id,
          title: title,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log("POST request successful:", result);

      if (result.update) {
        console.log(data)
        console.log(result.data._id + "hellow")
         
        var tempvar = [...data];
        var newVar = data.find((data)=>
        { return data._id === result.data._id }
         )
        newVar.title = result.data.title;
        newVar.description = result.data.description;

        setData(tempvar);
      } else {
        setData((todo) => [
            result.data,
            ...todo,
          ]);
      }
      return result;
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };


  const handlePutRequest = async (id) => {
    try {
      const response = await fetch(`${host}/api/setTodoSingle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Put request successful:", result);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };


  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`${host}/api/deleteTodoSingle/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("DELETE request successful:", result);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };



  const handleDeleteMany = async () => {
    try {
      const response = await fetch(`${host}/api/deleteTodoCompleted`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("DELETE request successful:", result);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };



  const GetSingle = async (id) => {
    try {
      const response = await fetch(`${host}/api/getTodoSingle/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("DELETE request successful:", result);
      return result.data;
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };


  const GetSearch = async (data) => {
    try {
      const response = await fetch(`${host}/api/search/${data}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("DELETE request successful:", result);
      return result.data;
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };


  return (
    <TodoContext.Provider value={{ data, handlePostRequest ,handlePutRequest,handleDeleteRequest,handleDeleteMany, GetSingle ,GetSearch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default ContextApp;

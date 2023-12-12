const express = require('express')
const app = express.Router()
const TodoModel = require('../models/TodoModel')



app.get('/', async (req, res) => {
    try {
        

        res.status(200).json({
            data: "todo",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })

    }
})


app.get('/getTodo', async (req, res) => {
    try {
        
        var todo = await TodoModel.find({})

        res.status(200).json({
            data: todo,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })

    }
})




// // respond with "hello world" when a GET request is made to the homepage
// app.post('/add', async (req, res) => {
//     var { title, description , id } = req.body;

    
//     if (id !== "") {
        
//         console.log("update")
//         try {

//             var todo = await TodoModel.findById(id)

//             todo.title = title;
//             todo.description = description;
            
//             await todo.save();

//             res.status(200).json({
//                 data: todo,
//                 update : true,
//                 success: true
//             })
            
//         } catch (error) {

//             res.status(500).json({
//                 message: error.message,
//                 success: false
//             })
            
//         }
        
//     } else {

//         console.log("insert")

//         try {

//             var todo = await TodoModel.create({
//                 title, description
//             })
    
//             res.status(200).json({
//                 data: todo,
//                 update : false,
//                 success: true
//             })
//         } catch (error) {
//             res.status(500).json({
//                 message: error.message,
//                 success: false
//             })
    
//         }
        
//     }
    
// })






// app.get('/search/:id', async (req, res) => {
//     const forSearch = req.params.id;;
  
//     try {
//       // Use a regular expression for case-insensitive search
//       const regex = new RegExp(forSearch, 'i');
//       const todos = await TodoModel.find({ title: regex });
  
//       res.status(200).json({
//         data: todos,
//         success: true,
//       });
//     } catch (error) {
//       console.error('Error searching todos:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal Server Error',
//       });
//     }
//   });





// app.get('/getTodoSingle/:id', async (req, res) => {
//     try {
        
//         var id = req.params.id;
//         // var filter = {_id:data}
        
//         var todo = await TodoModel.findById(id);

//         res.status(200).json({
//             data: todo,
//             success: true
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })

//     }
// })


// app.put('/setTodoSingle/:id', async (req, res) => {
//     try {
//         //   var  {title , description } =  req.body ; 

        
//         var id = req.params.id;
//         // var filter = {_id:data}
        
//         var todo = await TodoModel.findById(id)
        
//         todo.completed = !todo.completed;

//         await todo.save();
//         res.status(200).json({
//             data: todo,
//             success: true
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })

//     }
// })




// app.delete('/deleteTodoSingle/:id', async (req, res) => {
//     try {

//         var id = req.params.id;
        
//         var todo = await TodoModel.findByIdAndDelete(id)
        
//         res.status(200).json({
//             data: todo,
//             success: true
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })

//     }
// })



// app.delete('/deleteTodoCompleted', async (req, res) => {
//     try {

//         // var id = req.params.id;

//         var todo = await TodoModel.deleteMany({ completed: true })
        
//         res.status(200).json({
//             data: todo,
//             success: true
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })

//     }
// })







module.exports = app;
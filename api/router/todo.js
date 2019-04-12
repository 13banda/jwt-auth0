const express = require('express');
const router = express.Router();

// get database connection pool
const pool = require('./../db')


// define get Todo List router
// QUERY example /todo?limit=10&fromId=20

router.get('/',function (req,res) {
  let limit = req.query.limit  || 15 ;
  let offset = req.query.fromId || 0;
  const userId = req.user.sub
  pool.query('SELECT * FROM  todo where user_id = $1 ORDER BY id LIMIT $2 OFFSET $3 ',[userId,limit,offset],function(err,result){
    if(err){ res.status(500).send(err.toString());}
    else{
      res.json({
        payload: result.rows
      });
    }
  });
})

// define Todo add router
// api example ./todo/add/(todo item text)
router.get('/add/:todoItem',function (req,res) {
   const todoItem = req.params.todoItem;
   const userId = req.user.sub
    pool.query("INSERT into todo (todo_text,user_id) VALUES ($1,$2)",[todoItem,userId],function(err,result){
        if(err){ res.status(500).send(err.toString());}
        else{
            res.json({"message":`todo '${todoItem}' added sucessfully`});
      }
  });
})


// define Todo update router
// api example ./todo/update/(todo id)/(todo item text)
router.get('/update/:todoId/:todoItem',function (req,res) {
   const todoId = req.params.todoId;
   const todoItem = req.params.todoItem;
   const userId = req.user.sub

    pool.query("UPDATE todo set todo_text = $1,updated_at = now() WHERE id = $2 AND user_id = $3",[todoItem,todoId,userId],function(err,result){
        if(err){ res.status(500).send(err.toString());}
        else{
            res.json({
              id: todoId,
              message:`todo updated sucessfully`,
            });
      }
  });
})

// define Todo complete router
// api example ./todo/complete/(todo id)
router.get('/complete/:todoId',function (req,res) {
   const todoId = req.params.todoId;
   const userId = req.user.sub
    pool.query("UPDATE todo set complete = true ,updated_at = now() WHERE id = $1 AND user_id = $2 ",[todoId,userId],function(err,result){
        if(err){ res.status(500).send(err.toString());}
        else{
            res.json({
              id: todoId,
              message:`todo complete sucessfully`,
            });
      }
  });
})

// define Todo delete router
// api example ./todo/delete/(todo id)
router.get('/delete/:todoId',function (req,res) {
   const todoId = req.params.todoId;
   const userId = req.user.sub

    pool.query("DELETE from todo WHERE id = $1 AND user_id = $2",[todoId,userId],function(err,result){
        if(err){ res.status(500).send(err.toString());}
        else{
            res.json({
              id: todoId,
              message:`todo deleted sucessfully`,
            });
      }
  });
})

module.exports = router;

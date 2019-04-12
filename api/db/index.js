const { Pool } = require('pg');
const config = require('../conf')

const pool = new Pool(config.db)

// db pool connection
pool.connect((err,client)=>{
  if(err){
    console.error(err);
    return;
  }
  console.log('database connection pool created');
})

module.exports = {
  query : (text,params,callback) =>{
    return pool.query(text,params,(err,res)=>{
      callback(err,res)
    })
  }
}

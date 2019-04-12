
import React, { Component } from 'react';
import config from '../api-config'

class Home extends Component {
  state = {
    todoValue: '',
    editTODOID:null,
    todoList:[],
  }
  handleTodoChange = (event)=>{
    this.setState({todoValue:event.target.value})
  }
  handleAddTodo = ()=>{
    const { todoValue } = this.state;
    if(todoValue.trim() === ''){
      alert('Please Enter valid TODO')
      return;
    }
    fetch(config.url.addTODO(todoValue.trim()),{
      method:"GET"
    })
    .then(response => response.json())
    .then((result) => {
      if(result.message){
        this.getTodoList()
        this.setState({todoValue:''})
        alert("YOUR TODO added !")
      }
    })
  }
  getTodoList = ()=>{
    fetch(config.url.getTODOList,{
      method:"GET"
    })
    .then(response => response.json())
    .then((result) => {
      console.log(result);
      if(result.payload){
        this.setState({todoList:result.payload.reverse()})
      }
    })
  }
  handleTODODelete = (todoId)=>{
    fetch(config.url.deleteTODO(todoId),{
      method:"GET"
    })
    .then(response => response.json())
    .then((result) => {
      if(result.message){
        this.getTodoList()
        alert("YOUR TODO deleted !")
      }
    })
  }
  handleTODOUpdate = ()=>{
    const { editTODOID, todoValue } = this.state
    fetch(config.url.updateTODO(editTODOID,todoValue),{
      method:"GET"
    })
    .then(response => response.json())
    .then((result) => {
      if(result.message){
        this.setState({editTODOID:null,todoValue:''})
        this.getTodoList()
        alert("YOUR TODO updated!")
      }
    })
  }
  handleUpdateCancel = ()=>{
    this.setState({editTODOID:null,todoValue:''})
  }
  handleTODOEdit = (todoId,todoItem)=>{
    this.setState({editTODOID:todoId,todoValue:todoItem})
  }
  handleTODOComplete = (todoId)=>{
    fetch(config.url.completeTODO(todoId),{
      method:"GET"
    })
    .then(response => response.json())
    .then((result) => {
      if(result.message){
        this.getTodoList()
      }
    })
  }
  componentDidMount(){
    // intercept the fetch
    require('../request-intercept')
    this.getTodoList()
  }
  render() {
    const { todoValue,todoList,editTODOID } = this.state;
    const completeTODOList = todoList.filter((item) => item.complete)
    const activeTODOList = todoList.filter((item) => !item.complete)
    return (
      <main>
        <div>
        <input className="todo-input" placeholder="Enter TODO here..." value={todoValue} onChange={this.handleTodoChange}/>
        {!editTODOID && <button onClick={this.handleAddTodo}>Add TODO</button>}
        {editTODOID && <button  onClick={this.handleTODOUpdate}>Update</button>}
        {editTODOID && <button className="margin-small-left" onClick={this.handleUpdateCancel}>Cancel</button>}
        </div>
        <br/>
        <h3 className="margin-small-top">Active TODO List</h3>
        <ol>
          {activeTODOList.map((item,index)=>{
            return <li className="todo-list" key={index}>
              {item.todo_text}
              <button className="float-right margin-small-left" onClick={()=>this.handleTODODelete(item.id)}>Delete</button>
              <button className="float-right margin-small-left" onClick={()=>this.handleTODOEdit(item.id,item.todo_text)}>Edit</button>
              <button className="float-right " onClick={()=>this.handleTODOComplete(item.id)}>complete</button>
            </li>
          })}
          {
            activeTODOList.length === 0 && <li style={{textAlign:'center'}}> No TODO Active</li>
          }
        </ol>
          { completeTODOList.length > 0 && (
            <React.Fragment>
            <h3>CompleteTODO List</h3>
            <ol>
              {completeTODOList.filter((item) => item.complete).map((item,index)=>{
                return <li className="todo-list" key={index}>
                  {item.todo_text}
                  <button className="float-right margin-small-left" onClick={()=>this.handleTODODelete(item.id)}>Delete</button>
                </li>
              })}
            </ol>
            </React.Fragment>
        )}
        </main>
    );
  }
}

export default Home;

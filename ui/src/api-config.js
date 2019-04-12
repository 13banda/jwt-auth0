const apiEndPoint = 'http://localhost:3000'
const config = {
  url :{
    getTODOList : `${apiEndPoint}/todo`,
    addTODO: item=>`${apiEndPoint}/todo/add/${item}`,
    deleteTODO : todoId => `${apiEndPoint}/todo/delete/${todoId}`,
    updateTODO : (todoId,todoItem) => `${apiEndPoint}/todo/update/${todoId}/${todoItem}`,
    completeTODO : todoId => `${apiEndPoint}/todo/complete/${todoId}`,
  }
}

export default config

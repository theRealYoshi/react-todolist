/* global React */

var TodoList = React.createClass({
  getInitialState: function(){
    window.TodoStore.fetch();
    return {todos: window.TodoStore.all()};
  },
  _todosChanged: function(){
    this.setState({todos: window.TodoStore.all()});
  },
  componentDidMount: function(){
    window.TodoStore.addChangedHandler(this._todosChanged);
    window.TodoStore.fetch();
    debugger;
  },
  componentWillUnmount: function(){
    window.TodoStore.removeChangedHandler(this._todosChanged);
    window.TodoStore.fetch();
  },
  render: function(){
    return(
      <div>
        <ul>
          {
            this.state.todos.map(function(todo){
              return <li key={todo.id}>{todo.title}</li>
            })
          }
        </ul>
      </div>
    );
  }
});

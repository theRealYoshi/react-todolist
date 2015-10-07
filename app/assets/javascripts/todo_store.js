(function(root) {
  'use strict';

  if (typeof root.TodoStore === 'undefined'){
    root.TodoStore = {};
  }
  var _callbacks = [];
  var _todos = [];

  var TodoStore = root.TodoStore;

  TodoStore.changed = function(){
    for (var i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  };

  TodoStore.addChangedHandler = function(callback){
    _callbacks.push(callback);
  };

  TodoStore.removeChangedHandler = function(callback){
    var idx = _callbacks.indexOf(callback);
    if (idx !== -1){
      _callbacks.splice(idx, 1);
    }
  };

  TodoStore.all = function(){
    return _todos.slice();
  };

  TodoStore.fetch = function(){
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: "json",
      success: function(data){
        _todos = data;
      }
    });
    TodoStore.changed();
  };

  TodoStore.create = function(todo){
    $.post('/api/todos', todo)
      .done(function (data) {
        _todos.push(data);
        console.log(_todos);
      });
    TodoStore.changed();
  };

  TodoStore.delete = function(id) {
    $.ajax({
      url: "/api/todos/" + id, // string interpolate id?
      type: "DELETE",
      data: {
        id: id
      },//
      success: function(responseData){
        removeTodos(responseData);
      }
    });
    TodoStore.changed();
  };

  TodoStore.toggleDone = function(id){
    var found = findId(id);
    var doneRes;
    if (found.done === true){
      doneRes = false;
    } else {
      doneRes = true;
    }
    $.ajax({
      url: "/api/todos/" + id, // string interpolate id?
      type: "PATCH",
      data: {
        todo: {
          done: doneRes
        }
      },//
      success: function(responseData){
        console.log(responseData);
      }
    });
    TodoStore.changed();
  };

  var removeTodos = function(data){
    var idx = findId(data.id);
    if (idx !== -1){
      _todos.splice(idx, 1);
    }
  };

  var findId = function(id){
    var found = _todos.filter(function(el){
      return el.id === id;
    });
    return found[0];
  };


}(this));

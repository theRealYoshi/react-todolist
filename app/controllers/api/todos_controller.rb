class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def show
  end

  def create
    @todo = Todo.create!(todo_params)
    render json: @todo
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy!
    render json: @todo
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)
    render json: @todo
  end

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end

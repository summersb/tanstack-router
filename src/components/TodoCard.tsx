import React from 'react';
import type {Todo} from "@/types";

type TodoCardProps = {
  todo: Todo
}

const TodoCard = (props: TodoCardProps): React.ReactElement => {
  const {todo} = props

  return (
    <div
      className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 border-gray-200 dark:border-gray-700">
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        Title: {todo.title}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Completed: {todo.completed ? 'True' : 'False'}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        User Id: {todo.userId}
      </div>
    </div>
  );
};

export default TodoCard;

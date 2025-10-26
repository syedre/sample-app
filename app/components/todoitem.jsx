import { Pencil, Trash2Icon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export function ItemDemo({ todos, onEdit, onDelete }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 pl-2 pb-2">
      {todos &&
        todos?.map((todo) => (
          <Item key={todo.id} variant="outline">
            <ItemContent>
              <ItemTitle className={"capitalize"}>{todo.name}</ItemTitle>
              <ItemDescription>{todo.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Trash2Icon
                className="h-4 w-4"
                onClick={() => onDelete(todo.id)}
              />

              <Pencil className="h-4 w-4" onClick={() => onEdit(todo)} />
            </ItemActions>
          </Item>
        ))}
    </div>
  );
}

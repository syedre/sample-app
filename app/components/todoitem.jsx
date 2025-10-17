import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export function ItemDemo({ todos, onEdit }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {todos.map((todo) => (
        <Item key={todo.id} variant="outline">
          <ItemContent>
            <ItemTitle className={"capitalize"}>{todo.name}</ItemTitle>
            <ItemDescription>{todo.description}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm" onClick={() => onEdit(todo)}>
              Edit
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}

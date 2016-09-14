import assert from "assert";
import Todos from "../lib/todos";
import { append, last, head } from "ramda";

describe("Todos", () => {
  let events;
  let ids;
  let times;

  const collectIdAndTime = (events) => {
    ids = append(last(events).id, ids);
    times = append(last(events).timestamp, times);
  }

  beforeEach(() => {
    events = [];
    ids = [];
    times = [];
  });

  it("starts with an empty todo list", () => {
    const state = Todos.of(events).state();
    assert.deepEqual(state, { todos: [] });
  });

  it("adds new todos", () => {
    const state =
      Todos
        .of(events)
        .dispatch({ type: "addTodo", text: "wash dishes" }, collectIdAndTime)
        .dispatch({ type: "addTodo", text: "walk the dog" }, collectIdAndTime)
        .state();

    assert.deepEqual(
      state,
      {
        todos: [
          {
            id: ids[0],
            text: "wash dishes",
            completed: false,
            timestamp: times[0]
          },
          {
            id: ids[1],
            text: "walk the dog",
            completed: false,
            timestamp: times[1]
          }
        ]
      }
    );
  });

  it("toggles an existing todo", () => {
    const state =
      Todos
        .of(events)
        .dispatch({ type: "addTodo", text: "wash dishes" }, collectIdAndTime)
        .dispatch({ type: "addTodo", text: "walk the dog" }, collectIdAndTime)
        .dispatch({ type: "toggleTodo", id: head(ids) })
        .state();

    assert.deepEqual(
      state,
      {
        todos: [
          {
            id: ids[0],
            text: "wash dishes",
            completed: true,
            timestamp: times[0]
          },
          {
            id: ids[1],
            text: "walk the dog",
            completed: false,
            timestamp: times[1]
          }
        ]
      }
    );
  });
});


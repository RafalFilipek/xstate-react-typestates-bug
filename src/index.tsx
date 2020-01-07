import React from "react";
import { createMachine, interpret } from "xstate";
import { useMachine } from "@xstate/react";

interface User {
  name: string;
}

interface Context {
  user?: User;
}

type Event = { type: "show" } | { type: "hide" };

type State =
  | { value: "visible"; context: { user: User } }
  | { value: "hidden"; context: { user: undefined } };

const m = createMachine<Context, Event, State>({
  initial: "visible",
  context: { user: undefined },
  states: { visible: {}, hidden: {} }
});

export const App = () => {
  const [current, send] = useMachine(m);

  // User | undefined
  current.context.user;

  if (current.matches("visible")) {
    // User | undefined, should be User
    current.context.user.name;
  }

  if (current.matches("hidden")) {
    // User | undefined, should be undefined
    current.context.user;
  }

  return null;
};

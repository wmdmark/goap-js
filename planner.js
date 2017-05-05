import { merge } from "lodash/fp/object";
import PriorityQueue from "fastpriorityqueue";

class Node {
  constructor(parent, cost, state, action) {
    this.cost = cost;
    this.parent = parent;
    this.state = merge({}, state);
    this.key = action ? action.key : null;
    this.action = action;
  }
}

const mapActions = actions => {
  actions = merge({}, actions)
  return Object.keys(actions).map(key => {
    return { ...actions[key], key };
  });
};

const buildGraph = (parent, leaves, actions, goal) => {
  actions.forEach(action => {
    if (action.condition(parent.state)) {
      let nextState = action.effect(merge({}, parent.state));
      const cost = parent.cost + action.cost(nextState);
      const node = new Node(parent, cost, nextState, action);
      if (goal.validate(parent.state, nextState)) {
        leaves.add(node);
      } else {
        const subset = actions.filter(a => a.key !== action.key);
        return buildGraph(node, leaves, subset, goal);
      }
    }
  });
  return leaves;
};

const getPlanFromLeaf = (node, goal) => {
  const plan = [];
  const cost = node.cost;
  while (node) {
    if (node.action) plan.unshift(node.action);
    node = node.parent;
  }
  return {
    cost,
    goal,
    actions: plan.map(n => n.key)
  };
};

export const createPlan = (state, actions, goal) => {
  const root = new Node(null, 0, state, null);
  const leaves = new PriorityQueue((a, b) => a.cost < b.cost);
  buildGraph(root, leaves, mapActions(actions), goal);
  if (!leaves.isEmpty()) return getPlanFromLeaf(leaves.poll(), goal);
  return null;
};

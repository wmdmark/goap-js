import { createPlan } from "../planner";

import * as sim1 from "./sim1"
import * as sim2 from "./sim2"

const logPlan = (plan,i)=> {
  if (!plan)
    return
  console.log(`-- Best plan(${plan.cost}) for ${plan.goal.label} --`)
  plan.actions.map( (a,i)=> console.log(`${i+1}) ${a}`) )
}

it("can plan actions", () => {
  const plan = createPlan(sim1.initialState, sim1.actions, sim1.goals.collectWood);
  expect(plan).toBeTruthy();
  logPlan(plan)

  const plan2 = createPlan(sim2.initialState, sim2.actions, sim2.goals.killEnemy);
  expect(plan2).toBeTruthy();
  logPlan(plan2)

  let hideState = sim2.initialState
  hideState.enemy.visible = true
  const plan3 = createPlan(hideState, sim2.actions, sim2.goals.hide);
  expect(plan3).toBeTruthy();
  logPlan(plan3)
});

### What is this?

Good question. This is a simple implementation of Goal-Oriented Action Planning (G.O.A.P.) in JavaScript. 

### What can I do with this?

If you're making a game with NPC characters that you want to appear realistic and smart, the GOAP can be a greate option. 

##### Example

Given the following world state, goals and actions:

```javascript
export const worldState = {
  axe_available: true,
  player: {
    axe_equipped: false,
    wood: 0
  }
};

export const actions = {
  chopWood: {
    condition: s => s.player.axe_equipped,
    effect: s => {
      s.player.wood++;
      return s;
    },
    cost: s => 2
  },
  getAxe: {
    condition: s => !s.player.axe_equipped && s.axe_available,
    effect: s => {
      s.player.axe_equipped = true;
      return s;
    },
    cost: s => 2
  },
  gatherWood: {
    condition: s => true,
    effect: s => {
      s.player.wood++;
      return s;
    },
    cost: s => 5
  }
};

export const goals = {
  collectWood: {
    label: "Collect Wood",
    validate: (prevState, nextState) => {
      return nextState.player.wood > prevState.player.wood;
    }
  }
};

```

The GOAP Planner will create the following plan:

```json
{
  "cost": 4,
  "goal": {
    "label": "Collect Wood"
  },
  "actions": [
    "getAxe",
    "chopWood"
  ]
}
```

### Further reading

Check out the following resource:

* [FACING YOUR F.E.A.R](http://aiandgames.com/facing-your-fear/)
* [Goal Oriented Action Planning for a Smarter AI](https://gamedevelopment.tutsplus.com/tutorials/goal-oriented-action-planning-for-a-smarter-ai--cms-20793)
* [Goal-Oriented Action Planning](http://alumni.media.mit.edu/~jorkin/goap.html)

### Running the code

1. Install the dependencies `npm init` or `yarn`
2. Run the test `npm run test` or `yarn test`


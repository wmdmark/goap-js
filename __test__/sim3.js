import { merge } from "lodash/fp/object";
import { sample } from "lodash/fp";
import { createPlan } from "../planner";

export const characterState = {
  energy: 10,
  social_score: 0,
  mbti: "INTP",
  target: []
};

export const findTarget = ({character, characters}) => {
  const candidates = characters.filter(
    c => c.target.length === 0 && c.id !== character.id
  );
  // TODO: if no candidates, depending on personality, should join a group or go off alone
  return sample(candidates);
};

export const characterActions = {
  findConversation: {
    condition: s => {
      return s.character.target.length === 0;
    },
    effect: s => {
      const target = findTarget(s)
      console.log("found target: ", target.name)
      if (target) {
        s.character.target.push({id: target.id, name: target.name});
        target.target.push({id: s.character.id, name: s.character.name});
      } else {
        s.social_score--
        s.energy--
      }
    },
    cost: s => {
      return s.character.mbti[0] === "I" ? 5 : 1;
    }
  },
  lurk: {
    condition: s => !findTarget(s),
    effect: s => {
      s.character.energy--;
      s.character.social_score--;
    },
    cost: s=> 1,
  }
};

export const goals = {
  makeFriends: {
    label: "Make Friends",
    validate: (prevState, nextState) => {
      return (
        nextState.character.social_score > prevState.character.social_score
      );
    }
  },
  joinConversation: {
    label: "Join conversation",
    validate: (prevState, nextState) => {
      return (
        nextState.character.target.length > prevState.character.target.length
      );
    }
  }
};

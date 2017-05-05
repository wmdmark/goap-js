export const initialState = {
  player: {
    weapon_equipped: false,
    bullets: 0,
    clips: 1
  },
  enemy: {
    visible: false,
    alive: true
  }
};

export const actions = {
  equipWeapon: {
    condition: s => !s.player.weapon_equipped,
    effect: s => {
      s.player.weapon_equipped = true;
      return s;
    },
    cost: s => 2
  },
  reload: {
    condition: s => s.player.weapon_equipped && s.player.clips > 0,
    effect: s => {
      s.player.bullets += 6;
      return s;
    },
    cost: s => 2
  },
  fire: {
    condition: s =>
      s.enemy.visible === true &&
      s.player.weapon_equipped &&
      s.player.bullets > 0,
    effect: s => {
      s.player.bullets--;
      s.enemy.alive = false;
      return s;
    },
    cost: s => 2
  },
  useTurret: {
    condition: s => s.enemy.visible,
    effect: s => {
      s.enemy.alive = false;
      return s;
    },
    cost: s => 10
  },
  knifeAttack: {
    condition: s => s.enemy.visible,
    effect: s => {
      s.enemy.alive = false;
      return s;
    },
    cost: s => 12
  },
  scout: {
    condition: s => !s.enemy.visible,
    effect: s => {
      s.enemy.visible = true;
      return s;
    },
    cost: s => 1
  },
  hide: {
    condition: s => true,
    effect: s => {
      s.enemy.visible = false;
      return s;
    },
    cost: s => 1
  }
};

export const goals = {
  killEnemy: {
    label: "Kill Enemy",
    validate: (prevState, nextState) => {
      return nextState.enemy.alive === false;
    }
  },
  hide: {
    label: "Hide",
    validate: (prev, next) => {
      return next.enemy.visible === false;
    }
  }
};

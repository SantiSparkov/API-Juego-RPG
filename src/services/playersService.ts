import { Player, PlayerSkills } from '../models';
import { PlayersRepo } from '../repositories/playersRepo';
import { v4 as uuidv4 } from 'uuid';

function baseSkills(): PlayerSkills {
  return { mining: 1, woodcutting: 1, crafting: 1 };
}

export function createPlayer(name: string): Player {
  const player: Player = {
    id: uuidv4(),
    name,
    level: 1,
    experience: 0,
    skills: baseSkills(),
    inventory: [],
    createdAt: new Date()
  };
  PlayersRepo.create(player);
  return player;
}

export function getPlayer(id: string): Player | undefined {
  return PlayersRepo.getById(id);
}

export function updatePlayerStats(
  id: string,
  updates: { experience?: number; level?: number; skills?: Partial<PlayerSkills> }
): Player | undefined {
  const player = PlayersRepo.getById(id);
  if (!player) return undefined;
  const next: Player = {
    ...player,
    ...('experience' in updates ? { experience: updates.experience! } : {}),
    ...('level' in updates ? { level: updates.level! } : {}),
    ...('skills' in updates ? { skills: { ...player.skills, ...updates.skills! } } : {})
  };
  PlayersRepo.update(id, next);
  return next;
}



import { Player } from '../models';
import { PlayersRepo } from '../repositories/playersRepo';
import { LOCATIONS } from '../repositories/staticData';
import { addToInventory } from '../utils/inventory';

function roll(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gainExperience(player: Player, amount: number): Player {
  let experience = player.experience + amount;
  let level = player.level;
  while (experience >= level * 100) {
    experience -= level * 100;
    level += 1;
  }
  return { ...player, experience, level };
}

export function gatherResources(playerId: string, locationId: string): Player | undefined {
  const player = PlayersRepo.getById(playerId);
  if (!player) return undefined;
  const location = LOCATIONS.find(l => l.id === locationId);
  if (!location) throw Object.assign(new Error('Ubicación inválida'), { status: 400 });

  let next = { ...player };
  let gainedExp = 0;
  for (const yieldItem of location.yields) {
    const skillBonus = location.skill === 'mining' ? player.skills.mining : player.skills.woodcutting;
    const chance = Math.min(1, yieldItem.baseChance + skillBonus * 0.01);
    if (Math.random() <= chance) {
      const qty = roll(yieldItem.minQuantity, yieldItem.maxQuantity);
      next.inventory = addToInventory(next.inventory, {
        itemId: yieldItem.itemId,
        name: yieldItem.name,
        quantity: qty,
        rarity: yieldItem.rarity
      });
      gainedExp += qty * 2;
    }
  }
  next = gainExperience(next, gainedExp);
  PlayersRepo.update(playerId, next);
  return next;
}



import { PlayersRepo } from '../repositories/playersRepo';
import { RECIPES } from '../repositories/staticData';
import { addToInventory, hasMaterials, removeFromInventory } from '../utils/inventory';
import { Player, Recipe } from '../models';

function findRecipeById(recipeId: string): Recipe | undefined {
  return RECIPES.find(r => r.id === recipeId);
}

function applyExperience(player: Player, exp: number): Player {
  let experience = player.experience + exp;
  let level = player.level;
  while (experience >= level * 100) {
    experience -= level * 100;
    level += 1;
  }
  const skills = { ...player.skills, crafting: player.skills.crafting + Math.max(1, Math.floor(exp / 10)) };
  return { ...player, experience, level, skills };
}

export function craftItem(playerId: string, recipeId: string): Player {
  const player = PlayersRepo.getById(playerId);
  if (!player) throw Object.assign(new Error('Jugador no encontrado'), { status: 404 });
  const recipe = findRecipeById(recipeId);
  if (!recipe) throw Object.assign(new Error('Receta no encontrada'), { status: 400 });
  if (!hasMaterials(player.inventory, recipe.materials)) {
    throw Object.assign(new Error('Materiales insuficientes'), { status: 400 });
  }

  // Quitar materiales
  let nextInv = player.inventory;
  for (const m of recipe.materials) {
    const res = removeFromInventory(nextInv, m.itemId, m.quantity);
    if (!res.ok) {
      throw Object.assign(new Error('Error al descontar materiales'), { status: 500 });
    }
    nextInv = res.inventory;
  }

  // Agregar resultado
  nextInv = addToInventory(nextInv, { itemId: recipe.result.itemId, name: recipe.name, quantity: recipe.result.quantity });
  let next = applyExperience({ ...player, inventory: nextInv }, recipe.experienceGain);
  PlayersRepo.update(playerId, next);
  return next;
}



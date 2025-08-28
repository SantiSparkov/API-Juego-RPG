import { Player } from '../models';

const players = new Map<string, Player>();

export const PlayersRepo = {
  create(player: Player): Player {
    players.set(player.id, player);
    return player;
  },
  getById(id: string): Player | undefined {
    return players.get(id);
  },
  update(id: string, updates: Partial<Player>): Player | undefined {
    const existing = players.get(id);
    if (!existing) return undefined;
    const updated: Player = { ...existing, ...updates };
    players.set(id, updated);
    return updated;
  },
  all(): Player[] {
    return Array.from(players.values());
  }
};



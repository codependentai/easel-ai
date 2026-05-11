import Database from 'better-sqlite3';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const DB_PATH = join(__dirname, '..', 'data', 'easel.db');

// Ensure data directory exists
mkdirSync(join(__dirname, '..', 'data'), { recursive: true });

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
db.exec(schema);

// ---- Runtime migrations (forward-safe for existing DBs) ----
function columnExists(table: string, column: string): boolean {
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return rows.some((r) => r.name === column);
}
if (!columnExists('presets', 'type')) {
  db.exec(`ALTER TABLE presets ADD COLUMN type TEXT NOT NULL DEFAULT 'character'`);
}

export type PresetType = 'character' | 'style';

export type Preset = {
  id: string;
  name: string;
  version: number;
  parent_id: string | null;
  type: PresetType;
  body: string;
  reference_image_path: string | null;
  use_count: number;
  created_at: number;
  updated_at: number;
  archived: number;
};

export type Folder = {
  id: string;
  name: string;
  created_at: number;
};

export type Task = {
  id: string;
  kind: string;
  prompt: string;
  preset_id: string | null;
  parent_task_id: string | null;
  aspect_ratio: string;
  variant_count: number;
  quality: string;
  reference_image_path: string | null;
  folder_id: string | null;
  favorite: number;
  trashed: number;
  status: string;
  error: string | null;
  created_at: number;
};

export type Variant = {
  id: string;
  task_id: string;
  idx: number;
  image_path: string;
  width: number | null;
  height: number | null;
  created_at: number;
};

export function newId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${rand}`;
}

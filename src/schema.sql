-- easel schema

CREATE TABLE IF NOT EXISTS presets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  parent_id TEXT,
  type TEXT NOT NULL DEFAULT 'character', -- 'character' | 'style'
  body TEXT NOT NULL,
  reference_image_path TEXT,
  use_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  archived INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (parent_id) REFERENCES presets(id)
);

CREATE INDEX IF NOT EXISTS idx_presets_name ON presets(name);
CREATE INDEX IF NOT EXISTS idx_presets_parent ON presets(parent_id);

CREATE TABLE IF NOT EXISTS folders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'image_generation', -- image_generation | remix | edit
  prompt TEXT NOT NULL,
  composed_prompt TEXT,
  preset_id TEXT,
  parent_task_id TEXT,
  aspect_ratio TEXT NOT NULL,
  variant_count INTEGER NOT NULL,
  quality TEXT NOT NULL DEFAULT 'medium', -- low | medium | high
  reference_image_path TEXT,
  folder_id TEXT,
  favorite INTEGER NOT NULL DEFAULT 0,
  trashed INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | succeeded | failed
  error TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (preset_id) REFERENCES presets(id),
  FOREIGN KEY (parent_task_id) REFERENCES tasks(id),
  FOREIGN KEY (folder_id) REFERENCES folders(id)
);

CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_folder ON tasks(folder_id);
CREATE INDEX IF NOT EXISTS idx_tasks_favorite ON tasks(favorite);
CREATE INDEX IF NOT EXISTS idx_tasks_trashed ON tasks(trashed);

CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  idx INTEGER NOT NULL, -- position within the task (0, 1, 2, ...)
  image_path TEXT NOT NULL, -- relative to data/images/
  width INTEGER,
  height INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE INDEX IF NOT EXISTS idx_variants_task ON variants(task_id);

-- Many-to-many join between tasks and presets, with position for composition order.
CREATE TABLE IF NOT EXISTS task_preset_refs (
  task_id TEXT NOT NULL,
  preset_id TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (task_id, preset_id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (preset_id) REFERENCES presets(id)
);

CREATE INDEX IF NOT EXISTS idx_task_preset_refs_task ON task_preset_refs(task_id);
CREATE INDEX IF NOT EXISTS idx_task_preset_refs_preset ON task_preset_refs(preset_id);

import type { AppData, Exercise, Program } from './types';

const makeExercise = (name: string, muscle: string): Exercise => ({ id: crypto.randomUUID(), name, muscle, notes: '' });
const program = (name: string, list: [string, string][]): Program => ({ id: crypto.randomUUID(), name, exercises: list.map(([n, m]) => makeExercise(n, m)) });

export const starterPrograms: Program[] = [
  program('Push', [['Bench Press', 'Chest'], ['Incline Dumbbell Press', 'Chest'], ['Shoulder Press', 'Shoulders'], ['Lateral Raise', 'Shoulders'], ['Triceps Pushdown', 'Triceps']]),
  program('Pull', [['Pull Up', 'Back'], ['Lat Pulldown', 'Back'], ['Barbell Row', 'Back'], ['Cable Row', 'Back'], ['Dumbbell Curl', 'Biceps']]),
  program('Legs', [['Squat', 'Quads'], ['Leg Press', 'Quads'], ['Romanian Deadlift', 'Hamstrings'], ['Leg Curl', 'Hamstrings'], ['Calf Raise', 'Calves']]),
  program('Arms', [['Barbell Curl', 'Biceps'], ['Hammer Curl', 'Biceps'], ['Skull Crusher', 'Triceps'], ['Overhead Triceps Extension', 'Triceps']])
];

const key = 'pro-fit-data-v1';
const legacyKeys = ['peakrep-data-v1', 'ironlog-data-v1'];
export const emptyData = (): AppData => ({ programs: starterPrograms, history: [], profile: { name: '', photo: '', age: '', bodyWeight: '', targetWeight: '', height: '', goal: 'Build muscle', theme: 'dark' }, weightHistory: [], coachCheckIns: [], bodyScans: [] });
export const loadData = (): AppData => { try { const raw = JSON.parse(localStorage.getItem(key) || legacyKeys.map((legacyKey) => localStorage.getItem(legacyKey)).find(Boolean) || '') as Partial<AppData>; const defaults = emptyData(); return { ...defaults, ...raw, profile: { ...defaults.profile, ...(raw.profile || {}) }, weightHistory: raw.weightHistory || [], coachCheckIns: raw.coachCheckIns || [], bodyScans: raw.bodyScans || [] }; } catch { return emptyData(); } };
export const saveData = (data: AppData) => localStorage.setItem(key, JSON.stringify(data));

import { generateHours } from "../utils/utils";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const START_TIME = 10;

export const FINISH_TIME = 15;

export const HOURS = generateHours(START_TIME, FINISH_TIME);

export const PARTICIPANTS = ["Anna", "Maria", "Bob", "Alex"];

export const PARTICIPANT_OPTIONS = [
  { value: "Anna", label: "Anna 👩‍🦱" },
  { value: "Maria", label: "Maria 🦄" },
  { value: "Bob", label: "Bob 👦" },
  { value: "Alex", label: "Alex 😎" },
];

export const TIME_OPTIONS = [
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
];

export const DAY_OPTIONS = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
];

export const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Anna", label: "Anna 👩‍🦱" },
  { value: "Maria", label: "Maria 🦄" },
  { value: "Bob", label: "Bob 👦" },
  { value: "Alex", label: "Alex 😎" },
];
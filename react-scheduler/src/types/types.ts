type TOption = {
  value: string;
  label: string;
}

export type TEvent = {
  eventName: string;
  participants: TOption[];
  day: TOption;
  time: TOption;
  id: string;
};
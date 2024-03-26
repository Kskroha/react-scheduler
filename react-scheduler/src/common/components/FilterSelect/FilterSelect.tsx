import { FC } from "react";
import { setActiveFilter } from "../../../features/schedule/scheduleSlice";
import { useAppDispatch } from "../../hooks/hooks";
import Select, {type SingleValue} from "react-select";

export const FilterSelect: FC = () => {
  const dispatch = useAppDispatch();

  const participantOptions = [
    { value: "all", label: "All" },
    { value: "Anna", label: "Anna 👩‍🦱" },
    { value: "Maria", label: "Maria 🦄" },
    { value: "Bob", label: "Bob 👦" },
    { value: "Alex", label: "Alex 😎" },
  ];

  const handleOnChange = (option: SingleValue<{value: string, label: string}>) => {
    if (!option) {
      return;
    }

    dispatch(setActiveFilter(option.value));
  };

  return (
    <Select
      name="filter"
      id="filter"
      onChange={handleOnChange}
      options={participantOptions}
    />
  );
};

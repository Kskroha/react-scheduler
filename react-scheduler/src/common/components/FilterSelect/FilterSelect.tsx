import { FC } from "react";
import { setActiveFilter } from "../../../features/schedule/scheduleSlice";
import { useAppDispatch } from "../../hooks/hooks";
import Select, {type SingleValue} from "react-select";
import { FILTER_OPTIONS } from "../../mocks/constants";

export const FilterSelect: FC = () => {
  const dispatch = useAppDispatch();

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
      defaultValue={{value: "All", label: "All"}}
      onChange={handleOnChange}
      options={FILTER_OPTIONS}
    />
  );
};

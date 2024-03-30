import { FC } from "react";
import Select from "react-select";
import { Control, Controller} from "react-hook-form";
import makeAnimated from "react-select/animated";
import { FormFields } from "../../pages/NewEventPage/NewEventPage";

interface IOptionSelect {
  control: Control<FormFields>;
  options: {value: string, label: string}[];
  className: string;
  label: string;
  name: "eventName" | "participants" | "day" | "time" | `participants.${number}` | `participants.${number}.value` | `participants.${number}.label` | "day.value" | "day.label" | "time.value" | "time.label";
  isMulti?: boolean;
}

export const OptionSelect: FC<IOptionSelect> = ({control, options, className, label, name, isMulti}) => {
  const animatedComponents = makeAnimated();

  return (
    <div className={className}>
            <label htmlFor={name}>{label}</label>
            <Controller
              control={control}
              name={name}
              rules={{ required: true }}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  value={value}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti={isMulti}
                  options={options}
                  onChange={onChange}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: "180px",
                    }),
                  }}
                />
              )}
            />
          </div>
  );
};
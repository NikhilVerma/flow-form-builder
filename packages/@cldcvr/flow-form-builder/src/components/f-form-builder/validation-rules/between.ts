import { FormBuilderValidatorFunction } from "../mixins/types";
import { isEmpty } from "./../utils";

export type BetweenParams =
  | [string | number, string | number]
  | { min: number | string; max: number | string };

function getParams(params: BetweenParams) {
  if (!params) {
    return {
      min: 0,
      max: 0,
    };
  }

  if (Array.isArray(params)) {
    return { min: params[0], max: params[1] };
  }

  return params;
}

const betweenValidator: FormBuilderValidatorFunction<unknown, BetweenParams> = (
  value,
  params
): boolean => {
  if (isEmpty(value)) {
    return true;
  }

  const { min, max } = getParams(params as BetweenParams);
  if (Array.isArray(value)) {
    return value.every((val) => !!betweenValidator(val, { min, max }));
  }

  const valueAsNumber = Number(value);
  return Number(min) <= valueAsNumber && Number(max) >= valueAsNumber;
};

export default betweenValidator;

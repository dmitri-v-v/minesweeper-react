import { CellValue } from "types/cell";

export function incrementCellValue(value: CellValue): CellValue {
  switch (value) {
    case CellValue.None:
      return CellValue.One;
    case CellValue.One:
      return CellValue.Two;
    case CellValue.Two:
      return CellValue.Three;
    case CellValue.Three:
      return CellValue.Four;
    case CellValue.Four:
      return CellValue.Five;
    case CellValue.Five:
      return CellValue.Six;
    case CellValue.Six:
      return CellValue.Seven;
    case CellValue.Seven:
      return CellValue.Eight;
    case CellValue.Eight:
    default:
      return value;
  }
}

import {ChartOptions} from "./ChartOptions";

export interface CanvasChart {
  options: ChartOptions;
  render: () => void;
}

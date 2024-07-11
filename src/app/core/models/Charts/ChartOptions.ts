export interface ChartDataPoint {
  name?: string;
  y?: number;
  label?: string;
}

export interface ChartOptions {
  animationEnabled?: boolean;
  explodeOnClick?: boolean;
  title?: {
    text: string;
  };
  data: Array<{
    type: string;
    startAngle?: number;
    indexLabel?: string;
    yValueFormatString?: string;
    dataPoints: ChartDataPoint[];
    click?: (e: any) => void;
  }>;
}

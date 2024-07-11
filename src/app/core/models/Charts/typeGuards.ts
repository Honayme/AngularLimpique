import { CanvasChart } from './CanvasChart'; // Assurez-vous que le chemin est correct

export function isCanvasChart(obj: any): obj is CanvasChart {
  return (
    obj &&
    typeof obj === 'object' &&
    'options' in obj &&
    'render' in obj &&
    typeof obj.render === 'function'
  );
}

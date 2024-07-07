import { Participation } from './Participation';

export interface Olympic {
  participations: any;
  id: number;
  country: string;
  participation: Participation[];
}

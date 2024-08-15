export default interface LogEntry {
  round: number;
  content: string;
  targetId?: string | null;
  delivered: boolean;
}

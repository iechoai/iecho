import type { ToolRecord } from "./validation";

export interface ToolListItem extends Omit<ToolRecord, "createdAt"> {
  createdAt: string;
}

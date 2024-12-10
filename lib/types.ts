import { Id } from '@/convex/_generated/dataModel';

export type TaskType =
	| {
			_id: Id<'tasks'>;
			_creationTime: number;
			isCompleted: boolean;
			text: string;
	  }
	| undefined;

'use client';

import React from 'react';
import TaskInput from './TaskInput';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';

type Props = {
};

export default function TaskManager({}: Props) {
	const tasks_by_status_index = useQuery(
		api.tasks.getTaskByStatus_index,
		{}
	);
	return (
		<ul className='flex flex-col justify-center items-start gap-2 text-sm'>
			{tasks_by_status_index &&
				tasks_by_status_index.map((task) => (
					<Task
						key={uuidv4()}
						task={task}
					/>
				))}
			<TaskInput key={uuidv4()} />
			<li className='text-accent font-light pointer-events-none'>
				Save and see your changes instantly.
			</li>
		</ul>
	);
}



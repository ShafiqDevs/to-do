'use client';

import Form from 'next/form';
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TaskType } from '@/lib/types';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { v } from 'convex/values';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

type Props = {
	task: TaskType;
};

export default function Task({ task }: Props) {
	const updateTask = useMutation(api.tasks.updateTask);
	const removeTask = useMutation(api.tasks.removeTask);
	const { toast } = useToast();

	return (
		<li className='w-full lg:w-48 m'>
			<Form
				action={async (formData) => {
					const text = formData.get('task-name') as string;
					const isCompleted = formData.get('task-status') === 'on';
					console.log(isCompleted);

					isCompleted &&
						text &&
						(await updateTask({
							id: task?._id as Id<'tasks'>,
							isCompleted,
							text,
						}));
					toast({
						variant: 'default',
						title: 'Task status',
						description: 'Task updated successfully',
					});
				}}
				className='flex w-full justify-center gap-2 accent-primary'>
				<Input
					className='w-fit'
					type='checkbox'
					checked={task?.isCompleted}
					name='task-status'
					id='task-status'
					onChange={async (e) => {
						const isChecked = e.target.checked;
						await updateTask({
							id: task?._id as Id<'tasks'>,
							isCompleted: isChecked,
							text: task?.text ?? '',
						});
						toast({
							variant: 'default',
							title: 'Task status',
							description: 'Task updated successfully',
						});
					}}
				/>
				<Input
					type='text'
					name='task-name'
					id='task-name'
					defaultValue={task?.text}
					placeholder='What to do next'
				/>
				<Button
					variant={'secondary'}
					type='submit'>
					update
				</Button>
				<Button
					formAction={async (formData) => {
						if (!task?._id) return;
						await removeTask({ id: task._id });
						toast({
							variant: 'destructive',
							title: 'Task status',
							description: 'Task removed successfully',
						});
					}}
					variant={'secondary'}
					type='submit'>
					<Trash2 className='text-destructive' />
				</Button>
			</Form>
		</li>
	);
}

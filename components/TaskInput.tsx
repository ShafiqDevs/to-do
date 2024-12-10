import React, { useState } from 'react';
import Form from 'next/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Props = {};

export default function TaskInput({}: Props) {
	const addNewTask = useMutation(api.tasks.addNewTask);

	return (
		<li className='w-full lg:w-48 m'>
			<Form
				action={async (formData) => {
					const text = formData.get('task-name') as string;
					const isCompleted = formData.get('task-status') === 'on';
					await addNewTask({ text, isCompleted });
				}}
				className='flex w-full justify-center gap-2 accent-primary'>
				<Input
					className='w-fit'
					type='checkbox'
					name='task-status'
					id='task-status'
				/>
				<Input
					type='text'
					name='task-name'
					id='task-name'
					placeholder='What to do next'
				/>
				<Button
					variant={'default'}
					type='submit'>
					Add Task
				</Button>
			</Form>
		</li>
	);
}

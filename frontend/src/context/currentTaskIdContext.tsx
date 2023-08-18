import React, { createContext, ReactNode, useContext, useState } from 'react';

// Create the context
interface ICurrentTaskIdContext {
	updateCurrentTaskId: (taskId: string) => void;
	currentTaskId: string;
}

const CurrentTaskIdContext = createContext<ICurrentTaskIdContext | null>(null);

// Provide the context to the component tree
export const CurrentTaskIdContextProvider: React.FC<{ children: ReactNode }> = (props) => {
	const [currentTaskId, setCurrentTaskId] = useState('');

	const updateCurrentTaskId = (taskId: string) => {
		setCurrentTaskId(taskId);
	};

	return (
		<CurrentTaskIdContext.Provider
			value={{
				updateCurrentTaskId,
				currentTaskId,
			}}
		>
			{props.children}
		</CurrentTaskIdContext.Provider>
	);
};

export const useCurrentTaskIdContext = () => {
	const tabContext = useContext(CurrentTaskIdContext);
	return tabContext as ICurrentTaskIdContext;
};

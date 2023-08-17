import { Status } from '@/types';

export const statusBgColors: Record<Status, string> = {
	COMPLETED: '#4ad295',
	IN_PROGRESS: '#1567ff',
	PENDING: '#ffd800',
} as const;

export const FAILED_TO_FETCH_MESSAGE = 'Failed to fetch data';

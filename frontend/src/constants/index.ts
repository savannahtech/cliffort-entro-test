import { Status } from '@/types';

export const statusBgColors: Record<Status, string> = {
	COMPLETED: '#4ad295',
	IN_PROGRESS: '#1567ff',
	PENDING: '#ffd800',
} as const;

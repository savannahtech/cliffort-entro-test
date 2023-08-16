export interface RequestData<Body = any, Query = any, Params = any> {
	payload?: Body;
	query?: Query;
	params?: Params;
	originUrl?: string;
}

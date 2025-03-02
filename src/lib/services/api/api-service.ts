import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { UserLocationPayload } from './interfaces';
import { APIMethodsType } from './types';

class ApiService {
	private BACKEND_API_URL: string = '';

	constructor() {
		this.BACKEND_API_URL = `${PUBLIC_BACKEND_URL}/api`;
	}

	private getHeaders(): HeadersInit {
		return {
			'Content-Type': 'application/json'
		};
	}

	public updateNumberOfUniqueSiteVisitors(): void {
		fetch(`${this.BACKEND_API_URL}/update_number_of_unique_site_visitors`, {
			method: APIMethodsType.PUT,
			headers: this.getHeaders()
		}).catch((error) => {
			console.error('Error updating the number of unique site visitors:', error);
		});
	}

	public putUserLocation(payload: UserLocationPayload): void {
		fetch(`${this.BACKEND_API_URL}/put_user_location`, {
			method: APIMethodsType.PUT,
			headers: this.getHeaders(),
			body: JSON.stringify(payload)
		}).catch((error) => {
			console.error('Error sending user location:', error);
		});
	}
}

export default new ApiService();

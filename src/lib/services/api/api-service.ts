import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { UserLocationPayload } from './interfaces';

class ApiService {
	private BACKEND_API_URL: string = '';

	constructor() {
		this.BACKEND_API_URL = `${PUBLIC_BACKEND_URL}/api`;
	}

	public putUserLocation(payload: UserLocationPayload) {
		fetch(`${this.BACKEND_API_URL}/put_user_location`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}).catch((error) => {
			console.error('Error sending user location:', error);
		});
	}
}

export default new ApiService();

import api from "@/utils/api";

class ApiClient {
	private client = api;

	protected async get<T>(url: string, options?: object) {
		return await this.client.get<T>(url, options);
	}

	protected async post<T>(url: string, options?: object) {
		return await this.client.post<T>(url, options);
	}
}

export default ApiClient;

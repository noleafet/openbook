import apiClient from '@/lib/api/api-axios';

export interface Service<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T>;
    delete(id: number): Promise<boolean>;
}

export class BaseHttpService<T> implements Service<T> {
    protected resource: string;

    constructor(resource: string) {
        this.resource = resource;
    }

    async getAll(): Promise<T[]> {
        return await apiClient.get(`/${this.resource}`).then(res => res.data);
    }

    async getById(id: number): Promise<T> {
        return await apiClient.get(`/${this.resource}/${id}`).then(res => res.data);
    }

    async create(item: T): Promise<T> {
        return await apiClient.post(`/${this.resource}`, item).then(res => res.data);
    }

    async update(id: number, item: T): Promise<T> {
        return await apiClient.put(`/${this.resource}/${id}`, item).then(res => res.data);
    }

    async delete(id: number): Promise<boolean> {
        return apiClient.delete(`/${this.resource}/${id}`).then(res => res.data);
    }

}


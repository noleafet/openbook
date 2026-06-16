import apiClient from '@/lib/api/api-axios';
import MockAdapter from 'axios-mock-adapter';

const mockApiClient = new MockAdapter(apiClient);

export default mockApiClient;
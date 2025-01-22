export async function apiRequest<T>( url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any ): Promise<T> {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    const options: RequestInit = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    try{
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error:', error);
        throw new Error('Error charging data');
    }
}

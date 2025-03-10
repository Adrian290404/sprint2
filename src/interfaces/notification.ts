export interface Notification {
    id: number;
    type: 'create' | 'update' | 'delete';
    collection: 'rooms' | 'employees' | 'reviews' | 'bookings';
    timestamp: Date;
    details: any;
    read: boolean;
}
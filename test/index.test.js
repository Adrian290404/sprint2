const { Room, Booking } = require('./index');

describe('Pruebas de habitaciones', () => {
    const room = new Room('Suite 200', 15000, 5)
    const booking1 = new Booking(
        'Carlos Pérez',
        'carlos.perez@example.com',
        new Date('2024-07-15'),
        new Date('2024-07-22'),
        25,
        room
    )
    const booking2 = new Booking(
        'Julia Martínez',
        'julia.martinez@example.com',
        new Date('2024-07-23'),
        new Date('2024-07-27'),
        25,
        room
    )
    room.bookings.push(booking1, booking2)

    test('La función isOccupied devuelve un booleano indicando si la habitación está ocupada o no', () => {
        expect(room.isOccupied(new Date('2024-07-10'))).toBe(false)
    })

    test('La función isOccupied devuelve un booleano indicando si la habitación está ocupada o no', () => {
        expect(room.isOccupied(new Date('2024-07-25'))).toBe(true)
    })

    test('La función occupancyPercentage devuelve un número con el porcentaje de ocupación', () => {
        expect(room.occupancyPercentage('2024-07-12', '2024-07-18')).toBe('57.14')
    })

    test('La función occupancyPercentage devuelve un número con el porcentaje de ocupación', () => {
        expect(room.occupancyPercentage('2024-07-20', '2024-07-24')).toBe('100.00')
    })

    test('La función totalOccupancyPercentage devuelve un porcentaje para varias habitaciones', () => {
        const room2 = new Room('Suite 202', 18000, 5)
        const rooms = [room, room2]
        const result = Room.totalOccupancyPercentage(rooms, new Date('2024-07-01'), new Date('2024-07-20'))
        expect(result).toBe('15.00')
    })

    test('La función totalOccupancyPercentage devuelve un porcentaje para varias habitaciones', () => {
        const room2 = new Room('Suite 202', 18000, 5);
        const rooms = [room, room2];
        const result = Room.totalOccupancyPercentage(rooms, new Date('2024-07-15'), new Date('2024-07-25'))
        expect(result).toBe('50.00')
    })

    test('La función availableRooms devuelve las habitaciones disponibles', () => {
        const room2 = new Room('Suite 202', 18000, 5)
        const rooms = [room, room2]
        const available = Room.availableRooms(rooms, '2024-07-18', '2024-07-22');
        expect(available).toContain(room2)
    })

    test('La función fee calcula el precio final descontando reservas y habitaciones', () => {
        const room = new Room('Suite 101', 120, 8);
        const booking = new Booking(
            'Carlos Pérez',
            'carlos.perez@example.com',
            new Date('2024-07-05'),
            new Date('2024-07-10'),
            20,
            room
        )
        room.bookings.push(booking)
        expect(booking.fee).toBe(529.9200000000001)
    })

    test('La función fee calcula el precio final descontando reservas y habitaciones', () => {
        const room = new Room('Suite 101', 120, 40);
        const booking = new Booking(
            'Carlos Pérez',
            'carlos.perez@example.com',
            new Date('2024-07-12'),
            new Date('2024-07-20'),
            15,
            room
        );
        room.bookings.push(booking);
        expect(booking.fee).toBe(550.8000000000001);
    })
})
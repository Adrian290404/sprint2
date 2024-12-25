class Room {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;
  
    constructor(name: string, rate: number, discount: number = 0) {
      this.name = name;
      this.bookings = [];
      this.rate = rate;
      this.discount = discount;
    }
  
    isOccupied(date: Date): boolean {
      return this.bookings.some(
        (booking) =>
          date >= booking.checkIn && date <= booking.checkOut
      );
    }
  
    occupancyPercentage(startDate: Date, endDate: Date): string {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let totalDays = 0;
      let occupancyDays = 0;
  
      let currentDate = new Date(start);
      while (currentDate <= end) {
        totalDays++;
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      this.bookings.forEach((booking) => {
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);
  
        const overStart = bookingStart > start ? bookingStart : start;
        const overEnd = bookingEnd < end ? bookingEnd : end;
  
        if (overStart <= overEnd) {
          let date = new Date(overStart);
          while (date <= overEnd) {
            occupancyDays++;
            date.setDate(date.getDate() + 1);
          }
        }
      });
  
      const occupancyPercentage = ((occupancyDays / totalDays) * 100).toFixed(2);
      return occupancyPercentage;
    }
  
    static totalOccupancyPercentage(
      rooms: Room[],
      startDate: Date,
      endDate: Date
    ): string {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let totalDays = 0;
  
      let currentDate = new Date(start);
      while (currentDate <= end) {
        totalDays++;
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      let totalOccupiedDays = 0;
      rooms.forEach((room) => {
        const occupancyPercentage = parseFloat(
          room.occupancyPercentage(startDate, endDate)
        );
        totalOccupiedDays += (occupancyPercentage / 100) * totalDays;
      });
  
      const totalDaysRooms = rooms.length * totalDays;
      return ((totalOccupiedDays / totalDaysRooms) * 100).toFixed(2);
    }
  
    static availableRooms(
      rooms: Room[],
      startDate: Date,
      endDate: Date
    ): Room[] {
      return rooms.filter((room) => {
        return !room.bookings.some((booking) => {
          const bookingStart = booking.checkIn;
          const bookingEnd = booking.checkOut;
  
          return startDate <= bookingStart && endDate >= bookingEnd;
        });
      });
    }
  }
  
  class Booking {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;
  
    constructor(
      name: string,
      email: string,
      checkIn: Date,
      checkOut: Date,
      discount: number,
      room: Room
    ) {
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
      this.room = room;
    }
  
    get fee(): number {
      const roomRate = this.room.rate;
      const roomDiscount = this.room.discount;
      const bookingDiscount = this.discount;
  
      const roomRateDiscount = (roomRate * roomDiscount) / 100;
      const discountedRate = roomRate - roomRateDiscount;
  
      const bookingRateDiscount = (discountedRate * bookingDiscount) / 100;
      const finalRate = discountedRate - bookingRateDiscount;
  
      let totalDays = 0;
      let startDate = new Date(this.checkIn);
      while (startDate <= this.checkOut) {
        totalDays++;
        startDate.setDate(startDate.getDate() + 1);
      }
  
      return finalRate * totalDays;
    }
  }
  
  export { Room, Booking };
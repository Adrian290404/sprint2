interface Room {
    id: number;
    room_name: string;
    bed_type: string;
    room_floor: string;
    facilities: string;
    rate: number;
    avaiable: boolean;
    image: string;
}
  
export const rooms: Room[] = [
    {
        id: 1,
        room_name: "Luxury Suite B-101",
        bed_type: "King Bed",
        room_floor: "Floor B-1",
        facilities: "AC, Shower, King Bed, Towel, Bathtub, Coffee Maker, Mini Bar, LED TV, Wifi, Balcony",
        rate: 250,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2024/05/01/15/34/hobbit-8732525_1280.png",
    },
    {
        id: 2,
        room_name: "Family Room C-201",
        bed_type: "Two Queen Beds",
        room_floor: "Floor C-2",
        facilities: "AC, Shower, Two Queen Beds, Towel, Kitchenette, Sofa, LED TV, Wifi",
        rate: 180,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2018/06/14/21/15/bedroom-3475656_1280.jpg",
    },
    {
        id: 3,
        room_name: "Standard Room D-305",
        bed_type: "Single Bed",
        room_floor: "Floor D-3",
        facilities: "AC, Shower, Single Bed, Towel, Coffee Set, LED TV, Wifi",
        rate: 90,
        avaiable: false,
        image: "https://cdn.pixabay.com/photo/2016/04/15/11/45/hotel-1330841_1280.jpg",
    },
    {
        id: 4,
        room_name: "Executive Suite A-405",
        bed_type: "Double Bed",
        room_floor: "Floor A-4",
        facilities: "AC, Shower, Double Bed, Towel, Bathtub, Work Desk, LED TV, Wifi, Ocean View",
        rate: 320,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2020/02/01/06/12/living-room-4809587_1280.jpg",
    },
    {
        id: 5,
        room_name: "Cozy Room E-502",
        bed_type: "Queen Bed",
        room_floor: "Floor E-5",
        facilities: "AC, Shower, Queen Bed, Towel, Sofa, Mini Fridge, LED TV, Wifi",
        rate: 120,
        avaiable: false,
        image: "https://cdn.pixabay.com/photo/2021/10/06/15/05/bedroom-6686058_1280.jpg",
    },
    {
        id: 6,
        room_name: "Penthouse Suite F-701",
        bed_type: "King Bed",
        room_floor: "Floor F-7",
        facilities: "AC, Jacuzzi, King Bed, Towel, Kitchen, LED TV, Wifi, Private Pool, City View",
        rate: 600,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2023/09/09/06/33/bedroom-8242522_1280.jpg",
    },
    {
        id: 7,
        room_name: "Studio Room G-102",
        bed_type: "Queen Bed",
        room_floor: "Floor G-1",
        facilities: "AC, Shower, Queen Bed, Towel, Work Desk, Coffee Set, LED TV, Wifi",
        rate: 150,
        avaiable: false,
        image: "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg",
    },
    {
        id: 8,
        room_name: "Deluxe Room H-206",
        bed_type: "Two Twin Beds",
        room_floor: "Floor H-2",
        facilities: "AC, Shower, Two Twin Beds, Towel, Coffee Set, LED TV, Wifi, Balcony",
        rate: 160,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2020/02/01/06/12/upholstery-4809588_960_720.jpg",
    },
    {
        id: 9,
        room_name: "Compact Room I-305",
        bed_type: "Single Bed",
        room_floor: "Floor I-3",
        facilities: "Fan, Shower, Single Bed, Towel, LED TV, Wifi",
        rate: 75,
        avaiable: true,
        image: "https://cdn.pixabay.com/photo/2015/09/22/13/16/hotel-951598_1280.jpg",
    },
    {
        id: 10,
        room_name: "Presidential Suite J-801",
        bed_type: "King Bed",
        room_floor: "Floor J-8",
        facilities: "AC, Jacuzzi, King Bed, Towel, Bathtub, Kitchen, LED TV, Wifi, Private Balcony, Sea View",
        rate: 1000,
        avaiable: false,
        image: "https://cdn.pixabay.com/photo/2024/04/01/14/09/room-8669028_1280.jpg",
    }
];
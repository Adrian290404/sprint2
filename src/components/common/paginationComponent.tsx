import React, { useState, useEffect } from "react";
import { Container, Button, Input, Content } from "./styles/paginationStyles";
import { paginateData } from "./listComponent/functions/paginateData";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { filterRooms } from "./listComponent/functions/filterRooms";
import { filterUsers } from "./listComponent/functions/filterUsers";
import { filterBookings } from "./listComponent/functions/filterBookings";
import { filterReviews } from "./listComponent/functions/filterReviews";
import { filterNotifications } from "./listComponent/functions/filterNotifications";
import { setPage } from "../../features/lists/paginationSlice";
import { getCustomPaginationRange } from "./listComponent/functions/getCustomPaginationRange";

interface PaginationComponentProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

interface State {
    filter: {
        selectedMenu: string;
        selectedOption: string;
    };
    rooms: { rooms: any[] };
    users: { users: any[] };
    bookings: { bookings: any[] };
    reviews: { reviews: any[] };
    notifications: { notifications: any[] };
}

export const PaginationComponent = ({ currentPage, setCurrentPage }: PaginationComponentProps) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { selectedMenu, selectedOption } = useSelector(
        (state: State) => state.filter
    );

    const [inputPage, setInputPage] = useState("");

    useEffect(() => {
        dispatch(setPage(1));
    }, [selectedMenu, selectedOption, location.pathname, dispatch]);

    const info = () => {
        let data: any[];
        let func: Function;
        let dataName: string;
        switch (location.pathname) {
            case "/room":
                data = useSelector((state: State) => state.rooms.rooms);
                func = filterRooms;
                dataName = "rooms";
                break;
            case "/users":
                data = useSelector((state: State) => state.users.users);
                func = filterUsers;
                dataName = "users";
                break;
            case "/bookings":
                data = useSelector((state: State) => state.bookings.bookings);
                func = filterBookings;
                dataName = "bookings";
                break;
            case "/dashboard/customerReviews":
                data = useSelector((state: State) => state.reviews.reviews);
                func = filterReviews;
                dataName = "reviews";
                break;
            case "/record":
                data = useSelector((state: State) => state.notifications.notifications);
                func = filterNotifications;
                dataName = "notifications";
                break;
            default:
                return {
                    pages: 1,
                    itemsOnPage: 0,
                    totalItems: 0,
                    typeOfData: "data",
                };
          }
          const filtered = func(data, selectedMenu, selectedOption);
          return {
              pages: paginateData(filtered, 10).length,
              itemsOnPage: paginateData(filtered, 10)[currentPage - 1]?.length || 0,
              totalItems: filtered.length,
              typeOfData: dataName,
          };
    };

    const pagesInfo = info();
    const totalPages = pagesInfo.pages;
    const totalItems = pagesInfo.totalItems;
    const itemsOnPage = pagesInfo.itemsOnPage;
    const typeOfData = pagesInfo.typeOfData;

    const changeIndex = (index: number) => {
        if (index < 1) index = 1;
        if (index > totalPages) index = totalPages;
        setCurrentPage(index);
    };

    const paginationRange = getCustomPaginationRange(currentPage, totalPages);

    if (totalPages <= 1) {
        return (
            <Container>
                <p>
                    Showing {itemsOnPage} of {totalItems} {typeOfData}
                </p>
            </Container>
        );
    }

    return (
        <Container>
            <p>
                Showing {itemsOnPage} of {totalItems} {typeOfData}
            </p>
            <Content>
                <Button
                    controller
                    onClick={() => changeIndex(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </Button>

                {paginationRange.map((item, idx) => {
                    if (item === "DOTS") {
                        return (
                            <Input
                                key={idx}
                                type="number"
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value)}
                                min={1}
                                max={totalPages}
                                placeholder="..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const page = Number(inputPage);
                                        if (page >= 1 && page <= totalPages) {
                                            changeIndex(page);
                                            setInputPage("");
                                        }
                                    }
                                }}
                            />
                        );
                    }
                    return (
                        <Button
                            key={idx}
                            isSelected={currentPage === item}
                            onClick={() => changeIndex(item as number)}
                        >
                            {item}
                        </Button>
                    );
                })}

                <Button
                  controller
                  onClick={() => changeIndex(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Content>
        </Container>
    );
};
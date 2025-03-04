import { ManagementComponent } from "./managementComponent";
import { PaginationComponent } from "./paginationComponent";
import { ListComponent } from "./listComponent/listComponent";
import { Background } from "./styles/layoutStyles";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../features/lists/paginationSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch } from "../../features/store";

interface State {
    pagination: {
        currentPage: number;
    };
}

export const ListLayoutComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentPage = useSelector((state: State) => state.pagination.currentPage);
    const location = useLocation();

    useEffect(() => {
        dispatch(setPage(1));
    }, [location.pathname, dispatch]);

    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage));
    };

    return (
        <Background>
            <ManagementComponent />
            <ListComponent currentPage={currentPage} />
            <PaginationComponent currentPage={currentPage} setCurrentPage={handlePageChange} />
        </Background>
    );
};

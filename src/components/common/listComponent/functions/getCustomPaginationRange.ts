export const getCustomPaginationRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) {
        return [1];
    }

    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: Array<number | string> = [];
    range.push(1);

    if (currentPage === totalPages) {
        range.push(currentPage - 3);
        range.push(currentPage - 2);
    }

    if (currentPage > 2) {
        if (currentPage + 1 === totalPages){
            range.push(currentPage - 2);
        }
        range.push(currentPage - 1);
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
        range.push(currentPage);
        if (currentPage +1 !== totalPages){
            range.push(currentPage + 1);
        }
    }

    if (currentPage === 1){
        range.push(2);
        range.push(3);
        range.push(4);
    }

    if (currentPage === 2){
        range.push(4);
    }

    range.push(totalPages);
    range.push("DOTS");
    return range;
}
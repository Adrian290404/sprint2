export const paginateData = <T>(data: T[], itemsPerPage: number): T[][] => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData: T[][] = [];

    for (let i = 0; i < totalPages; i++) {
        const startIndex = i * itemsPerPage;
        const chunk = data.slice(startIndex, startIndex + itemsPerPage);
        paginatedData.push(chunk);
    }

    return paginatedData;
};
const paginaiton = (totalPages, currentPage, range = 2) => {
    const firstElement = 1
    const result = [firstElement];

    if (currentPage - range > 2)
        result.push("...");

    for (let i = currentPage - range; i <= currentPage + range; i++) {
        if (i > 1 && i < totalPages)
            result.push(i)
    }

    if (currentPage + range < totalPages - 1)
        result.push("...");
    if (totalPages !== 0 && firstElement !== totalPages)
        result.push(totalPages)

    return result;
}

export default paginaiton
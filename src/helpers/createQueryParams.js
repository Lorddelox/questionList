const createQueryParams = (selected, params) => {

    for (const [key, value] of Object.entries(selected)) {
        params[key] = value.join(",")
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== "") {
            queryParams.set(key, value)
        }
    });

    return queryParams.toString();
}

export default createQueryParams
export function buildPaginationHref(
    pathname: string,
    page: number,
    query?: Record<string, string | number | undefined>,
) {
    const searchParams = new URLSearchParams();

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            if (value !== undefined && value !== '') {
                searchParams.set(key, String(value));
            }
        }
    }

    if (page > 1) {
        searchParams.set('page', String(page));
    }

    const queryString = searchParams.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
}

export function getPaginationDisplayPages(page: number, totalPages: number) {
    const pages =
        totalPages <= 5
            ? Array.from({ length: totalPages }, (_, index) => index + 1)
            : Array.from(new Set([1, page - 1, page, page + 1, totalPages])).filter(
                  (value) => value >= 1 && value <= totalPages,
              );

    return pages.sort((left, right) => left - right);
}

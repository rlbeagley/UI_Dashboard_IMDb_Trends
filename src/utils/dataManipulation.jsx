// For selected year, count the genres of movies
// e.g. { Drama: 12, Comedy: 5 ...}
// maybe make a legend based on colour instead and just put percent in graph
export function getGenreDistributionPerYear(rows, year) {
    const counts = {}; 

    // for each row
    rows.forEach(row => {
        if (row.titleType !== 'movie') return;
        if (row.startYear !== year) return;

        // count genres of each film
        const genres = row.genres ? row.genres.split(' ') : [];
        genres.forEach(genre => {
        counts[genre] = (counts[genre] || 0) + 1;
        });
    });

    // convert to array and sort descending by count
    const sorted = Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    // split into top 7 and the rest (for readability in pie)
    const top = sorted.slice(0, 7);
    const rest = sorted.slice(7);

    if (rest.length > 0) {
        const otherTotal = rest.reduce((sum, g) => sum + g.value, 0);
        top.push({ name: 'Other', value: otherTotal });
    }

    return top;
}

export function getAverageRatingPerGenre(rows) {
    const counts = {}; 
    const ratings = {};

    rows.forEach(row => {
        // only considering movies with valid
        if (row.titleType !== 'movie') return;
        if (row.averageRating == null || isNaN(row.averageRating)) return;

        // count genres of each film
        const genres = typeof row.genres === 'string' ? row.genres.split(' ') : [];
        genres.forEach(genre => {
            if (genre !== '\\N') {
                counts[genre] = (counts[genre] || 0) + 1; // count movies in genre
                ratings[genre]=(ratings[genre] || 0) + row.averageRating; // add rating to genre's rating counter
            }  
        });
    });

    // build the averages array
    const averages = Object.keys(counts).map(genre => ({
        name: genre,
        value: ratings[genre] / counts[genre],
        count: counts[genre],
    }));

    return averages;
}

// genre rating change over time
export async function searchRepositories(from, to,limit) {
     let query;

        if (from && to) {
            query = `created:${from}..${to}`;
        } else if (from) {
            query = `created:${from}`;
        } else {
            query = "created:2026-08-01";
        }

        const response = await fetch(
            `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${limit}`
        );

        if (!response.ok){
            throw new Error("GitHub API request failed");
        }

        const data = await response.json();

       return data.items.map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            url: repo.html_url
        }));

}        
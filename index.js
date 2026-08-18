// const url =
//   "https://api.github.com/search/repositories?q=created:2026-08-01&sort=stars&order=desc";

// const response = await fetch(url);

// const data = await response.json();

// data.items.forEach((repo) => {
//     console.log(repo.name);
//     console.log(repo.stargazers_count);
//     console.log(repo.html_url);
//     console.log("----------------");
// });

import express from 'express'
import repositoryRoutes from "./routes/repositoryRoutes.js";
const app = express()
app.use(express.static("public"));

app.get("/health", (req, res) => {
    res.json({
        message: "GitHub Repository API is running"
    });
});

app.use(repositoryRoutes)
    
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})

import express from "express";
import { searchRepositories } from "../services/githubService.js";


const router = express.Router();

function isValidDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

router.get("/repositories", async (req, res) => {
    try {
        const { from, to, limit = 10 } = req.query;

         if (!from) {
            return res.status(400).json({
                error: "The 'from' date is required"
            });
        }
        
         if (!isValidDate(from)) {
            return res.status(400).json({
                error: "Invalid 'from' date. Use YYYY-MM-DD"
            });
        }

        if (to && !isValidDate(to)) {
            return res.status(400).json({
                error: "Invalid 'to' date. Use YYYY-MM-DD"
            });
        }

        const resultLimit = Math.min(Math.max(Number(limit), 1), 20);

        const repositories =  await searchRepositories(from, to,resultLimit);

         res.json({
            count: repositories.length,
            from,
            to: to || null,
            repositories
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch GitHub repositories"
        });
    }
});

export default router;
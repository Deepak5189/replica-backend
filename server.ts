// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;
const dbFile = 'db.json';

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    res.send(true);
});

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const submissions = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    submissions.push({ name, email, phone, github_link, stopwatch_time });
    fs.writeFileSync(dbFile, JSON.stringify(submissions));
    res.send('Submission saved');
});

app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
    const submissions = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    console.log("Submissions: ",submissions);
    res.send(submissions[index]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

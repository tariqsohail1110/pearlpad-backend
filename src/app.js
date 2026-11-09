import express from "express";

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.json({ message: 'Pearl Pad API is running' })
});

const PORT =  3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
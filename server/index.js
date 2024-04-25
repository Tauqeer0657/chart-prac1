require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3306; 

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


app.get('/api/data', (req, res) => {
    const sql = 'SELECT TIME_LOG, PRED_SI_PER, O2_ENRICHMENT, PCI, RAFT FROM T_REALTIME_ANALYSIS_MYSQL';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send({ error: 'Error fetching chart data' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/api/data2', (req, res) => {
    const sql = 'SELECT TIME_LOG, HOT_BLAST_FLOW, HOT_BLAST_TEMP, STEAM_TPH, HOT_BLAST_PRE FROM T_REALTIME_ANALYSIS_MYSQL';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send({ error: 'Error fetching chart data' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

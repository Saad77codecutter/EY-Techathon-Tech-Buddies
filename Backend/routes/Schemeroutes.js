import express from 'express';
import sql from '../db.js'; // Adjust this path based on your actual db connection

const router = express.Router();

// API endpoint to fetch scheme details by ID
router.get('/schemes/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);

  // Ensure id is an integer before querying the database
  const schemeId = parseInt(id, 10); 

  if (isNaN(schemeId)) {
    return res.status(400).json({ error: 'Invalid scheme ID' });
  }

  try {
    const result = await sql`
      SELECT * 
      FROM scheme_details 
      WHERE scheme_id = ${schemeId}
    `;

    const scheme = result[0];

    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    res.json(scheme);
  } catch (error) {
    console.error('Error fetching scheme details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for searching schemes by name
router.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Assuming you're using MongoDB or a similar database for search (if not, modify accordingly)
    const schemes = await sql`
      SELECT * 
      FROM scheme_details 
      WHERE scheme_name ILIKE ${'%' + query + '%'}
    `;
    res.json(schemes);
  } catch (err) {
    console.error('Error fetching schemes:', err);
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
});

export default router;

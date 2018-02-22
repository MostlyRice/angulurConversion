const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', (request, response) =>{
  const sqlText = 'SELECT * FROM songs ORDER BY artist asc';
  pool.query(sqlText)
  .then((result)=> {
    console.log('got songs?', result);
    response.send(result.rows);
  })
  .catch((error)=> {
    console.log('WOMP, no songs for you');
    response.sendStatus(500);
})
})

router.post('/', (request, response) => {
  const song = request.body.songs;
  console.log('Add songs:', song);

  const sqlText = `INSERT INTO songs(artist, track, published, rank)
      VALUES ($1, $2, $3, $4)`;
  pool.query(sqlText,
      [song.artist, song.track, song.published, song.rank])
      .then((result)=> {
        console.log('Hello new song', result);
        response.sendStatus(200);
      })
      .catch((error)=> {
        console.log('WOMP, no new song');
        response.sendStatus(500);
      })
      })

// Delete a single song
router.delete('/:id', (request, response) => {
 const sqlText = `DELETE FROM songs WHERE id=$1`;
 const id =  request.params.id;
 pool.query(sqlText, [id]).then((result) => {
     console.log('Deleted song', id);
     response.sendStatus(200);
 }) // end success
 .catch((error) => {
     console.log('error in delete', error);
     response.sendStatus(500);
 })
}) // end delete


// Update the rating of a specific song
router.put('/:id', (request, response) => {
  const id = request.params.id;
  const newRating = request.body.rating;
  const sqlText = `UPDATE songs SET rank=$1 WHERE id=$2`;
  pool.query(sqlText, [newRating, id])
    .then((result) => {
      console.log(`Updated song ${id} with rank ${newRating}`);
      response.sendStatus(200);
    })
    .catch( (error) => {
      console.log('Error on update song');
      response.sendStatus(500);
    })
})

module.exports = router;

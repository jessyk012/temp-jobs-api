const express = require('express');
const router = express.Router();

const {
    httpGetAllJobs,
    httpGetJob,
    httpCreateJob,
    httpUpdateJob,
    httpDeleteJob

} = require('../controllers/jobs')

router.route('/').get(httpGetAllJobs).post(httpCreateJob);
router.route('/:id').get(httpGetJob).patch(httpUpdateJob).delete(httpDeleteJob);

module.exports = router;
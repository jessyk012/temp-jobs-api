const JobDB = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors/')


const httpGetAllJobs = async (req, res) => {

    const jobs = await JobDB.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const httpGetJob = async (req, res) => {

    const {user:{userId}, params:{id:jobId}} = req

    const singleJob = await JobDB.findOne({createdBy:userId, _id:jobId })

    if(!singleJob){
        throw new NotFoundError(`No job with ID: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({singleJob})


}


const httpCreateJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await JobDB.create(req.body)
    
    res.status(StatusCodes.CREATED).json(job)


}

const httpUpdateJob = async (req, res) => {

    const {user:{userId}, params:{id:jobId}, body:{company,position}} = req;
    

    if(company==='' || position ===''){
        throw new BadRequestError(`Company or Position fields cannot be empty`)
    }

    const updateJob = await JobDB.updateOne({
        createdBy: userId,
        _id: jobId
    },req.body,{
        new:true,
        runValidators:true
    })


    if(!updateJob){
        throw new NotFoundError(`No job with ID: ${jobId}`)
    }

    res.status(StatusCodes.CREATED).json(updateJob)
}

const httpDeleteJob = async (req, res) => {

    const {user:{userId}, params:{id:jobId}} = req;

    const job = await JobDB.deleteOne({_id:jobId, createdBy: userId})

    if(!job){
        throw new NotFoundError(`No job with ID: ${jobId}`)
    }

    res.status(StatusCodes.OK).json(`Successfully deleted job ID: ${jobId}`)
}



module.exports = {
    httpGetAllJobs,
    httpGetJob,
    httpCreateJob,
    httpUpdateJob,
    httpDeleteJob

}
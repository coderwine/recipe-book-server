const successResponse = (res, results, token) => {
    return(
        token ?
            res.status(200).json({
                results, token
            }) :
            res.status(200).json({
                results
            })
    )
};

const issueResponse = (res) => {
    return(
        res.status(404).json({
            message: `Could not complete request.`
        })
    )
};

const errorResponse = (res, err) => {
    return(
        res.status(500).json({
            Error: `${err.message}`
        })
    )
};

module.exports = {
    success: successResponse,
    issue: issueResponse,
    error: errorResponse
}
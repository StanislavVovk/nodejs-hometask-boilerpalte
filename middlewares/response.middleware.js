
const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    if (res.err) {
        return res.status(404).json({
            error: true,
            message: `${res.err}`
        });
    }
    // if (res.data === "Fighter already deleted") {
    //     return res.status(404).json({
    //         error: true,
    //         message: `Fighter not exist`
    //     });
    // }

    if (!res.data) {
            return res.status(400).json({
                error: true,
                message: `Data is already exist`
            })
        }

    else {
        return res.status(200).send(res.data);
    }
}



exports.responseMiddleware = responseMiddleware;
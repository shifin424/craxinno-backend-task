

export const createAccount = async (req, res, next) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
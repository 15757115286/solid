import adminRouter from './administer/router'
import errorRouter from './error/router'
const pageRouter = [
    adminRouter,
    errorRouter,
    {
        path:'',redirect:'admin'
    }
]
export default pageRouter;
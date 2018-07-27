import adminRouter from './administer/router'
import errorRouter from './error/router'
import testRouter from './componentsTest/router'
const pageRouter = [
    adminRouter,
    errorRouter,
    testRouter,
    {
        path:'',redirect:'admin'
    }
]
export default pageRouter;
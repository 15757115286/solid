import AdministerComponent from './index'
const HelloWorldComponent = () => import(/* webpackChunkName: 'administer' */'./HelloWorldComponent');
const adminRouter = {
    path: 'admin',
    component:AdministerComponent,
    children: [
        { path: '', component: HelloWorldComponent }
    ]
};
export default adminRouter;
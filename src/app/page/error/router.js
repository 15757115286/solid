import ErrorComponent from './index'
const ErrorPageComponent404 = () => import(/* webpackChunkName: 'error' */'./ErrorPageComponent404');
const ErrorPageComponent500 = () => import(/* webpackChunkName: 'error' */'./ErrorPageComponent500');
const errorRouter = {
    path: 'error',
    component:ErrorComponent,
    children: [
        { path: '404', component: ErrorPageComponent404 },
        { path: '500', component: ErrorPageComponent500 }
    ]
};
export default errorRouter;
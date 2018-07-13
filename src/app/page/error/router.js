import ErrorComponent from './index'
const ErrorPageComponent401 = () => import(/* webpackChunkName: 'error' */'./ErrorPageComponent401');
const ErrorPageComponent404 = () => import(/* webpackChunkName: 'error' */'./ErrorPageComponent404');
const ErrorPageComponent500 = () => import(/* webpackChunkName: 'error' */'./ErrorPageComponent500');
const NetworkErrorComponent = () => import(/* webpackChunkName: 'error' */'./NetworkErrorComponent');
const errorRouter = {
    path: 'error',
    component:ErrorComponent,
    children: [
        { path: '401', component: ErrorPageComponent401 },
        { path: '404', component: ErrorPageComponent404 },
        { path: '500', component: ErrorPageComponent500 },
        { path: 'network', component: NetworkErrorComponent }
    ]
};
export default errorRouter;
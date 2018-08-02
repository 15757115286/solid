import TestComponent from '.'
const BoxComponentTest = () => import(/* webpackChunkName: 'test' */'./BoxComponentTest');
const KeepAliveComponentTest = () => import(/* webpackChunkName: 'test' */'./KeepAliveComponentTest');
const testComponentRouter = {
    path: 'test',
    component:TestComponent,
    children: [
        { path: 'box', component: BoxComponentTest },
        { path: 'keep-alive', component: KeepAliveComponentTest }
    ]
};
export default testComponentRouter;
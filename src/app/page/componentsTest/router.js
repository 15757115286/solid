import TestComponent from '.'
const BoxComponentTest = () => import(/* webpackChunkName: 'test' */'./BoxComponentTest');
const KeepAliveComponentTest = () => import(/* webpackChunkName: 'test' */'./KeepAliveComponentTest');
const ImgBoxComponentTest = () => import(/* webpackChunkName: 'test' */'./ImgBoxComponentTest');
const testComponentRouter = {
    path: 'test',
    component:TestComponent,
    children: [
        { path: 'box', component: BoxComponentTest },
        { path: 'keep-alive', component: KeepAliveComponentTest },
        { path: 'img-box',component: ImgBoxComponentTest}
    ]
};
export default testComponentRouter;
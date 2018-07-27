import TestComponent from '.'
const BoxComponentTest = () => import(/* webpackChunkName: 'administer' */'./BoxComponentTest');
const testComponentRouter = {
    path: 'test',
    component:TestComponent,
    children: [
        { path: 'box', component: BoxComponentTest },
    ]
};
export default testComponentRouter;
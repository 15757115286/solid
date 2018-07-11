import AdministerComponent from './index'
const HelloWorldComponent = () => import(/* webpackChunkName: 'administer' */'./HelloWorldComponent');
const Component1 = () => import(/* webpackChunkName: 'administer' */'./Component1');
const Component2 = () => import(/* webpackChunkName: 'administer' */'./Component2');
const Component3 = () => import(/* webpackChunkName: 'administer' */'./Component3');
const adminRouter = {
    path: 'admin',
    component:AdministerComponent,
    children: [
        { path: 'component1', component: Component1 },
        { path: 'component2', component: Component2 },
        { path: 'component3', component: Component3 },
        { path: '', component: HelloWorldComponent }
    ]
};
export default adminRouter;
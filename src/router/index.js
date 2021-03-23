
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import asyncComponent from '../lib/asyncComponent';
import home from "../pages/home";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const AnswerRace = asyncComponent(() => import("../pages/answerRace"));
const ChildScience = asyncComponent(() => import("../pages/childScience"));
const CreativeProgram = asyncComponent(() => import("../pages/creativeProgram"));
const EntityDesign = asyncComponent(() => import("../pages/entityDesign"));
const ProgramClass = asyncComponent(() => import("../pages/programClass"));
const NotFound = asyncComponent(() => import("../pages/notFound"));
// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
const routes = [
  {
    path: "/",
    component:home,
    exact: true,
  },
  {
    path: "/answerrace",
    component:AnswerRace,
    exact: true,
  },
  {
    path: "/childscience",
    component: ChildScience,
    exact: true,
  },
  {
    path: "/creativeprogram",
    component:CreativeProgram,
    exact: true,
  },
  {
    path: "/entitydesign",
    component:EntityDesign,
    exact: true,
  },
  {
    path: "/programclass",
    component:ProgramClass,
    exact: true,
  },
];

export default () => (
  <Router>
    <Route
      path="/"
      render={(props) => (
        <React.Fragment>
          <Switch>
            {routes.map((route, i) => (
              <Route key={`page_route${i}`} {...route} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      )}
    />
  </Router>
);

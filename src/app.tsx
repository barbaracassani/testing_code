import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Col, Container, Row} from 'react-awesome-styled-grid';

import {routes} from './routes';
import Sidebar from './components/sidebar/sidebar';
import {StyledApp, StyledContainer, StyledLeftCol, StyledTopRow} from './app.styled';


function App() {
    return (
        <StyledApp>
            <BrowserRouter>
                <StyledContainer>
                    <StyledTopRow>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h1>Your favourite currencies</h1>
                        </Col>
                    </StyledTopRow>
                    <Row>
                        <StyledLeftCol xs={2} sm={6} md={2} lg={6}>
                            <Sidebar/>
                        </StyledLeftCol>
                        <Col xs={2} sm={2} md={6} lg={6}>
                            <Switch>
                                {routes.map(({Component, path, exact}, i) => {
                                    return <Route
                                        exact={exact}
                                        key={i}
                                        path={path}
                                        render={(props: unknown) => (
                                            <Component {...props}/>
                                        )}
                                    />
                                })}
                            </Switch>
                        </Col>
                    </Row>
                </StyledContainer>
            </BrowserRouter>
        </StyledApp>
    );
}

export default App;

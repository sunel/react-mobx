import React from 'react'
import { Module, handleActions } from '@react-module/app';
import { fromJS } from 'immutable';
import App from '~/App';
import Spinner from 'components/Spinner';
import UserModule from 'modules/User';
import { addOne } from './actions';

class AppModule extends Module {

    provides = {
        UserModule
    }

    get notFound() {
        return () => (
            <div>Simple 404</div>
        )
    }

    get reducer() {
        return (reducer) => {         
            const initialState = fromJS({
                loading: false,
                error: false,
                currentUser: false,
                counter: 0
            });

            const reducer = handleActions({
                [addOne]: (state, action) => state.updateIn([ 'app', 'counter' ], counter => counter + action.payload)
            }, initialState);

            reducer.add('app', reducer);
        }
    }

    get sagas() {
        return (saga) => {
            console.log(this, saga);
        }
    }

    get routes() {
        return (router) => {
            router.add('/', (params) => {
                return <Spinner params={params} route='/'/>
            }, 'post.all')
            router.add('/post/:id', (params) => {
                return <Spinner params={params} route='/post/:id'/>
            }, 'post.list')
            router.add('/articles/:id(\\d+)/:title?', (params) => {
                return <Spinner params={params} route='/articles/:id(\\d+)/:title?' />
            }, 'article.list')
        }
    }

    render() {
        return (
            <App />
        )
    }
}

export default AppModule

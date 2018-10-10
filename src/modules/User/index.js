import React from 'react'
import { fromJS } from 'immutable';
import { Module } from '@react-module/app';
import Spinner from 'components/Spinner';

class UserModule extends Module {
    
    get reducer() {
        return (reducer) => {        
            const initialState = fromJS({
                user: false,
            });
            reducer.add('user', (state = initialState, action) => {
                return state;
            });
        }
    }

    get routes() {
        return (router) => {
            router.group('/user', (router) => {
                router.add('', () => {
                    return <Spinner route='/user'/>
                }, 'all')
                router.add('/:id', () => {
                    return <Spinner route='/user/id'/>
                }, 'list')
                router.add('/create', () => {
                    return <Spinner route='/user/create'/>
                }, 'create')
            }, 'user.')
            
        }
    }

    render() {
        return (
            <div> User: Sunel </div>
        )
    }
}

export default UserModule

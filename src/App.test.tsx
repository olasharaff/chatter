import React from 'react';
import {render, screen} from '@testing-library/react'
// import App from './App';
import Home from '../src/pages/Home'
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePosting from '../src/component/DashBoard/Createposting'
import SignIn from './component/Home/SignIn';
// import 'text-encoding-utf-8'


describe('main', ()=>{
test('Create component renders correctly', () => {
    render(<Router>
        <CreatePosting />
        </Router>);
    const linkElement = screen.getByText(/Attached your files/i);
    expect(linkElement).toBeInTheDocument()
})
})
// testing for create posting routes


// testing for Home Pages landPage
test('Home page renders correctly', () => {
    render(<Router>
        <Home/>
        </Router>
    );
    const linkElement = screen.getByText(/Unleash the Power of Words, Connect with Like-minded Readers and Writers/i);
    expect(linkElement).toBeInTheDocument()
})

// testing for SignIn component

test.only('Sign-In component renders correctly', () =>{
    render(<Router>
        <SignIn />
    </Router>)
    const linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument()
})
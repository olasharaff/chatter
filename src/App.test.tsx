import React from 'react';
import {render, screen} from '@testing-library/react'
// import App from './App';
import Home from '../src/pages/Home'
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePosting from '../src/component/DashBoard/Createposting'
import SignIn from './component/Home/SignIn';
// import 'text-encoding-utf-8'



// testing for create posting routes

test('render learn react link', () => {
    render(<Router>
        <CreatePosting />
        </Router>);
    const linkElement = screen.getByText(/Attached your files/i);
    expect(linkElement).toBeInTheDocument()
})
// testing for Home Pages landPage
test('render learn react link', () => {
    render(<Router>
        <Home/>
        </Router>
    );
    const linkElement = screen.getByText(/Unleash the Power of Words, Connect with Like-minded Readers and Writers/i);
    expect(linkElement).toBeInTheDocument()
})

// testing for SignIn component

test('render learn react', () =>{
    render(<Router>
        <SignIn />
    </Router>)
    const linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument()
})
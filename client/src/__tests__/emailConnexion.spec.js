import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SignInForm from '../components/Log/SignInForm'



describe('<SignInForm/>', ()=> {
    let getByTestId;

    describe('click sur le bouton', ()=> {
beforeEach(async() =>{
    ;({getByTestId}= render(<SignInForm/>))

    await userEvent.type(
        getByTestId('emailUser'),
        'Email utilisateur'
    )
    userEvent.click(getByTestId('connexionButton'))
})
        it('vider le input', ()=>{
            expect(getByTestId('emailUser').value).toEqual('')
        })
    })
})
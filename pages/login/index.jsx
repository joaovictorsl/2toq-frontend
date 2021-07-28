import React from 'react'
import {Header} from '../../components/Header'
import {Footer} from '../../components/Footer'
import {Form} from '../../components/Form/login'

const LoginPage = () => {
  return (
    <>
    <Header path={['Cadastro', '/signup']}/>
    <Form/>
    <Footer/>
    </>
  )
}
export default LoginPage;
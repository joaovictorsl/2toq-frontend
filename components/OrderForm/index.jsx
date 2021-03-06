import { Button, Col, Row, Form as Formulario, Container, ButtonGroup } from 'react-bootstrap'
import ModalAddProducts from '../ModalAddProducts'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearList, removeFromList } from '../../store/modules/toAddList/reducer';
import OrdersService from '../../services/order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const OrderForm = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const productList = useSelector(state => state.productList)


  const { id } = useSelector(state => state.auth.loggedUser)
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState(1)

  // const [order, setOrder] = useState({
  //   customerName: '',
  //   tableNumber: '',
  //   order_products_attributes: productList.map(p => (
  //     {'order_id': p.id, 'quantity': p.quantity, 'observations': p.observations}
  //   ))
  // })





  
  const [modalShow, setModalShow] = useState(false);

  function removeProduct(i) {
    dispatch(removeFromList(i))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await OrdersService.create({
        order: {
          table_number: tableNumber,
          customer_name: customerName,
          user_id: id,
          order_products_attributes: productList.map(p => (
            {'product_id': p.id, 'quantity': p.quantity, 'observations': p.observations}
          ))
        }
      })
      dispatch(clearList())
      toast.success("Pedido criado")
      router.push("/order")
    } catch (error) {
      toast.error("Erro ao criar pedido")

    }
  }

  return (
    <Container className="text-center rounded bg-light p-3">
      <h4>Cadastrar Novo Pedido</h4>
      <Formulario className="d-flex flex-column align-items-center" onSubmit={(e) => { handleSubmit(e) }}>
        <Formulario.Group >
          <Row className="d-flex justify-content-center align-items-center">
            <Col>
              <Formulario.Control
                type="text"
                placeholder="Nome do Cliente"
                value={customerName}
                onChange={(evt) => { setCustomerName(evt.target.value) }}
              />
            </Col>
            <Col>
              <Formulario.Control type="number" min={1} size='sm' placeholder="Mesa" onBlur={(evt) => setTableNumber(evt.target.value)} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Row>
              <Col>
                <Button onClick={() => setModalShow(true)} className="w-75" variant="success">Adicionar novo produto</Button>
              </Col>
            </Row>
            {
              productList.length > 0
                ?
                productList.map((product, i) => (
                  <Row className='mt-4 d-flex justify-content-center align-items-center'>
                    <Col className="col-6">
                      <ButtonGroup aria-label="Basic example">
                        <Button disabled variant="dark" className="text-light">{product['name']}</Button>
                        <Button disabled variant="dark" className="text-light">{product['quantity']}</Button>
                      </ButtonGroup>
                    </Col>
                    <Col className="col-2">
                      <Button variant="danger" onClick={() => removeProduct(i)}>Remover</Button>
                    </Col>
                  </Row>
                ))
                :
                null
            }
          </Row>
        </Formulario.Group>
        <Button
          variant="primary" type="submit" className="w-25 mt-4">
          Confirmar Pedido
        </Button>
      </Formulario>
      <ModalAddProducts
        show={modalShow}
        onHide={() => setModalShow(false)}
        onShow={() => setModalShow(true)}
      />
    </Container>
  )
}

export default OrderForm
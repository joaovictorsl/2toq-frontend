
import { Row, Col, Card } from 'react-bootstrap'



const Order = (props) => {
  return (

    <>
      <Row>
        <Col className="col-8 offset-sm-2 ">
          <Card className='mb-2'>
            <span>id do pedido: {props.id}</span>
            <span>Cliente: {props.customer_name}</span>
            <span>Produto: {props.product}</span>
            <span>valor R$ {props.total_value}</span>
          </Card>
        </Col>
        <Col className="col-2">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Pronto?</label>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Order
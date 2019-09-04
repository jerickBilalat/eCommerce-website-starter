import React, { Fragment } from 'react';

const orderForm = ({
  formFields,
  subTotal,
  cartItems,
  shippingTotal,
  total,
  submitOrderForm,
  doGoBackToCart
}) => {
  const { name, email, phone, message } = formFields;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xs-12">
          <div className="invoice-title">
            <h2>Order</h2>
            <h3 className="pull-right"># 12345</h3>
          </div>

          <hr />

          <div className="row">
            <div className="col-xs-6">
              <address>
                <strong>Customer Info:</strong>
                <br />
                {name}
                <br />
                {email}
                <br />
                {phone}
              </address>
            </div>

            <div className="col-xs-6">
              <address>
                <strong>Message:</strong>
                <br />
                <p>{!message && 'none'}</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                <strong>Order summary</strong>
              </h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <td>
                        <strong>Item</strong>
                      </td>
                      <td className="text-center">
                        <strong>Price</strong>
                      </td>
                      <td className="text-center">
                        <strong>Quantity</strong>
                      </td>
                      <td className="text-right">
                        <strong>Totals</strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          {item.name}
                          <br />
                          some text
                          <br />
                          some details
                          <br />
                        </td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-right">{item.value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="thick-line"></td>
                      <td className="thick-line"></td>
                      <td className="thick-line text-center">
                        <strong>Subtotal</strong>
                      </td>
                      <td className="thick-line text-right">${subTotal}</td>
                    </tr>
                    <tr>
                      <td className="no-line"></td>
                      <td className="no-line"></td>
                      <td className="no-line text-center">
                        <strong>Shipping</strong>
                      </td>
                      <td className="no-line text-right">${shippingTotal}</td>
                    </tr>
                    <tr>
                      <td className="no-line"></td>
                      <td className="no-line"></td>
                      <td className="no-line text-center">
                        <strong>Total</strong>
                      </td>
                      <td className="no-line text-right">${total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-6">
          <input
            type="submit"
            className="submit"
            id="submit"
            value="Back"
            onClick={() => doGoBackToCart(false)}
          />
        </div>
        <div className="col-xs-6">
          <input
            type="submit"
            className="submit pull-right"
            id="submit"
            onClick={e => submitOrderForm(e)}
            value="Submit Order"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default orderForm;

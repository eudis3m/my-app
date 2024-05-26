import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Create_Amount() {
  const url = "http://127.0.0.1:8000/customerCreate";

  function getCookie(name) {
    const value = document.cookie
    const parts = value.split(name)
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    }
  }

  const csrfToken = getCookie('XSRF-TOKEN=');

  let navigate = useNavigate();

  const { index } = useParams();

  const inputRef = useRef(null);

  //const [transaction, setTransaction] = useState([]);

  const [amount,setTransaction] = useState({
    customerId: "",
    transactionId: "",
    transactionDate: "",
    transactionAmount: Number(),
    transactionType: ""
  });
  let customerId;
  const [readOnly, setReadOnly] = useState(true);


  const handleChange = (e) => {
    setTransaction({
      ...amount,
      [e.target.name]: e.target.value,
    });
  };

  /*const loadData = async () => {
    const users =  axios.post('http://127.0.0.1:8000/customertransaction/CustomerIndex', {customerId : index},
    {headers: {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
    },
    withCredentials: false
     }).then((datas) => {
      const userTransactions = datas.data.customerTransactions;
     // amount.costumerId = userTransactions.costumerId
     setTransaction(userTransactions);
     })

    }   
  

  useEffect(() => {
    loadData();
  }, []);*/

  const handleClick = (e) => {
    setReadOnly(false);
    inputRef.current.focus();
  }

  const handleSave = (e) => {
    const users =  axios.post(url, {customerId : index, 'transactionId': amount.transactionId,'transactionDate': amount.transactionDate,
    'transactionAmount': amount.transactionAmount,'transactionType': amount.transactionType
  },
  ).then((res) => {
    //const mainUser = res.data[0];
    //amount = null;
    setTransaction({
      ...amount,
      [e.target.name]: e.target.value,
    });
    alert(
      "Created with sucess" + amount.transactionId
    );
    
  });
  };

  const handleDelete =() => {
    /*alert(
      "Are you sure you want to delete with account no " + amount.accountNumber
    );*/
    const users =  axios.delete('http://127.0.0.1:8000/customerDelete', {'transactionId': amount.transactionId
  }/*,
  {headers: {
    'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
  },
  withCredentials: true
   }*/).then((res) => {
    //const mainUser = res.data[0];

    navigate(`/transactions/${index}`);
  });
  };

  return (
    <div className="container m-auto row mt-5 d-flex align-items-center col-lg-5">
      <div className="col-8">
        <h1 className="text-start">My Amount</h1>
      </div>
      <div className="col-3">
        <button
          className="btn btn-outline-primary float-end"
          onClick={handleClick}
        >
          Edit
        </button>
      </div>

      <div id="about-areas" className="row col-auto">
        <form className="row g-3">
          <div className="col-12 mt-lg-3">
            <label htmlFor="inputState" className="form-label">
              User ID
            </label>
            <input
              type="number"
              className="form-control"
              id="inputState"
              name="accountNumber"
              value={index}
              onChange={handleChange}
              readOnly={true}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="col-12 mt-lg-3">
            <label htmlFor="inputState" className="form-label">
            transaction Id
            </label>
            <input
              type="number"
              className="form-control"
              id="inputState"
              name="transactionId"
              value={amount.transactionId}
             onChange={handleChange}
             //onWheel={(e) => e.target.blur()}
             readOnly={readOnly}
             ref={inputRef}
            />
          </div>
          <div className="col-12 mt-lg-4">
            <label htmlFor="inputState" className="form-label">
            transaction Date
            </label>
            <input
              type="date"
              className="form-control"
              id="inputState"
              name="transactionDate"
              value={amount.transactionDate}
              onChange={handleChange}
              readOnly={readOnly}
              ref={inputRef}
            />
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputState" className="form-label">
            transaction Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="inputState"
              name="transactionAmount"
              value={amount.transactionAmount}
             onChange={handleChange}
             //onWheel={(e) => e.target.blur()}
             readOnly={readOnly}
             ref={inputRef}
            />
          </div>

          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputState" className="form-label">
            transaction Type
            </label>
            <select
              id="inputState"
              className="form-select"
              name="transactionType"
              onChange={handleChange}
              value={amount.transactionType}
              readOnly={readOnly}
              ref={inputRef}
            >
              <option value="debit" disabled={readOnly}>
              debit
              </option>
              <option value="credit" disabled={readOnly}>
              credit
              </option>
            </select>
          </div>

          <div className="col-12 my-4 mt-lg-5 d-flex justify-content-between">
            <Link
              type="button"
              className="btn btn-outline-info"
              to={`/transactions/${index}`}
            >
              View Transactions
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDelete}
            >
              Delete amount
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleSave}
            >
              Save amount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
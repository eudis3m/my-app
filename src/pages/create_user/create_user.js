import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
  const url = "http://127.0.0.1:8000/users/index";

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

  const [user, setUser] = useState({
    userId: "",
    accountNumber: "",
    accountHolder: "",
    accountType: "",
    contact: "",
    email: "",
    password: "",
    customerPan: "",
    customerAadhar: "",
    customerAccountBalance: ""
  });
  let customerId;
  const [readOnly, setReadOnly] = useState(true);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loadData = async () => {
    const users = await axios.post(url, {customerId : index},
    {headers: {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
    },
   // withCredentials: true
     }).then((res) => {
      const mainUser = res.data[0];

      setUser({
        ...user,
        accountNumber: mainUser.customerAccountNo,
        accountHolder: mainUser.customerName,
        accountType: mainUser.customerAccountType,
        contact: mainUser.customerContac,
        email: mainUser.customerEmail,
        password: mainUser.customerPin,
        userId: mainUser.customerId,
        customerAadhar: mainUser.customerAadhar,
        customerAccountBalance: mainUser.customerAccountBalance,
        customerPan: mainUser.customerPan
      });
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (e) => {
    setReadOnly(false);
    inputRef.current.focus();
  }

  const handleSave = (e) => {
    //setReadOnly(false);
    //inputRef.current.focus();
    axios.put('http://127.0.0.1:8000/users/update', {customerId : index,
    'customerAccountNo': user.accountNumber,
    'customerName': user.accountHolder,
    'customerAccountType': user.accountType,
    'customerContac': user.contact,
    'customerEmail': user.email,
    'customerAadhar': user.customerAadhar,
    'customerAccountBalance': user.customerAccountBalance,
    'customerPin': user.password,
    'customerPan': user.customerPan
    },
    {headers: {
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
    },
   // withCredentials: true
     }).then((res) => {
     // const mainUser = res.data[0];
     alert(
      user.accountNumber+ " update with sucess "
    );
     })
  };

  const handleDelete =() => {
    alert(
      "Are you sure you want to delete with account no " + user.accountNumber
    );
     axios.delete('http://127.0.0.1:8000/users/delete', {customerId : index},
      {headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
      },
     // withCredentials: true
       }).then((res) => {
       // const mainUser = res.data[0];
    navigate(`/transactions/${index}`);
       })
  };

  return (
    <div className="container m-auto row mt-5 d-flex align-items-center col-lg-5">
      <div className="col-8">
        <h1 className="text-start">My Account</h1>
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
            <label htmlFor="inputAddress3" className="form-label">
              User ID
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAddress3"
              name="accountNumber"
              value={user.userId}
              onChange={handleChange}
              readOnly={true}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="col-12 mt-lg-3">
            <label htmlFor="inputAddress" className="form-label">
              Account No
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAddress"
              name="accountNumber"
              value={user.accountNumber}
              onChange={handleChange}
              readOnly={true}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="col-12 mt-lg-4">
            <label htmlFor="inputAddress2" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              name="accountHolder"
              value={user.accountHolder}
              onChange={handleChange}
              readOnly={readOnly}
              ref={inputRef}
            />
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="true"
              readOnly={readOnly}
            />
          </div>

          <div className="col-md-6 mt-lg-4">
            <div className="row ">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  +91
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id="contact"
                  name="contact"
                  value={user.contact}
                  readOnly={readOnly}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputState" className="form-label">
              Account Type
            </label>
            <select
              id="inputState"
              className="form-select"
              name="accountType"
              onChange={handleChange}
              value={user.accountType}
            >
              <option value="current" disabled={readOnly}>
                Current
              </option>
              <option value="savings" disabled={readOnly}>
                Savings
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
              Delete account
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleSave}
            >
              Update account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
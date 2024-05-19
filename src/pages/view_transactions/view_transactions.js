import axios from "axios";
import React, { useEffect, useState ,  useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewTransactions() {
  const url = "http://127.0.0.1:8000/customerTransaction/customerIndex";
  const [login, setLogin] = useState({
    userId: "",
    password: "",
    dateStart: "",
    dateFinish: ""
  });

  function getCookie(name) {
    const value = document.cookie
    const parts = value.split(name)
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    }
  }

  const csrfToken = getCookie('XSRF-TOKEN=');

  let navigate = useNavigate();

  let { index } = useParams();

  const inputRef = useRef(null);

  const [filterType, setFilterType] = useState("none");

  const [transaction, setTransaction] = useState([]);

  const handleChange = (e) => {
    setFilterType(e.target.value);
  };

  const [readOnly, setReadOnly] = useState(true);

  const transactions = async () => {
    /*const token = await axios.get
    ('http://127.0.0.1:8000/').then((res) =>{*/
    const datas =  await axios.post(url, {customerId : index},
        )
     
     const userTransactions = datas.data.customerTransactions;
     setTransaction(userTransactions);
  };
  function transactionsDate () {
    /*const token = await axios.get
    ('http://127.0.0.1:8000/').then((res) =>{*/
    const datas =  axios.post('http://127.0.0.1:8000/customerTransaction/date', 
      {'dateStart' : login.dateStart, 'dateStart' : login.dateFinish},
        )
     
     const userTransactions = datas.data.customerTransactions;
     setTransaction(userTransactions);
  };
  useEffect(() => {
    transactions();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-row">
      <div class="p-2">
        <select name="" id="" className="form-select" onChange={handleChange}>
          <option hidden={true}>filter by</option>
          <option value="credit">credit</option>
          <option value="debit">debit</option>
          <option value="none">none</option>
        </select>
        </div>
        <div class="p-2">
        <input
              type="date"
              className="form-control"
              id="inputState"
              name="dateStart"
              value={login.dateStart}
              onChange={handleChange}
              ref={inputRef}
            />
        </div>

        <div class="p-2">
        <input
              type="date"
              className="form-control"
              id="inputState"
              name="dateFinish"
              value={login.dateFinish}
              onChange={handleChange}
            />
        <div>  
        {(() => {
        if (login.dateFinish != null) {
          return(
            <input 
            onClick={() => this.transactionsDate()}
            />
          )
        }}
       ) }
       </div>  
        </div>
        </div>
      <table className="table text-center w-75 m-auto mt-3 shadow border ">
        <thead className="bg-light">
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Date</th>

            <th scope="col">Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((data, index) => (
            <TableDatas data={data} key={index} filter={filterType} />
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-success "
        onClick={() => navigate(`/amount/${index}`)}
        >New Transaction</button>
        <button
          className="btn btn-secondary m-5"
          onClick={() => navigate(`/account/${index}`)}
        >
          Bank to Home
        </button>
      </div>
    </div>
  );
}

const TableDatas = ({ data, filter }) => {
  return filter == data.transactionType ? (
    <tr>
      <th scope="row">{data.transactionId}</th>
      <td>{data.transactionDate}</td>
      <td>{data.transactionType}</td>
      <td
        style={
          data.transactionType == "credit"
            ? { backgroundColor: "#ccffcc" }
            : { backgroundColor: "#ffaaaa" }
        }
      >
        {data.transactionAmount}
      </td>
    </tr>
  ) : filter == "none" ? (
    <tr>
      <th scope="row">{data.transactionId}</th>
      <td>{data.transactionDate}</td>
      <td>{data.transactionType}</td>
      <td
        style={
          data.transactionType == "credit"
            ? { backgroundColor: "#ccffcc" }
            : { backgroundColor: "#ffaaaa" }
        }
      >
        {data.transactionAmount}
      </td>
    </tr>
  ) : (
    ""
  );
};
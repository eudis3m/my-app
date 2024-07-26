import axios from "axios";
import React, { useEffect, useState ,  useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewTransactions() {
  const url = "http://127.0.0.1:8000/customerTransaction/customerIndex";
  const [login, setLogin] = useState({
    userId: "",
    password: "",
    totaly : ''
  });

  const [date] =  useState({
    dateStart: '',
    dateFinish: ''
  })

  const dateStart = "";
  const dateFinish= "";
  let totaly = '';

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

  const [transactionTotaly, setTotaly] = useState({
    dateStart: "",
    dateFinish: "",
    totaly: ""
  });

  const handle = (e) => {
    setTotaly({
      ...transactionTotaly,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
   setFilterType(e.target.value);
  /* setLogin({
    [e.target.name]: e.target.value,
  });]8*/
  };

  const [readOnly, setReadOnly] = useState(false);

  

  const handleClick = (e) => {
    setReadOnly(false);
    inputRef.current.focus();
  }

  const transactions = async () => {
    /*const token = await axios.get
    ('http://127.0.0.1:8000/').then((res) =>{*/
    const datas =  await axios.post(url, {customerId : index},
        )
    const userTransactions = datas.data;
    const count = datas.data;
    let result = [];
    let teste = 0;
    for(let i =0;i<count.length; i++){
    result[i] = count[i].transactionAmount;
    teste += result[i];
     setTotaly({
      ...transactionTotaly,
      totaly: teste
     })
    }
    setTransaction(userTransactions);
 };
  const transactionsDate = (date) =>{
    const datas =  axios.post('http://127.0.0.1:8000/customerTransaction/date', 
      {'customerId': index ,'dateStart' : transactionTotaly.dateStart, 'dateFinish' : transactionTotaly.dateFinish},
        ).then((res) => {
     if(res.data[0] != null){
     const userTransactions = res.data;
     const count = res.data;
     let result = [];
     let teste = 0;
     for(let i =0;i<count.length; i++){
     result[i] = count[i].transactionAmount;
     teste += result[i];
      setTotaly({
       ...transactionTotaly,
       totaly: teste
      })
     }
     setTransaction(userTransactions);
     
     }
     else{
      alert(
        "Not transaction this period to user " + index
      );
     }
  })
  };
  useEffect(() => {
    transactions();
    //transactionsDate();
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
              value={transactionTotaly.dateStart}
              onChange={handle}
              readOnly={false}
              ref={inputRef}
            />
        </div>
        <div class="p-2">
        <input
              type="date"
              className="form-control"
              id="inputState"
              name="dateFinish"
              value={transactionTotaly.dateFinish}
              onChange={handle}
              readOnly={false}
              onInput={transactionsDate}
            />  
        </div>
        <div class="p-2">
        <input
              type="number"
              className="form-control"
              placeholder="totaly"
              id="inputState"
              name="totaly"
              value={transactionTotaly.totaly}
              onChange={handleChange}
              readOnly={readOnly}
              ref={inputRef}
            />  
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

const TableDatas = ({ data, filter}) => {
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
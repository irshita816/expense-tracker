let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");

displayTransactions();

document.getElementById("addBtn").addEventListener("click", addTransaction);

function addTransaction(){

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if(description=="" || amount<=0){
        alert("Enter valid details");
        return;
    }

    const transaction={
        id:Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    document.getElementById("description").value="";
    document.getElementById("amount").value="";
}

function displayTransactions(){

    history.innerHTML="";

    let totalIncome=0;
    let totalExpense=0;

    transactions.forEach(transaction=>{

        const li=document.createElement("li");

        li.innerHTML=`
        ${transaction.description}
        ₹${transaction.amount}
        <button class="delete" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;

        history.appendChild(li);

        if(transaction.type==="income"){
            totalIncome+=transaction.amount;
        }
        else{
            totalExpense+=transaction.amount;
        }

    });

    income.innerText="₹"+totalIncome;

    expense.innerText="₹"+totalExpense;

    balance.innerText="₹"+(totalIncome-totalExpense);

}

function deleteTransaction(id){

    transactions=transactions.filter(transaction=>transaction.id!==id);

    saveData();

    displayTransactions();

}

function saveData(){

    localStorage.setItem("transactions",JSON.stringify(transactions));

}

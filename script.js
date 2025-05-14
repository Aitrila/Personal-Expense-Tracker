$(document).ready(function () {
  const form = $("#expense-form");
  const expenseList = $("#expense-list");
  const totalDisplay = $("#total");

  // Load expenses from localStorage
  function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenseList.empty();
    let total = 0;

    expenses.forEach((expense, index) => {
      total += parseFloat(expense.amount);
      const expenseItem = `
        <div class="expense-item">
          <div>
            <h6>${expense.description} - ₹${expense.amount}</h6>
            <small>${expense.date} | ${expense.category}</small>
          </div>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      expenseList.append(expenseItem);
    });

    totalDisplay.text(total.toFixed(2));
  }

  // Save to localStorage
  function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Add expense
  form.on("submit", function (e) {
    e.preventDefault();
    const description = $("#desc").val();
    const amount = $("#amount").val();
    const date = $("#date").val();
    const category = $("#category").val();

    if (!description || !amount || !date) return;

    const newExpense = { description, amount, date, category };
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(newExpense);
    saveExpenses(expenses);
    loadExpenses();

    form.trigger("reset");
  });

  // Delete expense
  expenseList.on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    saveExpenses(expenses);
    loadExpenses();
  });

  loadExpenses();
});
var defaultExpense = 1; // Стандартное значение для расхода
var defaultLimit = 0; // Стандартное значение для лимита

function addExpense() {
    var amountInput = document.getElementById('amount');
    var enteredAmount = parseFloat(amountInput.value);
    var amount = isNaN(enteredAmount) || enteredAmount <= 0 ? defaultExpense : enteredAmount;

    var category = document.getElementById('category').value;
    var dateInput = document.getElementById('date');
    var date = dateInput.value.trim();

    if (date === '') {
        setDefaultDate();
        date = dateInput.value.trim();
    }

    var expenseList = document.getElementById('expenseList');
    var remainingLimit = parseFloat(document.getElementById('expenseLimit').value) || defaultLimit;

    // Check if there's enough remaining limit
    if (remainingLimit < amount) {
        alert("Not enough remaining limit!");
        return;
    }

    // Create the new expense element
    var newExpense = document.createElement('li');
    var expenseText = 'Расход: ₴' + amount.toFixed(2) + ' в категории ' + category + ' на ' + date;

    var deleteButton = document.createElement('span');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-expense';
    deleteButton.onclick = function () {
        deleteExpense(newExpense, amount);
    };

    newExpense.textContent = expenseText + ' (Было: ₴' + remainingLimit.toFixed(2) + ')';
    newExpense.appendChild(deleteButton);

    // Update the remaining limit
    remainingLimit -= amount;
    document.getElementById('expenseLimit').value = remainingLimit.toFixed(2);
    document.getElementById('totalExpense').textContent = 'Остаток: ₴' + remainingLimit.toFixed(2);

    expenseList.insertBefore(newExpense, expenseList.firstChild);

    amountInput.value = '';
}

function deleteExpense(expenseElement, amount) {
    // Remove the expense element from the list
    expenseElement.remove();

    // Update the remaining limit by adding back the deleted amount
    var remainingLimit = parseFloat(document.getElementById('expenseLimit').value) || defaultLimit;
    remainingLimit += amount;
    document.getElementById('expenseLimit').value = remainingLimit.toFixed(2);
    document.getElementById('totalExpense').textContent = 'Остаток: ₴' + remainingLimit.toFixed(2);
}

function updateLimit(amount) {
    var limitInput = document.getElementById('expenseLimit');
    var currentLimit = parseFloat(limitInput.value) || defaultLimit;
    var newLimit = currentLimit - amount;
    newLimit = Math.max(newLimit, defaultLimit); // Убеждаемся, что новый лимит не станет отрицательным
    limitInput.value = newLimit.toFixed(2);
    document.getElementById('totalExpense').textContent = 'Остаток: ₴' + newLimit.toFixed(2);
}

function setDefaultDate() {
    var dateInput = document.getElementById('date');
    
    var date = dateInput.value.trim();
    
    if (date === '') {
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        var day = ('0' + currentDate.getDate()).slice(-2);
        date = year + '-' + month + '-' + day;
        dateInput.value = date;
    }
}

function updateLimitManually() {
    var limitInput = document.getElementById('expenseLimit');
    var newLimit = parseFloat(limitInput.value) || defaultLimit;

    document.getElementById('totalExpense').textContent = 'Остаток: ₴' + newLimit.toFixed(2);
}

window.onload = function () {
    setDefaultDate();
    // Other actions on page load, if necessary
};

document.addEventListener('DOMContentLoaded', function () {
    var defaultAmount = 1;
    document.getElementById('amount').value = defaultAmount;

    // Update the limit manually when the button is clicked
    document.getElementById('updateLimitButton').addEventListener('click', updateLimitManually);

    updateLimit(0); // Initialize the remaining amount when the page loads
});

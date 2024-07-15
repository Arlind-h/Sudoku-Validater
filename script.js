// Pjesa e par per krijimin e tabeles
function gjeneroTabelen() {
    const tbody = document.getElementById('tabela');
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.id = `cell-${row}-${col}`;
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

// Validon sudokun e dhene nga perdorusi
function validimiSudokut(board) {
    function ValidimiMatrices(group) {
        const seen = new Set();
        for (let num of group) {
            if (num < 1 || num > 9 || seen.has(num)) {
                return false;
            }
            seen.add(num);
        }
        return true;
    }

    for (let row = 0; row < 9; row++) {
        if (!ValidimiMatrices(board[row])) {
            return false;
        }
    }

    for (let col = 0; col < 9; col++) {
        const column = [];
        for (let row = 0; row < 9; row++) {
            column.push(board[row][col]);
        }
        if (!ValidimiMatrices(column)) {
            return false;
        }
    }

    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const subGrid = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    subGrid.push(board[row + r][col + c]);
                }
            }
            if (!ValidimiMatrices(subGrid)) {
                return false;
            }
        }
    }

    return true;
}

// i konverton ne matric nga inputi
function merrMatricenNgaPerdorusi() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        const currentRow = [];
        for (let col = 0; col < 9; col++) {
            const cellValue = document.getElementById(`cell-${row}-${col}`).value;
            currentRow.push(cellValue ? parseInt(cellValue) : 0);
        }
        board.push(currentRow);
    }
    return board;
}

// Validon sudokun e dhene nga inputi
function validateSudoku() {
    const board = merrMatricenNgaPerdorusi();
    const result = validimiSudokut(board) ? "Sudoku është valid!" : "Sudoku nuk është valid!";
    document.getElementById("rezultati").innerText = result;
}

// Kjo osht pjesa qe e gjeneron tabelen e sudokut ne faqe
window.onload = gjeneroTabelen;

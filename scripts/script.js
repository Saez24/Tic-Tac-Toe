let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td class="cell" onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        if (checkWinner()) {
            renderWinnerLine();
            setTimeout(() => {
                alert(`${currentPlayer} hat gewonnen!`);
                resetGame();
            }, 100);
        } else if (checkDraw()) {
            alert("Unentschieden!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
    }
}

function checkWinner() {
    // Gewinnkombinationen
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Reihen
        [0, 4, 8], [2, 4, 6] // diagonale Reihen
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return fields.every(field => field !== null);
}

function resetGame() {
    fields = fields.map(() => null);
    currentPlayer = 'circle';
    render();
}

function renderWinnerLine() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikale Reihen
        [0, 4, 8], [2, 4, 6] // diagonale Reihen
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            const line = document.createElement('div');
            line.className = 'winner-line';
            if (condition.includes(0) && condition.includes(4) && condition.includes(8)) {
                line.style.width = 'calc(100% + 80px)';
                line.style.height = '3px';
                line.style.transform = 'rotate(45deg)';
                line.style.top = 'calc(59.33% - 1.5px)';
                line.style.left = '-40px';
            } else if (condition.includes(2) && condition.includes(4) && condition.includes(6)) {
                line.style.width = 'calc(100% + 80px)';
                line.style.height = '3px';
                line.style.transform = 'rotate(-45deg)';
                line.style.bottom = 'calc(40.33% - 1.5px)';
                line.style.left = '-40px';
            } else if (condition.includes(0) && condition.includes(3) && condition.includes(6)) {
                line.style.width = '3px';
                line.style.height = 'calc(100% + 80px)';
                line.style.top = '-40px';
                line.style.left = 'calc(36.33% - 4.5px)';
            } else if (condition.includes(1) && condition.includes(4) && condition.includes(7)) {
                line.style.width = '3px';
                line.style.height = 'calc(100% + 80px)';
                line.style.top = '-40px';
                line.style.left = 'calc(50.66% - 4.5px)';
            } else if (condition.includes(2) && condition.includes(5) && condition.includes(8)) {
                line.style.width = '3px';
                line.style.height = 'calc(100% + 80px)';
                line.style.top = '-40px';
                line.style.right = 'calc(36.33% - 4.5px)';
            } else if (condition.includes(0) && condition.includes(1) && condition.includes(2)) {
                line.style.width = 'calc(100% + 80px)';
                line.style.height = '3px';
                line.style.top = 'calc(46.33% - 1.5px)';
                line.style.left = '-40px';
            } else if (condition.includes(3) && condition.includes(4) && condition.includes(5)) {
                line.style.width = 'calc(100% + 80px)';
                line.style.height = '3px';
                line.style.top = 'calc(59.66% - 1.5px)';
                line.style.left = '-40px';
            } else if (condition.includes(6) && condition.includes(7) && condition.includes(8)) {
                line.style.width = 'calc(100% + 80px)';
                line.style.height = '3px';
                line.style.bottom = 'calc(27.33% - 1.5px)';
                line.style.left = '-40px';
            }
            document.getElementById('content').appendChild(line);
            return;
        }
    }
}

function generateCircleSVG() {
    const color = "#00B0EF";
    const width = 60;
    const height = 60;

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 3}" fill="none" stroke="${color}" stroke-width="5">
                <animate attributeName="r" values="0;${width / 2 - 3}" dur="225ms" fill="freeze" />
            </circle>
        </svg>
    `;

    return svg;
};


function generateCrossSVG() {
    const color = "#FFC000";
    const width = 60;
    const height = 60;

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0;${width}" dur="225ms" fill="freeze" />
                <animate attributeName="y2" values="${height};0" dur="225ms" fill="freeze" />
            </line>
            <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="5">
                <animate attributeName="x2" values="0;${width}" dur="225ms" fill="freeze" />
                <animate attributeName="y2" values="0;${height}" dur="225ms" fill="freeze" />
            </line>
        </svg>
    `;

    return svg;
};

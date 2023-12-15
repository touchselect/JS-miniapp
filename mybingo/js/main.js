'use strict';

{
    function createColumn(col){
        const source = _.range(1 + 15*col, 16 + 15*col);
        const column = [];
        for(let i = 0; i < 5; i++){
            column[i] = source.splice(_.random(source.length - 1), 1)[0];
        }
        return column;
    }

    const columns = [];
    for(let i = 0; i < 5; i++){
        columns[i] = createColumn(i);
    }

    columns[2][2] = "Free";
    console.table(columns);

    const bingo = [];
    for(let row = 0; row < 5; row++){
        bingo[row] = [];
        for(let col = 0; col < 5; col++){
            bingo[row][col] = columns[col][row];
        }
    }

    console.table(bingo);

    for(let row = 0; row < 5; row++){
        // const tr = document.createElement('tr');
        const $tr = $('<tr></tr>');
        for(let col = 0; col < 5; col++){
            // const td = document.createElement('td');
            const $td = $('<td></td>');
            // td.textContent = bingo[row][col];
            // tr.appendChild(td);
            $td.text(bingo[row][col]).appendTo($tr);
        }
        // document.querySelector('tbody').appendChild(tr);
        $('tbody').append($tr);
    }
}
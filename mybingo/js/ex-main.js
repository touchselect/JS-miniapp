'use strict';

$(function() {
    var numArr = numberReset();

    $(document).ready(() => {
        $('#generateNumber').click(() => {
            const randomNumber = generateRandomNumber(numArr);
            $('#randomNumber').text(randomNumber);
        })
    });

    $('#resetGame').click(() => {
        $('tbody').empty();

        numArr = numberReset();
        const columns = createBingoColumns(size);
        const bingo = createBingoBoard(columns, size);
        renderBingoBoard(bingo, size);

        $('#randomNumber').text('');
    });

    $('#applySettings').click(() => {
        const size = parseInt($('#bingoSize').val(), 10);
        $('tbody').empty();

        const columns = createBingoColumns(size);
        const bingo = createBingoBoard(columns, size);
        renderBingoBoard(bingo, size);

        numArr = numberReset();
        $('#randomNumber').text('');
    })

    function createBingoColumns(size) {
        const columns = [];
        for (let i = 0; i < size; i++) {
            columns[i] = createColumn(i, size);
        }
        if(size === 5){
            columns[2][2] = "Free";
        }
        return columns;
    }

    function createColumn(col, size) {
        const start = 1 + 15 * col;
        const end = 16 + 15 * col;
        const source = _.range(start, end);
        return _.times(size, () => source.splice(_.random(source.length - 1), 1)[0]);
    }

    function createBingoBoard(columns, size) {
        return _.times(size, row => _.times(size, col => columns[col][row]));
    }

    function renderBingoBoard(bingo, size) {
        bingo.forEach(row => {
            const $tr = $('<tr></tr>').appendTo('tbody');
            row.forEach(cell => $('<td></td>')
                                    .text(cell)
                                    .click(function() {
                                        $(this).addClass('marked');
                                        if(checkBingo(size)){
                                            alert('BINGO!!');
                                        }
                                    })
                                    .appendTo($tr));
        });
    }

    function numberReset(){
        numArr = _.range(1, 76);
        return numArr;
    }

    function generateRandomNumber(numArr){
        let number = numArr.splice(_.random(numArr.length - 1), 1)[0];
        console.log(number);
        return number;
    }

    function checkBingo(size){
        const $rows = $('tbody tr');
        let isBingo = false;

        $rows.each(function() {
            const $cells = $(this).find('td');
            if($cells.length === $cells.filter('.marked').length){
                isBingo = true;
            }
        });

        for(let col = 0; col < size; col++){
            let markedCount = 0;
            $rows.each(function(){
                const $cell = $(this).find('td').eq(col);
                if($cell.hasClass('marked')){
                    markedCount++;
                }
            });
            if(markedCount === size){
                isBingo = true;
            }
        }

        let diag1MarkedCount = 0;
        let diag2MarkedCount = 0;
        $rows.each(function(row) {
            const $row = $(this);
            if($row.find('td').eq(row).hasClass('marked')){
                diag1MarkedCount++;
            }
            if($row.find('td').eq((size - 1) - row).hasClass('marked')){
                diag2MarkedCount++;
            }
        });

        if(diag1MarkedCount === size || diag2MarkedCount === size){
            isBingo = true;
        }

        return isBingo;
    }
});

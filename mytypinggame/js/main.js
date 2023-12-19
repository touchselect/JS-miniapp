'use strict';

{
    const levels = {
        easy : [
            "cat", "dog", "red", "blue", "tree", "fish", "bird", "book", "cake", "rain"
        ],

        medium : [
            "orange", "purple", "flower", "window", "bottle", "guitar", "school", "rabbit", "picture", "garden"
        ],

        hard : [
            "elephant", "butterfly", "chocolate", "strawberry", "university", "adventure", "penguin", "balloon", "dinosaur", "landscape"
        ],

        veryHard : [
            "encyclopedia", "hippopotamus", "microscopic", "thermodynamics", "aeronautics", "vulnerability", "philanthropy", "psychology", "metamorphosis", "photosynthesis"
        ]
    }
    let words = [];
    let word;
    let loc = 0;
    let startTime;
    let isPlaying = true;
    let timeLeft = 60;
    let timeId = null;
    let score = 0;
    let correctTypes = 0;
    let totalTypes = 0;
    let currentLevel = null;

    const $target = $('#target');

    $('#level-selector').change(function() {
        currentLevel = $(this).val();
        resetGame();
        isPlaying = false;
    })

    $(document).ready(function() {
        const highScore = localStorage.getItem('highScore') || 0;
        $('#high-score').text(`High Score: ${highScore}`);
    })

    $(document).click(() => {
        if(isPlaying){
            return;
        }
        isPlaying = true;
        startTime = Date.now();
        setWord();
        timeId = setInterval(updateTimer, 1000);
    })

    $(document).keydown((e) => {
        if(e.key !== word[loc]){
            score--;
            totalTypes++;
            return;
        }

        score ++;
        correctTypes++;
        totalTypes++;
        loc++;
        $target.text('_'.repeat(loc) + word.substring(loc));

        if(loc === word.length){
            score += 20;
            if(words.length === 0){
                clearInterval(timeId);
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                $('#result').text(`Finished! ${elapsedTime} seconds!`);
                if(elapsedTime < 50){
                    score += 50;
                }else if(elapsedTime < 30){
                    score += 30;
                }else if(elapsedTime < 10){
                    score += 10;
                }
                updateScoreAndAccuracy();
                updateHighScore();
                return;
            }

            setWord();
        }
    });

    function setWord(){
        word = words.splice(_.random(words.length - 1), 1)[0];
        $target.text(word);
        loc = 0;
    }

    function updateTimer() {
        timeLeft --;
        $('#timer').text(timeLeft);

        if(timeLeft <= 0){
            clearInterval(timeId);
            alert('時間切れです！');
        }
    }

    function updateScoreAndAccuracy() {
        let accuracy = totalTypes === 0 ? 0 : (correctTypes / totalTypes) * 100;
        $('#score').text(`Score: ${score}`);
        $('#accuracy').text(`Accuracy: ${accuracy}%`);
    }

    function resetGame() {
        words = [...levels[currentLevel]];
    }

    function updateHighScore() {
        const highScore = localStorage.getItem('highScore') || 0;
        if(score > highScore){
            localStorage.setItem('highScore', score);
            $('#high-score').text(`High Score: ${score}`);
        }
    }
}
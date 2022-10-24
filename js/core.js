window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var categories;         // Array of topics
    var chosenCategory;     // Selected catagory
    var getHint ;          // Word getHint
    var word ;              // Selected word
    var guess ;             // Geuss
    var guesses = [ ];      // Stored geusses
    var lives ;             // Lives
    var counter ;           // Count correct geusses
    var space;              // Number of spaces in word '-'
  
    // Get elements
    var showLives = document.getElementById("mylives");   // 남은 수명
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");
  
  
  
    // create alphabet ul
    var buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        list.dataset.alphabet = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }

      document.onkeyup = e=>{
        let $letters= document.querySelector('#buttons #alphabet').children; 
        for(let l of $letters){
          if(l.dataset.alphabet==e.key){
            if(l.hasAttributes('class','active')){
                l.onkeyup=null;
            }
            keyup(l);
          }
        }
      }
    }
      
    
    // Select Catagory
    var selectCat = function () {
      if (chosenCategory === categories[0]) {
        catagoryName.innerHTML = "";
      } else if (chosenCategory === categories[1]) {
        catagoryName.innerHTML = "";
      } else if (chosenCategory === categories[2]) {
        catagoryName.innerHTML = "";
      }
    }
    //=====================형준
    // Create guesses ul
    result = function() {
      text = document.getElementById('hold');   // 입력한 알파벳 들어갈 곳
      bingo = document.createElement('ul');    // 정답이면 ul만들어서 li로 _ _ _ 이런식으로 만들 예정

      for(var i = 0; i < word.length; i++) {
        // ul의 아이디 값 생성
        bingo.setAttribute("id", "my-word");
        // li 생성
        guess = document.createElement("li");
        guess.setAttribute("class", "guess");

        // "-" 이면 - 만들고 아니면 _ 민들어서 입력한 알파벳 입력
        if(text[i] === "-") {
          guess.innerHTML = "-";
          space = 1;    // - 띄어쓰기 공간으로 추정..
        } else {
          guess.innerHTML = "_";
        }
        // 저장된 텍스트를 배열에 저장
        guesses.push(guess);
        // div에 ul 추가
        text.appendChild(bingo);
        // ul에 li 추가
        bingo.appendChild(guess);

      }



    }
    //================================== 형준
    // Show lives
     comments = function () {
      // 남은기회 출력
      showLives.innerHTML = "lives : " + lives;
      // 기회 0번이면 OUT
      if(lives < 1) {
        showLives.innerHTML = "You OUT";
      }
      for(var i = 0; i < guesses.length; i++) {
        // 띄어쓰기랑 맞은 알파벳의 갯수가 같을 때
        if(counter + space === guesses.length) {
          showLives.innerHTML = "You Win";
          if(confirm('다시 시작?')){
            restart();
          }
          return;
        }
      }
    }
  
        // Animate man
    var animate = function (live) {
      var drawMe = live ;
      drawArray[drawMe]();
    }
  
    
     // Hangman begin
  


  const myStickman = document.getElementById('stickman');
  const canvas = () => {
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.shadowOffsetX=2;
    context.shadowOffsetY=5;
    context.shadowBlur=5;
    context.shadowColor = "rgba(0,0,0,0.5)";

  };

  const head = () => {
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    // context.arc(70, 30, 5, 0, Math.PI * 2, true);
    // context.fill('evendodd');
    context.stroke();
  };

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const execution_table1 = () => {
    //bottom line
    drawLine(10, 130, 130, 130);
    
    
  };
  const execution_table2 = () => {
    //left line
    drawLine(10, 10, 10, 131);
  };
  const execution_table3 = () => {
    //top line
    drawLine(10, 10, 70, 10);
  };
  const execution_table4 = () => {
    //small top line
    drawLine(70, 10, 70, 20);
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };



  // FILO
  drawArray = [rightLeg,leftLeg, rightArm, leftArm,body,head,execution_table4, execution_table3, execution_table2, execution_table1];
  

  
  // Hangman End

    // OnClick Function
     check = function () {
      list.onclick = function () {
        var guess = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
          if (word[i] === guess) {
            guesses[i].innerHTML = guess;
            counter += 1;
          } 
        }

        //======================================형준
        // indexof : 문자열의 인덱스 값 반환
        // 단, 찾는 문자열이 없을 경우 -1 반환
        // 입력단어 매치 실패 시 live -1
      var match = word.indexOf(guess);
      if(match == -1) {
        lives -= 1;
        comments();
        animate(lives);
      } else {
        comments();
      }   
    }
  }
    
  function keyup(l) {
    l.classList.add('active');
    l.onclick=null;
    l.onkeyup=null;
    let guess = l.dataset.alphabet;
    for(let i =0; i<word.length; i++){
      if(word[i]===guess){
        guesses[i].innerHTML = guess;
        counter += 1;
      }
    }
    let j = word.indexOf(guess);
    if(j===-1){
      lives -= 1;
      comments();
      animate(lives);
    }else{
      comments();
    }
  }
      //======================================형준
    // Play
    play = function () {
      categories = [
          ["kakao", "covid", "samsung", "chocolate", "google", "manchestercity", "mcdonald"],
          ["disney", "harrypotter", "hangman", "newyork", "dokdo"],
          ["poutine", "milan", "madrid", "amsterdam", "slacademy"]
      ];
      // 0부터 카테고리 개수까지 숫자 랜덤 추출
      chosenCategory = categories[Math.floor(Math.random() * categories.length)];    // 카테고리 내 단어 랜덤으로 뽑아오기.
      word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];    // 뽑은 단어에서 알파벳 하나하나 가져오기
      word = word.replace(/\s/g, "-");  // 문자 내의 모든 공백 제거
      console.log(word);
      buttons();
  
      guesses = [ ];
      lives = 10;
      counter = 0;    // 맞은 알파벳 개수
      space = 0;      // 띄어쓰기 개수
      result();
      comments();
      selectCat();
      canvas();
    }
  
    play();
    
    // Hint
  
      hint.onclick = function() {
  
        hints = [
          ["구 다음", "2020년에 발생한 최악의 바이러스", "대한민국 시총 1위", "노홍철이 좋아하는 단 거", "chrome", "Holland", "Best Burger"],
          ["마블, 알라딘 등등", "Muggle", "best game", "Happy New Year", "Beautiful Island of Korea"],
          ["fucking", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Best Academy"]
      ];
  
      var catagoryIndex = categories.indexOf(chosenCategory);
      var hintIndex = chosenCategory.indexOf(word);
      showClue.innerHTML = "Hint: - " +  hints [catagoryIndex][hintIndex];
    };
  
     // Reset
  
    document.getElementById('reset').onclick = function() {
      restart();
    }
    function restart () {
      bingo.parentNode.removeChild(bingo);
      letters.parentNode.removeChild(letters);
      showClue.innerHTML = "";
      context.clearRect(0, 0, 400, 400);
      play();
    }



    function levelDraw(level) {
      restart();
      console.log(lives);
      for(let i=lives; i>level; i--){
        
        animate(i);
        
      }
      lives=level;
      comments();
    }
    
      const $btnSidebar = document.querySelectorAll('.btn-sidebar');
      for(let i=0; i<$btnSidebar.length; i++){
        $btnSidebar[i].onclick= e =>{
          switch (i) {
            case 0:
              levelDraw(7);
              break;

            case 1:
              levelDraw(5);
              break;

            case 2:
              levelDraw(3);
              break;

              default:
              break;
          }
        }
      }
      
  }
  
  
  
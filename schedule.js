// Date 객체 생성
const date = new Date();

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // year-month 채우기
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

  // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // Dates 기본 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i)
  }

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);

  // Dates 정리
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
  const condition = i >= firstDateIndex && i < lastDateIndex + 1
                    ? 'this'
                    : 'other';

  dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
})

  // Dates 그리기
  document.querySelector('.dates').innerHTML = dates.join('');
//오늘 날짜 표시
  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
}

renderCalendar();
// 다음달 이전달 이동
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  }
  
  const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  }

  const goToday = () => {
    date = new Date();
    renderCalendar();
  }

//일정 등록 modal
  const loremIpsum = document.getElementById("lorem-ipsum")
  fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
      .then(response => response.text())
      .then(result => loremIpsum.innerHTML = result)
  const modal = document.getElementById("modal1")
  function modalOn() {
      modal.style.display = "flex"
  }
  function isModalOn() {
      return modal.style.display === "flex"
  }
  function modalOff() {
      modal.style.display = "none"
  }
  const btnModal = document.getElementById("btn-modal")
  btnModal.addEventListener("click", e => {
      modalOn()
  })
  const closeBtn = modal.querySelector(".close-area")
  closeBtn.addEventListener("click", e => {
      modalOff()
  })
  modal.addEventListener("click", e => {
      const evTarget = e.target
      if(evTarget.classList.contains("modal-overlay")) {
          modalOff()
      }
  })
  window.addEventListener("keyup", e => {
      if(isModalOn() && e.key === "Escape") {
          modalOff()
      }
  })
//일정 날짜 선택
  $(function() {
    //input을 datepicker로 선언
    $("#datepicker1,#datepicker2").datepicker({
        dateFormat: 'yy-mm-dd' //달력 날짜 형태
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
        ,changeYear: true //option값 년 선택 가능
        ,changeMonth: true //option값  월 선택 가능                
        ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
        ,buttonText: "선택" //버튼 호버 텍스트              
        ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
        ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
        ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
    });                    
    
    //초기값을 오늘 날짜로 
    $('#datepicker1,#datepicker2').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)            
  });

  //일정 저장하기





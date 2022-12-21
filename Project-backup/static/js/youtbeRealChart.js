window.youtubeRealChartLoad = () => {
    // select 태그에서 기본 설정 값 100 가져오기
    // viewCount Change 함수는 밑에 생성
    let viewCount = document.querySelectorAll('select')[1].value;
    // console.log(viewCount);

    // 스크립트 데이터로 테이블 출력하는 함수
    function tableData(data, viewCount, btnId) {
        const tbody = document.querySelector('tbody');
        let temp = '';
        

        // 데이터가 딱 맞게 viewCount에 나눠지는 데이터면 정상 출력이 되지만
        // 99개 처럼 나머지가 생기는 경우에는 데이터 부족으로 에러 호출 확인
        // if문 설정하여 btnId*viewCount가 data.length 보다 크면 조건문을 다르게 실행하도록 분기
        if(btnId*viewCount > data.length) {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < data.length; i++) {
                temp += `<tr>
                    <td class="table-dark">${data[i].rank}</td>
                    <td class="table-dark"><img src='${data[i].albumImg}'></td>
                    <td class="table-dark">${data[i].title}</td>
                    <td class="table-dark">${data[i].singer}</td>
                    <td class="table-dark">${data[i].chartDuration}</td>
                    <td class="table-dark">${data[i].views}</td>
                    </tr>`;
            }
        } else {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < btnId*viewCount; i++) {
                temp += `<tr>
                    <td class="table-dark">${data[i].rank}</td>
                    <td class="table-dark"><img src='${data[i].albumImg}'></td>
                    <td class="table-dark">${data[i].title}</td>
                    <td class="table-dark">${data[i].singer}</td>
                    <td class="table-dark">${data[i].chartDuration}</td>
                    <td class="table-dark">${data[i].views}</td>
                    </tr>`;
            }
        }
        tbody.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 1번 실행해서 데이터 출력
    // 초기 실행이라서 btnId 변수 대신에 1값 고정
    tableData(ejsDataYoutube, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgo(total, bottomSize, listSize, cursor){
        // total = 총 갯수
        // bottomSize = 하단 버튼 개수
        // listSize = 화면에서 보여줄 크기
        // cursor = 현재 나의 페이지

        //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 
        let totalPageSize = Math.ceil(total / listSize);

        let firstBottomNumber, lastBottomNumber;

        // 현재 페이지 버튼 % 하단 버튼 개수 == 0 인 경우 현재 버튼이 출력이 되지 않는 현상 확인
        // 3번 버튼을 누르면 하단에 4, 5, 6 버튼만 보이는 현상
        // if 조건문으로 출력되게 변경
        if(cursor%bottomSize == 0 ) {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize - 1;
        } else {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize + 1;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize;
        }
        
        //총 갯수보다 큰 경우 방지
        if(lastBottomNumber > totalPageSize) {
            lastBottomNumber = totalPageSize;
        }

        return {
            firstBottomNumber,
            lastBottomNumber,
            totalPageSize,
            total,
            bottomSize,
            listSize,
            cursor
        }
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
    // let info = pageAlgo(280, 10, 10, 1);
    // 페이지 버튼 작업을 위한 1차 작업 초기 실행행
    let info = pageAlgo(ejsDataYoutube.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtn(info) {
        const tfoot = document.querySelector('tfoot');
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(info.cursor == 1) {
            temp += `<td colspan='6'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='6'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMove('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=info.firstBottomNumber; i <= info.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == info.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMove('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMove('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(info.cursor == info.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul></td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMove('${info.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul></td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtn(info);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMove = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableData(ejsDataYoutube, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgo(ejsDataYoutube.length, 3, viewCount, btnId);
        pageBtn(info);
    }

    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // viewCount Change 함수
    // 페이지 몇 개 보기 변경 시 실행되는 함수
    window.viewCountChange = () => {
        viewCount = document.querySelectorAll('select')[1].value;
        // console.log(viewCount);

        // 페이지 출력 갯수 수정 후 새로운 데이터 출력
        // btnId = 1은 데이터 갱신 이후 1페이지로 보여지기 위한 작업
        tableData(ejsDataYoutube, viewCount, 1);

        // 페이지 하단 번호 변경 작업
        // btnId = 1은 데이터 갱신 이후 1페이지로 보여지기 위한 작업
        let info = pageAlgo(ejsDataYoutube.length, 3, viewCount, 1);
        pageBtn(info);
    }


    // 시간 변경 함수
    // window.dateHourChange = () => {
    //     // console.log('dateHour Start');
    //     // 시간 가져오기
    //     const viewTime = document.querySelectorAll('select')[0].value;
    //     // console.log(viewTime);
    //     const url = '/youtubeRealChart/'+viewTime;
    //     axios({
    //         method: 'get',
    //         url: url
    //     })
    //     .then((response) => {
    //         // console.log('dateHourChange End');
    //         document.location.href = url;
    //     });
    // }

    // // 유튜브 실시간 차트 시간 변경
    // window.dateHourChange = () => {
    //     // 데이터 변경 부분
    //     const container = document.getElementById('layoutSidenav_content');
    //     // 시간 가져오기
    //     const viewTime = document.querySelectorAll('select')[0].value;
    //     const url = '/youtubeRealChart/'+viewTime;

    //     axios({
    //         method: 'get',
    //         url: url
    //     }).then((response) => {
    //         console.log(youtubechartrealpage);
    //         console.log(response.data);
    //         console.log(response.data.fileHour);
    //         console.log(response.data.data);
    //         let ejsDataYoutube = response.data.data;

    //         // ejs 파일의 html 태그 가져오기
    //         container.innerHTML = youtubechartrealpage;

    //         // const dayTag = document.getElementById('dayTag');
    //         // const fileday = response.data.filelist[response.data.filelist.length-1].slice(17, -8);
    //         // dayTag.textContent = fileday;

    //         let fileHour = response.data.fileHour;
    //         if (fileHour == undefined) {
    //             fileHour = response.data.filelist[response.data.filelist.length-1].slice(28, -5);
    //         }

    //         // 메뉴 항목에 파일 리스트 출력
    //         let selectoption = '';

    //         for (let i = 0; i < response.data.filelist.length; i++) {
    //             if (fileHour == response.data.filelist[i].slice(28, -5)) {
    //                 selectoption += `<option value="${response.data.filelist[i].slice(28, -5)}" selected>${response.data.filelist[i].slice(28, -5)}:00</option>`
    //             } else {
    //                 selectoption += `<option value="${response.data.filelist[i].slice(28, -5)}">${response.data.filelist[i].slice(28, -5)}:00</option>`
    //             }
    //         }
    //         const selectDay = document.querySelectorAll('select')[0]
    //         selectDay.innerHTML = selectoption;

    //     });
    // }


    // 유튜브 실시간 차트 시간 변경
    window.dateHourChange = () => {
        console.log('tasd56as1d65aw', youtubechartrealpage);
        // 데이터 변경 부분
        const container = document.getElementById('layoutSidenav_content');
        // 시간 가져오기
        const viewTime = document.querySelectorAll('select')[0].value;
        const url = '/youtubeRealChart/'+viewTime;

        axios({
            method: 'get',
            url: url
        }).then((response) => {
            // console.log(response.data);
            // console.log(response.data.fileHour);
            // console.log(response.data.data);
            let ejsDataYoutube = response.data.data;

            // ejs 파일의 html 태그 가져오기
            container.innerHTML = youtubechartrealpage;

            const dayTag = document.getElementById('dayTag');
            const fileday = response.data.filelist[response.data.filelist.length-1].slice(17, -8);
            dayTag.textContent = fileday;

            let fileHour = response.data.fileHour;
            if (fileHour == undefined) {
                fileHour = response.data.filelist[response.data.filelist.length-1].slice(28, -5);
            }

            // 메뉴 항목에 파일 리스트 출력
            let selectoption = '';

            for (let i = 0; i < response.data.filelist.length; i++) {
                if (fileHour == response.data.filelist[i].slice(28, -5)) {
                    selectoption += `<option value="${response.data.filelist[i].slice(28, -5)}" selected>${response.data.filelist[i].slice(28, -5)}:00</option>`
                } else {
                    selectoption += `<option value="${response.data.filelist[i].slice(28, -5)}">${response.data.filelist[i].slice(28, -5)}:00</option>`
                }
            }
            const selectDay = document.querySelectorAll('select')[0]
            selectDay.innerHTML = selectoption;

            // 데이저 재전송 및 html 로딩 이후
            // 서버 데이터 재출력 및 버튼 재수정 함수 다시 실행
            viewCount = document.querySelectorAll('select')[1].value;
            tableData(ejsDataYoutube, viewCount, 1);
            let info = pageAlgo(ejsDataYoutube.length, 3, viewCount, 1);
            pageBtn(info);
        });
    }

}

youtubeRealChartLoad();



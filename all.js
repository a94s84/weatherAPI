var xhr = new XMLHttpRequest(); xhr.open("GET", "api/forecast.json", true);
xhr.send(null);
xhr.onload = function () {
    if (xhr.status !== 200) { return }

    //定義變數
    const data = JSON.parse(xhr.responseText).data;
    let selectBar = document.querySelector('#selectBar');
    let weatherArea = document.querySelector('.weather');
    let temperatureArea = document.querySelector('.temperature');

    //設定初始畫面
    function init() {
        addCountries();
        selectCountry('');
    }

    //選擇不同縣市時，將呈現不同的資料內容
    function selectCountry(location) {
        let countryData = [];
        if (location === '') {
            countryData = data.filter(item => item.location === '連江縣')
        } else {
            countryData = data.filter(item => item.location === location);
        }
        showWeather(countryData);
        showTemperature(countryData);
    }

    //選單呈現縣市名稱
    function addCountries() {
        let str = '';
        for (i = 0; i < data.length; i++) {
            str += `<option value="${data[i].location}"> ${data[i].location} </option>`
        };
        selectBar.innerHTML = str;
    }

    //渲染天氣概況weather畫面
    function showWeather(countryData) {
        let str = '';
        let imgSrc;
        countryData.forEach(item => {
            switch (item.Wx.elementValue[0].value) {
                case '晴時多雲': imgSrc = "images/icon/weather-02.svg";
                    break;
                case '陰天': imgSrc = "images/icon/weather-07.svg";
                    break;
            }
            str += `<img src=${imgSrc} alt="${item.Wx.elementValue[0].value}"><p>${item.Wx.elementValue[0].value}</p>`
        });
        weatherArea.innerHTML = str;
    }

    //渲染氣溫temperature畫面
    function showTemperature(countryData) {
        let str = '';
        countryData.forEach(item => {
            str += `<h4><span>${item.T.elementValue.value}</span>&#176C</h4><p>Min：<span>${item.MinT.elementValue.value}</span>&#176C / Max：<span>${item.MaxT.elementValue.value}</span>&#176C</p>`
        });
        temperatureArea.innerHTML = str;
    }

    //取得select的縣市，並將值帶入selectCountry中
    function changeData(event) {
        selectCountry(event.target.value);
    }

    //監聽selectBar，啟動changeData事件
    selectBar.addEventListener('change', changeData, false)

    init()
}



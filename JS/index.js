const container = document.getElementById('m-listContainer');
const lis = document.querySelectorAll('#m-listContainer li');

// const dbData = Array.from(new Array(20)).map((item, idx) => idx);

const renderPage = (firstIndex) => {
    lis.forEach((item, idx) => {
        const li = item;
        loadDoc(firstIndex + idx);
        // li.innerHTML = firstIndex + idx;

    });
};

// const updateDb = (offset, limit = 10) => {
//     for (let i = 0; i < limit; i++) {
//         dbData.push(offset + i);
//     }
// };

renderPage(0);

const renderFunction = (firstIndex) => {
    renderPage(firstIndex);
};

const listScrollIns = new ListScroll({
    firstItemId: 'item-first',
    lastItemId: 'item-last',
    container,
    listSize: 21,
    itemHeight: 150,
    renderFunction
});

listScrollIns.startObserver()
var upbtn = document.querySelector('.up');
document.addEventListener('scroll', function () {
    if (window.pageYOffset >= 1000) {
        document.getElementById("upbtn").style.visibility = "visible";
        document.getElementById("top").style.displsy = "none";
        document.getElementById("nav").style.top = "12px"
        document.getElementById("nav").style.height = "50px";
    } else {
        document.getElementById("upbtn").style.visibility = "hidden";
        document.getElementById("top").style.display = "flex";
        document.getElementById("nav").style.top = "63px";
    }
})
function checkImgExists(imgurl) {
    return new Promise(function (resolve, reject) {
        var ImgObj = new Image()
        ImgObj.src = imgurl
        ImgObj.onload = function (res) {
            resolve(res)
        }
        ImgObj.onerror = function (err) {
            reject(err)
        }
    })
}
if (new Date().getHours() < 12) {
    document.getElementById('hello').innerHTML = '上午好!'
} else if (new Date().getHours() >= 12 && new Date().getHours() < 18) {
    document.getElementById('hello').innerHTML = '下午好!'
} else {
    document.getElementById('hello').innerHTML = '晚上好!'
}
function loadDoc(i) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            var x = document.getElementsByClassName("fuck");
            var y = document.getElementsByClassName("summary");
            // document.getElementsByTagName("img").src = obj[i].图片;
            // if (obj[i].图片 == undefined || obj[i].图片 == null || obj[i].图片 == '') {
            // document.getElementById("img").style.display = "none";
            // document.("summary").style.width = "650px"
            var str = obj[i].图片;
            //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
            //下面的代码中应用了转义字符"\"输出一个字符"/"
            checkImgExists(obj[i].图片).then(() => {
                //success callback
                // console.log(x[i]);
            }).catch(() => {
                console.log(x[i]);
                //fail callback
                x[i].style.display = "none";
            })

            // };

            //获取需要放数据的容器
            var container = document.querySelector('.block');
            //也就是获取我们定义的模板的dom对象。主要是想获取里面的内容（innerHTML）
            var templateDom = document.querySelector('#essay');
            //编译模板的里的内容
            var template = Handlebars.compile(templateDom.innerHTML);
            container.innerHTML = template(obj);
        }
    };
    xhttp.open("GET", "http://localhost:3000/juejin", true);
    xhttp.send();
}